import { useState, useEffect, useRef, useCallback } from "react";
import { Navbar } from "@/components/Navbar";
import { ColorPalette } from "@/components/ColorPalette";

const BATCH_SIZE = 300; // Number of palettes per request

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [palettes, setPalettes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Use a ref to hold the current hasMore value so it doesn't force re-creation of fetchPalettes.
  const hasMoreRef = useRef(hasMore);
  useEffect(() => {
    hasMoreRef.current = hasMore;
  }, [hasMore]);

  const observer = useRef<IntersectionObserver | null>(null);

  // Fetch categories once
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "https://raw.githubusercontent.com/NSTechBytes/yourpalettes-website/main/api/categories.json"
        );
        const data = await res.json();
        setCategories(data.includes("All") ? data : ["All", ...data]);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch palettes with pagination and filtering based on search and category
  const fetchPalettes = useCallback(
    async (pageNum: number, query = searchQuery, category = activeCategory) => {
      if (!hasMoreRef.current && pageNum > 1) return;
      
      if (pageNum === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      try {
        const res = await fetch(
          "https://raw.githubusercontent.com/NSTechBytes/yourpalettes-website/main/api/colorpalettes.json"
        );
        const data = await res.json();

        // Filter palettes based on search query and category.
        const filteredData = data.filter((palette) => {
          const matchesSearch =
            query === "" ||
            palette.name.toLowerCase().includes(query.toLowerCase()) ||
            palette.colors.some((color) =>
              color.toLowerCase().includes(query.toLowerCase())
            );

          // Normalize active category for a case-insensitive match
          const normalizedActiveCategory = category.toLowerCase();

          let paletteCategories: string[] = [];
          if (Array.isArray(palette.categories)) {
            paletteCategories = palette.categories.map((cat: string) =>
              cat.toLowerCase()
            );
          } else if (typeof palette.categories === "string") {
            paletteCategories = [palette.categories.toLowerCase()];
          } else if (typeof palette.category === "string") {
            // Fallback to singular "category"
            paletteCategories = [palette.category.toLowerCase()];
          }

          const matchesCategory =
            normalizedActiveCategory === "all" ||
            paletteCategories.includes(normalizedActiveCategory);

          return matchesSearch && matchesCategory;
        });

        const start = (pageNum - 1) * BATCH_SIZE;
        const newPalettes = filteredData.slice(start, start + BATCH_SIZE);

        setPalettes((prev) =>
          pageNum === 1 ? newPalettes : [...prev, ...newPalettes]
        );
        setHasMore(newPalettes.length === BATCH_SIZE);
        
        console.log(
          `Filtered palettes for category "${category}":`,
          filteredData.length
        );
        console.log(
          `Showing palettes ${start + 1} to ${start + newPalettes.length}`
        );
      } catch (error) {
        console.error("Error fetching palettes:", error);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [searchQuery, activeCategory]
  );

  // Reset page when category or search changes
  useEffect(() => {
    setPage(1);
    setPalettes([]);
    setHasMore(true);
    fetchPalettes(1, searchQuery, activeCategory);
  }, [searchQuery, activeCategory, fetchPalettes]);

  // Load more pages when the page state changes
  useEffect(() => {
    if (page > 1) {
      fetchPalettes(page, searchQuery, activeCategory);
    }
  }, [page, searchQuery, activeCategory, fetchPalettes]);

  // Observer to load more palettes when the last one appears
  const lastPaletteRef = useCallback(
    (node) => {
      if (loadingMore || !hasMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setPage((prevPage) => prevPage + 1);
          }
        },
        { threshold: 1 }
      );
      if (node) observer.current.observe(node);
    },
    [loadingMore, hasMore]
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        onSearch={(query) => {
          setSearchQuery(query);
          setPage(1);
          setPalettes([]);
          setHasMore(true);
        }}
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={(category) => {
          setActiveCategory(category);
          setPage(1);
          setPalettes([]);
          setHasMore(true);
        }}
      />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6 animate-slideUp">
          {/* Category Buttons - Only visible on larger screens */}
          <div className="hidden sm:flex flex-wrap items-center justify-center gap-2 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setPage(1);
                  setPalettes([]);
                  setHasMore(true);
                }}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary hover:bg-secondary/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Loading Spinner */}
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <section>
              <h2 className="text-2xl font-display font-bold mb-4 text-center sm:text-left">
                {activeCategory === "All"
                  ? "All Palettes"
                  : `${activeCategory} Palettes`}
              </h2>

              {palettes.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                  {palettes.map((palette, index) => {
                    if (index === palettes.length - 1) {
                      return (
                        <div ref={lastPaletteRef} key={palette.name}>
                          <ColorPalette
                            colors={palette.colors}
                            name={palette.name}
                          />
                        </div>
                      );
                    }
                    return (
                      <ColorPalette
                        key={palette.name}
                        colors={palette.colors}
                        name={palette.name}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <h3 className="text-lg font-medium text-muted-foreground mb-2">
                    No palettes found
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your search or category filter
                  </p>
                </div>
              )}

              {/* Loading More Indicator */}
              {loadingMore && (
                <div className="flex justify-center items-center py-4">
                  <div className="w-6 h-6 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
