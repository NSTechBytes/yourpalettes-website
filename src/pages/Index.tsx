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
    name: "Berry Blast",
    colors: ["#FF0A54", "#FF477E", "#FF7096", "#FF85A1", "#FBB1BD"],
    category: "Vibrant",
  },
  {
    name: "Ocean Breeze",
    colors: ["#005F73", "#0A9396", "#94D2BD", "#E9D8A6", "#EE9B00"],
    category: "Trending",
  },
  {
    name: "Lavender Fields",
    colors: ["#E0BBE4", "#957DAD", "#D291BC", "#FEC8D8", "#FFDFD3"],
    category: "Pastel",
  },
  {
    name: "Mint Fresh",
    colors: ["#D4E09B", "#A6C36F", "#828C51", "#335145", "#1F2F16"],
    category: "Earthy",
  },
  {
    name: "Desert Night",
    colors: ["#2D00F7", "#6A00F4", "#8900F2", "#A100F2", "#B100E8"],
    category: "Neon",
  },
  {
    name: "Coral Reef",
    colors: ["#FF9F1C", "#FFBF69", "#CBF3F0", "#2EC4B6", "#FF4D6D"],
    category: "Vibrant",
  },
  {
    name: "Cotton Candy",
    colors: ["#FFC4D6", "#FFE0E9", "#FFEFF4", "#D4F0F7", "#CCE9F0"],
    category: "Pastel",
  },
  {
    name: "Autumn Leaves",
    colors: ["#8B4513", "#CD853F", "#DEB887", "#D2691E", "#A0522D"],
    category: "Earthy",
  },
  {
    name: "Cyber Punk",
    colors: ["#FF00FF", "#00FFFF", "#FF3366", "#33FF33", "#FF6600"],
    category: "Neon",
  },
  {
    name: "Galaxy Dreams",
    colors: ["#2E294E", "#541388", "#F1E9DA", "#FFD400", "#D90368"],
    category: "Vibrant",
  },
  {
    name: "Spring Garden",
    colors: ["#E8F3D6", "#FCF9BE", "#FFDCA9", "#FAAB78", "#DC8686"],
    category: "Pastel",
  },
  {
    name: "Retro Wave",
    colors: ["#FF71CE", "#01CDFE", "#05FFA1", "#B967FF", "#FFFB96"],
    category: "Neon",
  },
  {
    name: "Forest Dawn",
    colors: ["#FFE1A8", "#E26D5C", "#723D46", "#472D30", "#2D1810"],
    category: "Earthy",
  },
  {
    name: "Summer Rain",
    colors: ["#99E2B4", "#88D4AB", "#78C6A3", "#67B99A", "#56AB91"],
    category: "Trending",
  },
  {
    name: "Electric Night",
    colors: ["#FF0099", "#00FF99", "#9900FF", "#FF9900", "#0099FF"],
    category: "Neon",
  },
  {
    name: "Arctic Frost",
    colors: ["#E3F6F5", "#BAE8E8", "#93D3D3", "#6DB3B3", "#488B8F"],
    category: "Pastel",
  },
  {
    name: "Mountain Peak",
    colors: ["#EFE6DD", "#CBC4BC", "#A89F96", "#857A70", "#625750"],
    category: "Earthy",
  },
  {
    name: "Deep Sea",
    colors: ["#001F3F", "#003366", "#004080", "#0059B3", "#0073E6"],
    category: "Trending",
  },
  {
    name: "Cherry Blossom",
    colors: ["#FFC0CB", "#FFB6C1", "#FF69B4", "#FF1493", "#DB7093"],
    category: "Pastel",
  },
  {
    name: "Desert Sunset",
    colors: ["#FF8C42", "#FFA07A", "#FFB347", "#FFC985", "#FFD8A8"],
    category: "Vibrant",
  },
  {
    name: "Northern Lights",
    colors: ["#00FF9F", "#00FFE5", "#00E5FF", "#00BFFF", "#009FFF"],
    category: "Neon",
  },
  {
    name: "Vintage Rose",
    colors: ["#D8A7B1", "#BC8F8F", "#E6B0AA", "#B47B84", "#96616B"],
    category: "Pastel",
  },
  {
    name: "Forest Moss",
    colors: ["#2D5A27", "#436B35", "#5A7D45", "#719F55", "#89C265"],
    category: "Earthy",
  },
  {
    name: "Twilight Sky",
    colors: ["#1B1B3A", "#2D2D5B", "#3F3F7C", "#51519D", "#6363BE"],
    category: "Trending",
  },
  {
    name: "Candy Shop",
    colors: ["#FF1493", "#FF69B4", "#FFB6C1", "#FFC0CB", "#FFE4E1"],
    category: "Vibrant",
  },
  {
    name: "Emerald City",
    colors: ["#004D40", "#00695C", "#00796B", "#009688", "#00BFA5"],
    category: "Trending",
  },
  {
    name: "Neon Dream",
    colors: ["#FF1177", "#FF44AA", "#FF77DD", "#FFAAFF", "#FFDDFF"],
    category: "Neon",
  },
  {
    name: "Royal Purple",
    colors: ["#2C0735", "#3D1045", "#4F1556", "#611B67", "#732178"],
    category: "Vibrant",
  },
  {
    name: "Citrus Fresh",
    colors: ["#FFD700", "#FFA500", "#FF8C00", "#FF7F50", "#FF6347"],
    category: "Vibrant",
  },
  {
    name: "Misty Morning",
    colors: ["#E6E6FA", "#D8BFD8", "#DDA0DD", "#DA70D6", "#FF00FF"],
    category: "Pastel",
  },
  {
    name: "Urban Jungle",
    colors: ["#355E3B", "#2E8B57", "#3CB371", "#90EE90", "#98FB98"],
    category: "Earthy",
  },
  {
    name: "Digital Wave",
    colors: ["#00FF00", "#00FF33", "#00FF66", "#00FF99", "#00FFCC"],
    category: "Neon",
  },
  {
    name: "Desert Rose",
    colors: ["#BC8F8F", "#C09999", "#C4A3A3", "#C8ADAD", "#CCB7B7"],
    category: "Pastel",
  },
  {
    name: "Ocean Depths",
    colors: ["#000080", "#000099", "#0000B3", "#0000CC", "#0000E6"],
    category: "Trending",
  },
  {
    name: "Sakura Spring",
    colors: ["#FFB7C5", "#FFB7D5", "#FFB7E5", "#FFB7F5", "#FFB7FF"],
    category: "Pastel",
  },
  {
    name: "Midnight Fire",
    colors: ["#8B0000", "#A30000", "#BA0000", "#D10000", "#E80000"],
    category: "Vibrant",
  },
  {
    name: "Forest Whisper",
    colors: ["#556B2F", "#6B8E23", "#808000", "#8FBC8F", "#9ACD32"],
    category: "Earthy",
  },
  {
    name: "Neon Nights",
    colors: ["#FF00FF", "#00FF99", "#9900FF", "#FF9900", "#0099FF"],
    category: "Neon",
  },
  {
    name: "Arctic Glow",
    colors: ["#E3F6F5", "#BAE8E8", "#93D3D3", "#6DB3B3", "#488B8F"],
    category: "Pastel",
  },
  {
    name: "Desert Storm",
    colors: ["#EFE6DD", "#CBC4BC", "#A89F96", "#857A70", "#625750"],
    category: "Earthy",
  },
  {
    name: "Marine Blue",
    colors: ["#001F3F", "#003366", "#004080", "#0059B3", "#0073E6"],
    category: "Trending",
  },
  {
    name: "Sakura Dreams",
    colors: ["#FFC0CB", "#FFB6C1", "#FF69B4", "#FF1493", "#DB7093"],
    category: "Pastel",
  },
  {
    name: "Desert Gold",
    colors: ["#FF8C42", "#FFA07A", "#FFB347", "#FFC985", "#FFD8A8"],
    category: "Vibrant",
  },
  {
    name: "Aurora",
    colors: ["#00FF9F", "#00FFE5", "#00E5FF", "#00BFFF", "#009FFF"],
    category: "Neon",
  },
  {
    name: "Vintage Mauve",
    colors: ["#D8A7B1", "#BC8F8F", "#E6B0AA", "#B47B84", "#96616B"],
    category: "Pastel",
  },
  {
    name: "Forest Depths",
    colors: ["#2D5A27", "#436B35", "#5A7D45", "#719F55", "#89C265"],
    category: "Earthy",
  },
  {
    name: "Dusk Sky",
    colors: ["#1B1B3A", "#2D2D5B", "#3F3F7C", "#51519D", "#6363BE"],
    category: "Trending",
  },
  {
    name: "Sweet Shop",
    colors: ["#FF1493", "#FF69B4", "#FFB6C1", "#FFC0CB", "#FFE4E1"],
    category: "Vibrant",
  },
  {
    name: "Jade Garden",
    colors: ["#004D40", "#00695C", "#00796B", "#009688", "#00BFA5"],
    category: "Trending",
  },
  {
    name: "Neon Fantasy",
    colors: ["#FF1177", "#FF44AA", "#FF77DD", "#FFAAFF", "#FFDDFF"],
    category: "Neon",
  }
];

const categories = ["All", "Trending", "Pastel", "Neon", "Earthy", "Vibrant"];

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
