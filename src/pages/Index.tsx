
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ColorPalette } from "@/components/ColorPalette";
import { palettes, categories } from "@/data/colorPalettes";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPalettes = palettes.filter((palette) => {
    const matchesSearch = palette.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      palette.colors.some(color => color.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = activeCategory === "All" || palette.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar onSearch={setSearchQuery} />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8 animate-slideUp">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary hover:bg-secondary/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <section>
            <h2 className="text-3xl font-display font-bold mb-6 text-center sm:text-left">
              {activeCategory === "All" ? "All Palettes" : `${activeCategory} Palettes`}
            </h2>
            {filteredPalettes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredPalettes.map((palette) => (
                  <ColorPalette
                    key={palette.name}
                    colors={palette.colors}
                    name={palette.name}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-muted-foreground mb-2">No palettes found</h3>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search or category filter
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default Index;

