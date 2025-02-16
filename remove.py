import re
import tkinter as tk
from tkinter import filedialog

# Open file dialog to select a JSON file
root = tk.Tk()
root.withdraw()  # Hide the main window

file_path = filedialog.askopenfilename(title="Select a JSON file", filetypes=[("JSON files", "*.json"), ("All files", "*.*")])

if file_path:
    # Read the file content
    with open(file_path, "r", encoding="utf-8") as file:
        json_text = file.read()

    # Regular expression to remove trailing commas before closing braces
    pattern = r',\s*(\})'
    fixed_json = re.sub(pattern, r'\1', json_text)

    # Write the corrected content back to the file
    with open(file_path, "w", encoding="utf-8") as file:
        file.write(fixed_json)

    print(f"Fixed JSON saved to: {file_path}")
else:
    print("No file selected.")
