# Integrated Track Monitoring System

**Railway inspection prototype · YOLOv8 detection · React dashboard**

A computer-vision project for exploring railway track defect detection, paired with a dashboard for reviewing detections, devices, and maintenance workflows.

[Quick start](#quick-start) · [Detection workflow](#detection-workflow) · [Implementation status](#implementation-status)

## Implementation status

| Component | Current scope |
| --- | --- |
| Detection training | YOLOv8s training script and 15-class dataset configuration |
| Image inference | Batch inference script that saves annotated images |
| Dashboard | React pages for detections, live-view presentation, tasks, devices, and reporting |
| Authentication | Mock Admin/Staff role selection in React context |
| Hardware and live integration | Not established by the committed training scripts and dashboard |

Dashboard screens and mock data demonstrate the intended workflow. They should not be presented as evidence of connected sensors, production authentication, or a deployed real-time inspection system.

## Quick start

```bash
git clone https://github.com/Praveenraj1618/Integrated-Track-Monitoring-System.git
cd Integrated-Track-Monitoring-System/frontend
npm install
npm start
```

Open http://localhost:3000. Use the available demo roles to explore the interface.

Build the frontend with `npm run build` from `frontend/`.

## Detection workflow

From the repository root, create and activate a Python virtual environment, then install the detection dependencies:

```bash
python -m venv .venv
```

Activate with `.venv\Scripts\Activate.ps1` on Windows PowerShell or `source .venv/bin/activate` on macOS/Linux.

```bash
python -m pip install ultralytics opencv-python numpy
```

### Training

1. Provide a YOLO-format dataset with image/label splits for training, validation, and testing.
2. Update [data.yaml](data.yaml) with paths to those splits.
3. Change `data_config_path` in [train_yolo.py](train_yolo.py); it currently points to a machine-specific Windows location.
4. Adjust `device`, batch size, and workers for your hardware. The committed configuration selects CUDA device 0 and batch size 32.
5. Run `python train_yolo.py`.

The script specifies YOLOv8s, 80 epochs, 640-pixel images, and early-stopping patience of 20. Results are written under `runs/train/`.

### Image inference

Edit `MODEL_PATH`, `IMAGE_FOLDER`, and `OUTPUT_FOLDER` in [val.py](val.py), then run:

```bash
python val.py
```

Despite its filename, this script performs folder-based inference and saves annotated images; it does not calculate validation metrics. Trained weights and the full training dataset must be supplied separately.

## Configured classes

The 15 labels in `data.yaml` are:

Cracks, Flakings, Joints, Shellings, Spallings, Squats, ballast_loss, broken_fishplate, corrosion, loose_bolt, missing_bolt, rail_joint_gap, rail_wear, sleeper_crack, and surface_spalling.

These are configured training categories; accuracy must be established using a trained checkpoint and a held-out dataset.

## Project structure

| Path | Purpose |
| --- | --- |
| `frontend/src/pages/` | Dashboard and workflow pages |
| `frontend/src/components/` | Detection, device, map, chart, and layout components |
| `frontend/src/context/AuthContext.jsx` | Demo role state |
| `frontend/src/lib/mockData.js` | Dashboard sample data |
| `train_yolo.py` | Training configuration and entry point |
| `val.py` | Image-folder inference |
| `data.yaml` | Dataset split paths and class names |

## Technology and acknowledgments

Python and [Ultralytics YOLO](https://github.com/ultralytics/ultralytics) for detection; React, React Router, Tailwind CSS, Recharts, and Framer Motion for the dashboard.

Maintained by [Praveen Raj](https://github.com/Praveenraj1618). The earlier README referenced [Josh-1317's ITMS repository](https://github.com/Josh-1317/ITMS-Integrated-Track-Monitoring-System-); that reference is retained here for provenance, while setup commands point to this repository.
