# Object Detection Model Training and Evaluation Report

## 1. Objective

The goal of this task is to train a custom object detection model capable of identifying waste materials (bottle,polythene,styrofoam) using a YOLO-based architecture. The model is trained on a dataset prepared using Roboflow and evaluated using standard performance metrics.

---

## 2. Dataset Preparation

The dataset was created and managed using **Roboflow**. Images were annotated to mark different categories of waste materials. The dataset was then:

* Split into **Training**, **Validation**, and **Testing** sets.
* Exported in **YOLO format**.

### Challenges Faced

During dataset preparation, the **polythene class was accidentally removed** from Roboflow. 

This highlights the importance of:

* Careful version control of datasets.
* Verifying class lists before exporting.

---

## 3. Model Training

The model was trained using **YOLO (Ultralytics implementation)**.

### Training Configuration

* Model: YOLOv26 (pretrained weights used for transfer learning)
* Epochs: Configured during training
* Input Image Size: Standard YOLO resolution
* Dataset Source: Roboflow export
* Training Environment: Local machine with GPU/CPU support

The training process automatically generated logs, weights, and evaluation graphs inside:

```
runs/detect/train/
```

---

## 4. Performance Evaluation

Model performance was evaluated using standard object detection metrics:

### 4.1 mAP@0.5

Measures detection accuracy when predicted boxes overlap ground truth by at least 50%.

### 4.2 mAP@0.5:0.95

A stricter metric averaged across multiple IoU thresholds, providing a more realistic performance evaluation.

### 4.3 Box Loss

Indicates how well the model predicts bounding box locations.
Lower values mean better localization.

### 4.4 Classification Loss

Measures how accurately the model classifies detected objects.
Lower values indicate improved classification ability.

### 4.5 Confusion Matrix

Shows how predictions are distributed among classes, helping identify:

* Misclassifications
* Class imbalance
* Learning weaknesses

---

## 5. Generated Training Graphs

The following graphs were produced automatically by YOLO and saved from:

```
runs/detect/train/
```

They were copied into:

```
problem-3-ml/performanceGraphs/
```

### Included Graphs

* mAP@0.5 vs Epoch
* mAP@0.5:0.95 vs Epoch
* Box Loss vs Epoch
* Classification Loss vs Epoch
* Normalized Confusion Matrix

These graphs visually demonstrate how the model improved over time.

---

## 6. Results and Observations

* The model successfully learned to detect the available waste categories.
* Loss curves decreased steadily, showing stable training.
* mAP increased across epochs, indicating improved prediction quality.
* Some confusion exists between visually similar materials, which is expected in real-world waste detection scenarios.

---

## 7. Limitations

1. Dataset size may limit generalization in diverse environments.
2. Similar-looking materials caused occasional misclassification.

---

## 8. Future Improvements

To improve the system:

* Deploy the model in real-time detection (ROV integration stage).

---

## 9. Conclusion

This task demonstrated the full machine learning pipeline:

Dataset Preparation → Annotation → Training → Evaluation → Analysis

Despite dataset challenges, the trained YOLO model achieved meaningful detection performance and provides a strong foundation for further development in automated waste detection for environmental or ROV-based applications.

---

##
