
import { Navbar } from "@/components/Navbar";
import { ColorPalette } from "@/components/ColorPalette";

const palettes = [
  {
    name: "Sunset Vibes",
    colors: ["#FF6B6B", "#FFE66D", "#4ECDC4", "#45B7D1", "#2C3E50"],
  },
  {
    name: "Forest Fresh",
    colors: ["#DAD7CD", "#A3B18A", "#588157", "#3A5A40", "#344E41"],
  },
  {
    name: "Pastel Dream",
    colors: ["#FFE5E5", "#FFF1E6", "#F0F4EF", "#E6F4F1", "#EBE7FF"],
  },
  {
    name: "Ocean Depth",
    colors: ["#05668D", "#028090", "#00A896", "#02C39A", "#F0F3BD"],
  },
  {
    name: "Urban Night",
    colors: ["#2B2D42", "#8D99AE", "#EDF2F4", "#EF233C", "#D90429"],
  },
  {
    name: "Desert Sand",
    colors: ["#E6B89C", "#EAD2AC", "#9CAFB7", "#4281A4", "#2E4057"],
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8 animate-slideUp">
          <section>
            <h2 className="text-3xl font-display font-bold mb-6">Trending Palettes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {palettes.map((palette) => (
                <ColorPalette
                  key={palette.name}
                  colors={palette.colors}
                  name={palette.name}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Index;
