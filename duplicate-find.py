import json

def find_duplicate_names(file_path):
    try:
      
        with open(file_path, 'r') as file:
            data = json.load(file)
        
     
        names = [item.get("name") for item in data]
        
       
        name_count = {}
        for name in names:
            if name in name_count:
                name_count[name] += 1
            else:
                name_count[name] = 1
        
       
        duplicates = {name: count for name, count in name_count.items() if count > 1}
        
        if duplicates:
            print("Duplicate names found:")
            for name, count in duplicates.items():
                print(f"'{name}' appears {count} times.")
        else:
            print("No duplicate names found.")
    
    except FileNotFoundError:
        print(f"Error: The file '{file_path}' was not found.")
    except json.JSONDecodeError:
        print("Error: The file is not a valid JSON.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


if __name__ == "__main__":
    file_path = "api/colorpalettes.json" 
    find_duplicate_names(file_path)