import os
import glob
from ultralytics import YOLO
from pathlib import Path

# --- Configuration ---
# 1. Path to your trained model weights
MODEL_PATH = 'E:\\sihfinal\\runs\\train\\rail_guard_experiment4\\weights\\best.pt'

# 2. Path to the folder containing the images you want to test
#    The script will create this folder if it doesn't exist.
IMAGE_FOLDER = Path('E:\\sihfinal\\proto_test')

# 3. Path to the folder where results will be saved (optional)
#    This is used if you choose to save images instead of displaying them.
OUTPUT_FOLDER = Path('E:\\sihfinal\\prototype_results')


# --- Main Inference Function ---
def run_inference_on_folder(model_path, image_folder, output_folder):
    """
    Runs YOLOv8 inference on all images in a folder and displays or saves the results.
    """
    # Load your custom-trained model
    print(f"Loading model from: {model_path}")
    model = YOLO(model_path)

    # Find all image files in the folder (jpg, png, etc.)
    image_paths = list(image_folder.glob('*.[jJ][pP][gG]')) + \
                  list(image_folder.glob('*.[jJ][pP][eE][gG]')) + \
                  list(image_folder.glob('*.[pP][nN][gG]'))

    if not image_paths:
        print(f"No images found in '{image_folder}'. Please check the path.")
        return

    print(f"Found {len(image_paths)} images to process.")

    # Loop through each image, run inference, and show the result
    for image_path in image_paths:
        print(f"-> Processing: {image_path.name}")
        
        results = model(image_path)

        # The results object is a list. Loop through it to process each result.
        for r in results:
            output_folder.mkdir(exist_ok=True) # Create output folder if needed
            save_path = output_folder / image_path.name
            print(f"   Saving result to: {save_path}")
            r.save(filename=str(save_path))

    print("\nInference complete for all images!")


if __name__ == '__main__':
    # Create the test images folder if it doesn't already exist
    if not IMAGE_FOLDER.exists():
        IMAGE_FOLDER.mkdir(parents=True, exist_ok=True)
        print(f"✅ Created a folder for you at: {IMAGE_FOLDER}")
        print("Please add your test images to this folder and run the script again.")
    else:
        run_inference_on_folder(MODEL_PATH, IMAGE_FOLDER, OUTPUT_FOLDER)