
import { useState } from "react";
import { toast } from "sonner";
import { Copy, Check } from "lucide-react";
import { hexToRgb } from "@/lib/utils";

interface ColorPaletteProps {
  colors: string[];
  name: string;
}

export const ColorPalette = ({ colors, name }: ColorPaletteProps) => {
  const [copied, setCopied] = useState<string | null>(null);
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);
  const [colorFormat, setColorFormat] = useState<"hex" | "rgb">("hex");

  const copyToClipboard = (color: string) => {
    const colorToCopy = colorFormat === "rgb" ? hexToRgb(color) : color;
    navigator.clipboard.writeText(colorToCopy);
    setCopied(color);
    toast.success(`Copied ${colorToCopy} to clipboard`);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="palette-card animate-fadeIn bg-card/50 backdrop-blur-sm">
      <div className="grid grid-cols-5 h-32 sm:h-40">
        {colors.map((color) => (
          <div
            key={color}
            className="color-swatch relative group"
            style={{ backgroundColor: color }}
            onClick={() => copyToClipboard(color)}
            onMouseEnter={() => setHoveredColor(color)}
            onMouseLeave={() => setHoveredColor(null)}
          >
            {hoveredColor === color && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity">
                {copied === color ? (
                  <Check className="w-5 h-5 text-white" />
                ) : (
                  <Copy className="w-5 h-5 text-white" />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-sm">{name}</h3>
          <div className="flex items-center space-x-2 text-xs">
            <button
              onClick={() => setColorFormat("hex")}
              className={`px-2 py-1 rounded ${
                colorFormat === "hex"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary"
              }`}
            >
              HEX
            </button>
            <button
              onClick={() => setColorFormat("rgb")}
              className={`px-2 py-1 rounded ${
                colorFormat === "rgb"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary"
              }`}
            >
              RGB
            </button>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-1">
          {colors.map((color) => (
            <div
              key={color}
              className={`text-xs font-mono p-1 rounded transition-colors break-all ${
                copied === color ? "bg-secondary" : ""
              }`}
            >
              {colorFormat === "rgb" ? hexToRgb(color) : color}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
