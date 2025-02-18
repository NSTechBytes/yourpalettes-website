
import { useState } from "react";
import { Search, Github, Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

interface NavbarProps {
  onSearch: (query: string) => void;
  categories?: string[];
  activeCategory?: string;
  onCategoryChange?: (category: string) => void;
}

export const Navbar = ({ 
  onSearch, 
  categories = [], 
  activeCategory = "All",
  onCategoryChange = () => {} 
}: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(inputValue);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (newValue === "") {
      onSearch("");
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl backdrop-saturate-150">
      {/* Top Bar */}
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center">
              <img src="/yourpalette.png" alt="YourPalettes Logo" />
            </div>
            <h1 className="text-xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
              YourPalettes
            </h1>
          </div>

          {/* Desktop Search and Actions */}
          <div className="hidden sm:flex items-center gap-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-secondary/50 rounded-full blur-sm group-hover:bg-secondary/70 transition-colors"></div>
              <div className="relative flex items-center">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <input
                  type="search"
                  placeholder="Search palettes..."
                  value={inputValue}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  className="w-[250px] pl-9 pr-4 py-2 text-sm rounded-full bg-secondary/50 border-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/NSTechBytes/yourpalettes-website"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-secondary/80 transition-colors"
              >
                <Github className="h-5 w-5 text-foreground/80 hover:text-foreground transition-colors" />
              </a>
              <div className="p-1 rounded-full hover:bg-secondary/80 transition-colors">
                <ThemeToggle />
              </div>
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="flex sm:hidden items-center gap-2">
            <a
              href="https://github.com/NSTechBytes/yourpalettes-website"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-secondary/80 transition-colors"
            >
              <Github className="h-5 w-5 text-foreground/80 hover:text-foreground transition-colors" />
            </a>
            <div className="p-1 rounded-full hover:bg-secondary/80 transition-colors">
              <ThemeToggle />
            </div>
            <button 
              className="p-2 hover:bg-secondary/80 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar - Always visible on mobile */}
        <div className="sm:hidden pb-4">
          <div className="relative group w-full">
            <div className="absolute inset-0 bg-secondary/50 rounded-full blur-sm group-hover:bg-secondary/70 transition-colors"></div>
            <div className="relative flex items-center">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="search"
                placeholder="Search palettes..."
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="w-full pl-9 pr-4 py-2 text-sm rounded-full bg-secondary/50 border-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden py-4 border-t border-border/40`}>
          <div className="flex flex-col gap-2 px-2 max-h-[60vh] overflow-y-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  onCategoryChange(category);
                  setIsMenuOpen(false);
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
        </div>
      </div>
    </nav>
  );
};
