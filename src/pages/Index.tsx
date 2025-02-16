
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ColorPalette } from "@/components/ColorPalette";

const palettes = [
  {
    name: "Sunset Vibes",
    colors: ["#FF6B6B", "#FFE66D", "#4ECDC4", "#45B7D1", "#2C3E50"],
    category: "Trending",
  },
  {
    name: "Forest Fresh",
    colors: ["#DAD7CD", "#A3B18A", "#588157", "#3A5A40", "#344E41"],
    category: "Earthy",
  },
  {
    name: "Pastel Dream",
    colors: ["#FFE5E5", "#FFF1E6", "#F0F4EF", "#E6F4F1", "#EBE7FF"],
    category: "Pastel",
  },
  {
    name: "Ocean Depth",
    colors: ["#05668D", "#028090", "#00A896", "#02C39A", "#F0F3BD"],
    category: "Trending",
  },
  {
    name: "Urban Night",
    colors: ["#2B2D42", "#8D99AE", "#EDF2F4", "#EF233C", "#D90429"],
    category: "Neon",
  },
  {
    name: "Desert Sand",
    colors: ["#E6B89C", "#EAD2AC", "#9CAFB7", "#4281A4", "#2E4057"],
    category: "Earthy",
  },
];

const categories = ["All", "Trending", "Pastel", "Neon", "Earthy"];

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
