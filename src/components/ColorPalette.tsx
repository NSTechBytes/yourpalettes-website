
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
    <div className="palette-card animate-fadeIn">
      <div className="grid grid-cols-5 h-24">
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
                  <Check className="w-4 h-4 text-white" />
                ) : (
                  <Copy className="w-4 h-4 text-white" />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="p-3 space-y-1.5">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-xs">{name}</h3>
          <div className="flex items-center space-x-1 text-[10px]">
            <button
              onClick={() => setColorFormat("hex")}
              className={`px-1.5 py-0.5 rounded ${
                colorFormat === "hex"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary"
              }`}
            >
              HEX
            </button>
            <button
              onClick={() => setColorFormat("rgb")}
              className={`px-1.5 py-0.5 rounded ${
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
              className={`text-[10px] font-mono p-0.5 rounded break-all ${
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
