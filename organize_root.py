import os
import shutil

root = r"c:\Users\ASUS\OneDrive\Documentos\AutoElite"
ae_dest = os.path.join(root, "AutoElite")

# Items to move from root to ae_dest
# We list everything in root and filter
exclude = {"AutoElite", "Autoelite-main", "final_sync.py", "list_struct.py", "struct.txt", "organize_script.py", "sync_script.py", "cleanup_script.py", "list_struct.py"}

if not os.path.exists(ae_dest):
    os.makedirs(ae_dest)

print(f"Moving root items to {ae_dest}...")

moved_count = 0
for item in os.listdir(root):
    if item in exclude:
        continue
    
    src = os.path.join(root, item)
    dst = os.path.join(ae_dest, item)
    
    try:
        # If destination exists and it's a directory, we merge?
        # Given the previous mess, let's just move and overwrite or merge.
        if os.path.exists(dst):
            if os.path.isdir(dst):
                # Merge logic? No, let's just delete the old one in subfolder 
                # because root is the source of truth.
                shutil.rmtree(dst)
            else:
                os.remove(dst)
        
        shutil.move(src, dst)
        moved_count += 1
        print(f"Moved: {item}")
    except Exception as e:
        print(f"Failed to move {item}: {e}")

print(f"Total items moved: {moved_count}")
