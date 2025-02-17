import { useState } from "react";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { FileImage, FileCode, FileText, Download } from "lucide-react";
import { toast } from "sonner";
import { hexToRgb } from "@/lib/utils";
import jsPDF from "jspdf";

interface DownloadPaletteDialogProps {
  colors: string[];
  name: string;
}

export const DownloadPaletteDialog = ({ colors, name }: DownloadPaletteDialogProps) => {
  const [colorFormat, setColorFormat] = useState<"hex" | "rgb">("hex");

  const getFormattedColors = () => {
    return colors.map((color) => (colorFormat === "rgb" ? hexToRgb(color) : color));
  };

  const downloadAsImage = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = 800;
    const height = 400;
    const colorWidth = width / colors.length;

    canvas.width = width;
    canvas.height = height;

    const formattedColors = getFormattedColors();
    colors.forEach((color, index) => {
      // Draw color rectangle
      ctx.fillStyle = color;
      ctx.fillRect(index * colorWidth, 0, colorWidth, height);

      // Draw text directly on the color
      const textY = height / 2;
      const text = formattedColors[index];
      ctx.font = "bold 14px monospace";
      ctx.fillStyle = "#FFFFFF";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, index * colorWidth + colorWidth / 2, textY);
    });

    const link = document.createElement("a");
    link.download = `${name.toLowerCase().replace(/\s+/g, "-")}-palette.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    toast.success("Image downloaded successfully!");
  };

  const downloadAsSVG = () => {
    const width = 800;
    const height = 400;
    const colorWidth = width / colors.length;

    const formattedColors = getFormattedColors();
    const svgContent = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        ${colors.map((color, index) => `
          <rect x="${index * colorWidth}" y="0" width="${colorWidth}" height="${height}" fill="${color}"/>
          <text 
            x="${index * colorWidth + colorWidth/2}" 
            y="${height/2}"
            font-family="monospace" 
            font-size="14"
            fill="white"
            text-anchor="middle"
            dominant-baseline="middle"
          >${formattedColors[index]}</text>
        `).join("")}
      </svg>
    `;

    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `${name.toLowerCase().replace(/\s+/g, "-")}-palette.svg`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("SVG downloaded successfully!");
  };

  const downloadAsCSS = () => {
    const formattedColors = getFormattedColors();
    const cssContent = `:root {
  ${formattedColors.map((color, index) => `--color-${index + 1}: ${color};`).join("\n  ")}
}`;

    const blob = new Blob([cssContent], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `${name.toLowerCase().replace(/\s+/g, "-")}-palette.css`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("CSS downloaded successfully!");
  };

  const downloadAsPDF = async () => {
    const pdf = new jsPDF("landscape");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const availableWidth = pageWidth - (margin * 2);
    const colorWidth = availableWidth / colors.length;
    
    // Add title
    pdf.setFontSize(16);
    pdf.text(name, margin, margin);
    
    // Draw color swatches and labels in a single row
    const formattedColors = getFormattedColors();
    colors.forEach((color, index) => {
      // Convert hex to RGB for PDF
      const r = parseInt(color.substring(1,3), 16);
      const g = parseInt(color.substring(3,5), 16);
      const b = parseInt(color.substring(5,7), 16);
      
      // Draw color rectangle
      pdf.setFillColor(r, g, b);
      pdf.rect(margin + (index * colorWidth), margin + 10, colorWidth, pageHeight - (margin * 2) - 10, 'F');
      
      // Add color value label
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(12);
      const text = formattedColors[index];
      const textX = margin + (index * colorWidth) + (colorWidth / 2);
      const textY = pageHeight / 2;
      pdf.text(text, textX, textY, { align: 'center' });
    });

    pdf.save(`${name.toLowerCase().replace(/\s+/g, "-")}-palette.pdf`);
    toast.success("PDF downloaded successfully!");
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-xl">
          <Download className="w-5 h-5 text-primary" />
          <span>Download Palette</span>
        </DialogTitle>
        <p className="text-sm text-muted-foreground mt-1">{name}</p>
      </DialogHeader>
      <div className="space-y-6">
        <div className="p-4 bg-secondary/50 rounded-lg space-y-2">
          <Label className="text-sm font-medium">Preview</Label>
          <div className="h-20 rounded-md overflow-hidden grid" style={{ gridTemplateColumns: `repeat(${colors.length}, 1fr)` }}>
            {colors.map((color) => (
              <div key={color} style={{ backgroundColor: color }} />
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium">Color Format</Label>
          <RadioGroup
            value={colorFormat}
            onValueChange={(value) => setColorFormat(value as "hex" | "rgb")}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="hex" id="hex" />
              <Label htmlFor="hex" className="text-sm">HEX</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="rgb" id="rgb" />
              <Label htmlFor="rgb" className="text-sm">RGB</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button onClick={downloadAsImage} variant="outline" className="flex items-center gap-2 h-12">
            <FileImage className="w-4 h-4 text-primary" />
            <div className="flex flex-col items-start">
              <span className="text-sm">PNG</span>
              <span className="text-xs text-muted-foreground">Image Format</span>
            </div>
          </Button>
          <Button onClick={downloadAsSVG} variant="outline" className="flex items-center gap-2 h-12">
            <FileImage className="w-4 h-4 text-primary" />
            <div className="flex flex-col items-start">
              <span className="text-sm">SVG</span>
              <span className="text-xs text-muted-foreground">Vector Format</span>
            </div>
          </Button>
          <Button onClick={downloadAsPDF} variant="outline" className="flex items-center gap-2 h-12">
            <FileText className="w-4 h-4 text-primary" />
            <div className="flex flex-col items-start">
              <span className="text-sm">PDF</span>
              <span className="text-xs text-muted-foreground">Document Format</span>
            </div>
          </Button>
          <Button onClick={downloadAsCSS} variant="outline" className="flex items-center gap-2 h-12">
            <FileCode className="w-4 h-4 text-primary" />
            <div className="flex flex-col items-start">
              <span className="text-sm">CSS</span>
              <span className="text-xs text-muted-foreground">Variables Format</span>
            </div>
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};
