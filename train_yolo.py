from ultralytics import YOLO

# --- Configuration ---
# Path to your data configuration YAML file
data_config_path = r'E:\sihfinal\data.yaml'

# Model to use (e.g., 'yolov8s.pt', 'yolov8n.pt')
model_name = 'yolov8s.pt'

# Number of epochs to train for
num_epochs = 80

# Image size
image_size = 640

# --- Start Training ---
def main():
    """
    Main function to train the YOLOv8 model.
    """
    # Load a pre-trained YOLOv8 model
    print(f"Loading pre-trained model: {model_name}")
    model = YOLO(model_name)

    # Train the model using the specified dataset and parameters
    print(f"Starting training for {num_epochs} epochs with image size {image_size}...")
    results = model.train(
        data=data_config_path,
        epochs=num_epochs,
        imgsz=image_size,
        batch=32,            # Batch size (fits your 8GB GPU comfortably)
        workers=4,           # Number of dataloader workers
        project="runs/train",  
        name="rail_guard_experiment",
        device=0,            # Use GPU:0
        patience=20,         # Early stopping patience (stops if no improvement in 20 epochs)
        save=True            # Ensure checkpoints are saved
    )
    print("Training finished.")
    print("Results saved in the 'runs/train/rail_guard_experiment' directory.")

if __name__ == '__main__':
    main()
