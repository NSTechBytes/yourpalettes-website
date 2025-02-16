import json

def remove_duplicate_names(file_path):
    try:
       
        with open(file_path, 'r') as file:
            data = json.load(file)
        
  
        seen_names = set()
        cleaned_data = []
        
        for item in data:
            name = item.get("name")
            if name not in seen_names:
                seen_names.add(name) 
                cleaned_data.append(item) 
        
        
        with open(file_path, 'w') as file:
            json.dump(cleaned_data, file, indent=4)
        
        print(f"Duplicate entries removed. Cleaned data saved to '{file_path}'.")
    
    except FileNotFoundError:
        print(f"Error: The file '{file_path}' was not found.")
    except json.JSONDecodeError:
        print("Error: The file is not a valid JSON.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


if __name__ == "__main__":
    file_path = "api/colorpalettes.json" 
    remove_duplicate_names(file_path)