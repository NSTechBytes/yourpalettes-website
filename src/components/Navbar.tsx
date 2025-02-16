
import { Search } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const categories = ["Trending", "Pastel", "Neon", "Earthy"];

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-lg border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-display font-bold">YourPallate</h1>
          
          <div className="hidden md:flex items-center space-x-6">
            {categories.map((category) => (
              <a
                key={category}
                href={`#${category.toLowerCase()}`}
                className="text-sm font-medium hover:text-primary/80 transition-colors"
              >
                {category}
              </a>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="search"
                placeholder="Search palettes..."
                className="w-full md:w-[200px] pl-9 pr-4 py-2 text-sm rounded-full bg-secondary"
              />
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};
