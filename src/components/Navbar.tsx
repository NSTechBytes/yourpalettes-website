import { useState } from "react";
import { Search, Github } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

interface NavbarProps {
  onSearch: (query: string) => void;
}

export const Navbar = ({ onSearch }: NavbarProps) => {
  const [inputValue, setInputValue] = useState("");

  // Trigger search on Enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(inputValue);
    }
  };

  // Update local state and trigger search if cleared
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    // If the input is cleared, immediately trigger search with an empty query.
    if (newValue === "") {
      onSearch("");
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl backdrop-saturate-150">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-0 sm:justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center">
              <img src="/yourpalette.png" alt="YourPalettes Logo" />
            </div>
            <h1 className="text-xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
              YourPalettes
            </h1>
          </div>
          <div className="flex items-center space-x-4">
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
                  className="w-[200px] sm:w-[250px] pl-9 pr-4 py-2 text-sm rounded-full bg-secondary/50 border-none focus:ring-2 focus:ring-primary/20 transition-all"
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
        </div>
      </div>
    </nav>
  );
};
