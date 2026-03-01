# ROV Telemetry API Specification
## 1. Overview

This API provides telemetry data handling for the ROV system.  
It allows simulated sensor data to be sent, stored in a FIFO in-memory buffer, and retrieved by the frontend for real-time monitoring.

The backend is implemented using **native Node.js HTTP module** (no Express).
---
## 2. Base URL
http://localhost:3000/api/telemetry/latest
---

## 3. Data Format

All communication uses:

Content-Type: application/json
Telemetry packets must follow this structure:

```json
{
  "timestamp": "2026-02-10T12:30:25Z",
  "depth": 12.4,
  "temperature": 18.7,
  "pressure": 2.1,
  "direction": 196.6
}
```
---

## 4. Endpoints
### 4.1 POST /telemetry

Stores incoming telemetry data into the FIFO buffer.

Request
POST /api/telemetry

Body Example
{
  "timestamp": "2026-02-01T10:00:00Z",
  "depth": 4.8,
   "pressure": 1.9,
    "temperature": 22.1,
    "direction": 190
}




{
  "success": "true"
}

Error Responses
400 Bad Request → Invalid JSON or missing field

{
  "error": "Invalid telemetry data""Invalid JSON"
}
-
### 4.2 GET /api/telemetry/latest

Returns the latest telemetry values from the FIFO buffer.

Response
200 OK
404 error

Example:
{
  "timestamp": "2026-01-27T10:07:39Z",
  "depth": 5.5,
  "pressure": 1.56,
  "temperature": 22.6,
  "direction": 201.0
}
Error
{
  "error": "No telemetry data"
}
### 4.3 GET /api/telemetry/history?limit=N
- Returns the last N telemetry entries
- Response:
  - 200 OK → [ …array of last N entries… ]
---
## 5. FIFO Buffer Logic

The server maintains a First-In-First-Out (FIFO) buffer.

Maximum size: 100 entries

When full:

Oldest entry is automatically removed.

Ensures:

Constant memory usage

Real-time recent data access

## 6. Telemetry Simulation Logic

Instead of random generation:

Data is streamed from:

sensor_data_500.json


A new entry is exposed every 5 seconds.



## 7. System Status Interpretation (Frontend Logic)
Pressure 	Status
< 1.8 bar	NORMAL
1.8–2.0 bar	WARNING
> 2.0 bar	CRITICAL


## 8. Design Justification

This lightweight API design was chosen because:

Native Node.js ensures low overhead

FIFO buffer mimics real ROV telemetry streams

No database required for this simulation

Supports real-time polling from control dashboard

Chart.js(Frontend visualizsation)

## 9. Usage Flow
Start backend server:

node server.js


Frontend polls:

GET /latest


Server streams telemetry sequentially.

Dashboard updates values and charts in real time.

10. Conclusion

This API provides a minimal, robust telemetry interface suitable for real-time underwater ROV monitoring while maintaining simplicity and performance.
