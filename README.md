# ITMS - Integrated Track Monitoring System

A comprehensive railway track monitoring system that uses YOLOv8 object detection to identify and classify track defects in real-time, paired with a modern React-based dashboard for visualization and management.

## 🚂 Overview

ITMS combines computer vision and web technologies to provide an automated solution for railway track inspection and monitoring. The system detects 15 different types of track defects and anomalies, helping maintain railway safety and reduce manual inspection efforts.

## 🎯 Features

### AI-Powered Detection
- **15 Defect Classes**: Detects cracks, flakings, joints, shellings, spallings, squats, ballast loss, broken fishplates, corrosion, loose bolts, missing bolts, rail joint gaps, rail wear, sleeper cracks, and surface spalling
- **YOLOv8 Model**: State-of-the-art object detection with high accuracy
- **Real-time Processing**: Fast inference for live monitoring

### Web Dashboard
- **Live View**: Real-time video feed with detection overlays
- **Detection Management**: View, filter, and manage detected defects
- **Analytics Dashboard**: Visualize trends and statistics
- **User Management**: Role-based access control (Admin/User)
- **Device Management**: Monitor and configure detection devices
- **Task Assignment**: Create and track maintenance tasks
- **Report Generation**: Export detection reports

## 🏗️ Project Structure

```
ITMS/
├── frontend/               # React web application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Application pages
│   │   ├── context/       # React context providers
│   │   └── lib/           # Utilities and helpers
│   ├── public/            # Static assets
│   └── package.json       # Frontend dependencies
├── proto_test/            # Prototype test images
├── prototype_results/     # Detection results from testing
├── train_yolo.py          # YOLO model training script
├── val.py                 # Model validation script
├── check.py               # Utility script
└── data.yaml              # Dataset configuration
```

## 🚀 Getting Started

### Prerequisites

- **Python**: 3.8 or higher
- **Node.js**: 16.x or higher
- **GPU**: NVIDIA GPU with CUDA support (recommended for training)
- **Git**: For version control

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/Josh-1317/ITMS-Integrated-Track-Monitoring-System-.git
cd ITMS
```

#### 2. Set Up the Frontend
```bash
cd frontend
npm install
```

#### 3. Set Up Python Environment
```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install ultralytics opencv-python numpy
```

## 📊 Training the Model

### Dataset Structure
Organize your dataset as follows:
```
ITMS/
├── train/
│   ├── images/
│   └── labels/
├── valid/
│   ├── images/
│   └── labels/
└── test/
    ├── images/
    └── labels/
```

### Configuration
Edit `data.yaml` to match your dataset paths and classes.

### Train the Model
```bash
python train_yolo.py
```

**Training Parameters:**
- Model: YOLOv8s
- Epochs: 80
- Image Size: 640x640
- Batch Size: 32
- Device: GPU (CUDA)
- Early Stopping: 20 epochs patience

Training results will be saved in `runs/train/rail_guard_experiment/`.

### Validate the Model
```bash
python val.py
```

## 🖥️ Running the Frontend

### Development Mode
```bash
cd frontend
npm start
```

The application will open at `http://localhost:3000`.

### Production Build
```bash
cd frontend
npm run build
```

The optimized build will be created in the `frontend/build/` directory.

## 🎨 Frontend Features

### Pages
- **Landing Page**: Introduction and system overview
- **Login**: User authentication
- **Dashboard**: Overview with statistics and charts
- **Live View**: Real-time detection feed
- **Detections**: Browse and filter detected defects
- **Detection Detail**: Detailed view of individual detections
- **My Tasks**: Assigned maintenance tasks
- **Admin Panel**: User and device management
- **Settings**: User preferences and configuration
- **Report Issue**: Submit issues and feedback

### Technologies Used
- **React**: UI framework
- **React Router**: Navigation
- **Tailwind CSS**: Styling
- **Framer Motion**: Animations
- **Recharts**: Data visualization
- **Lucide React**: Icons
- **Socket.io**: Real-time communication

## 🔍 Detected Defect Classes

| Class | Description |
|-------|-------------|
| Cracks | Surface or structural cracks in rails |
| Flakings | Surface material detachment |
| Joints | Rail joint conditions |
| Shellings | Progressive surface defects |
| Spallings | Concrete or material chipping |
| Squats | Rail surface defects from rolling contact |
| Ballast Loss | Missing or displaced ballast |
| Broken Fishplate | Damaged rail connectors |
| Corrosion | Metal deterioration |
| Loose Bolt | Unsecured fasteners |
| Missing Bolt | Absent fasteners |
| Rail Joint Gap | Excessive gaps at rail joints |
| Rail Wear | Surface wear patterns |
| Sleeper Crack | Damaged railway ties |
| Surface Spalling | Surface material loss |

## 📁 Dataset Information

The dataset is **not included** in this repository due to size constraints. You need to provide your own dataset following the YOLO format:
- Images in `.jpg` or `.png` format
- Labels in `.txt` format (YOLO annotation format)
- Organized into `train/`, `valid/`, and `test/` directories

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is available for educational and research purposes.

## 👥 Authors

- **Praveenraj1618** - [GitHub](https://github.com/Praveenraj1618)

## 🙏 Acknowledgments

- [Ultralytics YOLOv8](https://github.com/ultralytics/ultralytics) for the object detection framework
- React and the open-source community for frontend tools

## 📧 Contact

For questions or support, please open an issue on GitHub or contact: praveenrajb1618@gmail.com

---

**Note**: This system is designed for railway track monitoring and defect detection. Ensure proper validation and testing before deployment in production environments.
