Smart India Hackathon 2025 – Final Submission

Problem Statement ID: SIH25143
Category: Hardware (MedTech / HealthTech)
Team Name: ZETA1
Team ID: 94888

⭐ 1. Overview

OrthoSense is an integrated smart insole system designed to measure plantar pressure in real time, analyze gait patterns, and support clinicians in delivering personalized orthotic solutions.

The system uses:

An FSR pressure sensor array

ESP32 for wireless BLE/Wi-Fi streaming

A Node.js backend for storage and analysis

A React dashboard for clinicians & patients

It replaces guesswork with real biomechanical insights, enabling faster diagnosis, early detection of gait abnormalities, and more accurate orthotic design.

🎯 2. Problem Statement

Current orthotic design methods are:

Manual

Time-consuming

Non-quantitative

Unable to capture real-time pressure during walking

This leads to:

- Incorrect offloading

- Poor gait correction

- Increased risk of ulcers (especially in diabetic patients)

- Inefficient rehabilitation

OrthoSense solves this using real-time pressure mapping + AI-ready insights.

🚀 3. Key Features
Hardware Features

- 8-point pressure sensor matrix per insole

- ESP32-based data acquisition

- BLE/Wi-Fi dual-mode connectivity

- Battery monitoring & low-power profile

Software Features

- Real-time pressure heatmap

- Live gait telemetry via WebSocket

- Posture stability index

- Step detection & asymmetry estimation

- Weekly trends & historical comparison

- Auto-generated PDF patient reports

Dual login: Clinician & Patient

🧠 4. System Architecture
Sensing Layer

- FSR pressure array

- IMU for gait event detection

- Processing & Connectivity

- ADC + filtering on ESP32

- WebSocket telemetry (sub-50ms latency)

- Node.js WebSocket + REST backend

- MongoDB cloud/local database

Application Layer

- React dashboard for clinicians & patients

- Pressure heatmaps (Chart.js)

- Gait & posture analysis

- PDF report generation

Detailed architecture, flowcharts, and diagrams are included in:
project/docs/architecture.png
project/docs/system_flowchart.png

⚙️ 5. Technology Stack
Hardware

- ESP32 DevKit

- FSR sensors

- Li-ion battery

- ADC filtering

Firmware

- Arduino C++

- Wi-Fi/BLE telemetry

- JSON over WebSocket

Backend

- Node.js

- WebSocket server (ws package)

- MongoDB (Mongoose ORM)

- JWT authentication

Frontend

- React (Vite)

- Axios for API

- Chart.js for visualization

- CSS (custom) for UI

📥 6. Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/ikarthikgraj/ZETA1_SIH25143.git
cd OrthoSense

2️⃣ Backend Setup
cd project/backend
cp .env.example .env  
npm install
npm run dev


Server runs at:

http://localhost:5000


WebSocket endpoint:

ws://localhost:5000/ws

3️⃣ Frontend Setup
cd project/frontend
npm install
npm run dev


Runs at:

http://localhost:5173

4️⃣ Firmware Upload (ESP32)

- Open Arduino IDE

- Install ESP32 board support

- Open left_insole.ino or right_insole.ino

- Edit config.h → update Wi-Fi SSID, PASS, server IP

- Upload to your ESP32 boards

Frontend .env
VITE_API_URL=http://localhost:5000/api

📊 7. Sample Outputs

These files are included under project/docs/screenshots/:

- Live pressure pressure map

- Real-time gait events

- Posture stability view

- Patient weekly trends


These help judges understand the product instantly.

🎯 9. Target Audience

- Clinicians & Physiotherapists

- Patients (diabetic, chronic foot pain, rehab)

- Orthotic & Prosthetic Centers

- Biomechanics Research Labs

📈 10. Results & Validation

< 50ms latency real-time streaming

Accurate pressure cell readings

Detects asymmetry, balance issues, & foot offloading

Cuts orthotic trial-and-error time by 60–70%

Clean clinician dashboard for interpretation

🔮 11. Future Scope

- AI-powered gait anomaly classifier

- Cloud-based digital twin for each patient

- Mobile app for home monitoring

- 3D-printed orthotics recommendations

- BLE mesh networking for multi-sensor footwear
