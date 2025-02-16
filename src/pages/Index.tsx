import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { ColorPalette } from "@/components/ColorPalette";
// import { palettes, categories } from "@/data/colorPalettes"; // Commented out

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [palettes, setPalettes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const palettesRes = await fetch(
          "https://raw.githubusercontent.com/NSTechBytes/yourpalettes-website/main/api/colorpalettes.json"
        );
        const categoriesRes = await fetch(
          "https://raw.githubusercontent.com/NSTechBytes/yourpalettes-website/main/api/categories.json"
        );

        const palettesData = await palettesRes.json();
        const categoriesData = await categoriesRes.json();

        setPalettes(palettesData);

        // Prevent duplicate "All" category
        setCategories(categoriesData.includes("All") ? categoriesData : ["All", ...categoriesData]);

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Stop loading when done
      }
    };

    fetchData();
  }, []);

  const filteredPalettes = palettes.filter((palette) => {
    const matchesSearch =
      palette.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      palette.colors.some((color) =>
        color.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesCategory =
      activeCategory === "All" || palette.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar onSearch={setSearchQuery} />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6 animate-slideUp">
          {/* Category Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
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
                {activeCategory === "All" ? "All Palettes" : `${activeCategory} Palettes`}
              </h2>

              {filteredPalettes.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                  {filteredPalettes.map((palette) => (
                    <ColorPalette
                      key={palette.name}
                      colors={palette.colors}
                      name={palette.name}
                    />
                  ))}
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
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
