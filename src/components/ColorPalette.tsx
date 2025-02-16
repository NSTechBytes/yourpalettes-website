
import { useState } from "react";
import { toast } from "sonner";

interface ColorPaletteProps {
  colors: string[];
  name: string;
}

export const ColorPalette = ({ colors, name }: ColorPaletteProps) => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopied(color);
    toast.success(`Copied ${color} to clipboard`);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="palette-card animate-fadeIn">
      <div className="grid grid-cols-5 h-32">
        {colors.map((color) => (
          <div
            key={color}
            className="color-swatch"
            style={{ backgroundColor: color }}
            onClick={() => copyToClipboard(color)}
          />
        ))}
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-medium text-sm">{name}</h3>
        <div className="grid grid-cols-5 gap-1">
          {colors.map((color) => (
            <div
              key={color}
              className={`text-xs font-mono p-1 rounded transition-colors ${
                copied === color ? "bg-secondary" : ""
              }`}
            >
              {color}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
