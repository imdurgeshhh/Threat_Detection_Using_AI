# 🛡️ SecureIndia – Threat Detection Using AI

![Security](https://img.shields.io/badge/Security-AI%20Based-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)
![Status](https://img.shields.io/badge/Status-Active-success)
![Made with](https://img.shields.io/badge/Made%20with-Node.js%20%26%20React-orange)

---

## 📖 Overview

**SecureIndia** is a full-stack web-based **digital threat detection and website safety analysis system** built using **React.js** and **Node.js**.  
It integrates **Google Safe Browsing API** for real-time URL safety scanning, providing users with live protection status, ad/tracker detection, and cloud security monitoring.  

This project empowers users to verify the safety of any website instantly and promotes a safer digital ecosystem.

---

## 🎯 Project Objectives

- To develop a **web application** capable of detecting **malicious or phishing websites**.
- To provide users with a **real-time protection score** based on trusted APIs.
- To implement **modular components** for scanning, ad detection, and cloud monitoring.
- To lay the groundwork for **AI-based heuristic threat analysis** in future versions.

---

## ⚙️ Tech Stack

| Layer | Technology | Description |
|-------|-------------|-------------|
| **Frontend** | React.js | Interactive UI with live updates |
| **Backend** | Node.js + Express.js | REST API for scanning and protection |
| **Database** | LocalStorage (for demo) | Stores scan history locally |
| **API Integration** | Google Safe Browsing API | Verifies URLs in real-time |
| **Styling** | CSS / Tailwind Utility Classes | Responsive design & modern look |

---

## 🧩 Key Features

### 🌐 Website Safety Scanner
- Scans any URL using **Google Safe Browsing API**.
- Displays live result with **Safe / Unsafe** badge.
- Provides security score out of 100.

### 🛡️ Protection Status
- Automatically checks protection status when you paste a URL.
- Shows real-time **threat level**, **score**, and **status message**.
- Updates dynamically without reloading.

### 🚫 Ad Block Protection
- Detects **ad trackers and popups** using heuristic logic.
- Notifies the user if potential adware or trackers are present.

### ☁️ Cloud Security Monitor
- Simulates live **cloud security metrics** (latency, uptime, packet health).
- Refreshes automatically to simulate cloud protection dashboard.

### 🧠 AI Threat Analysis *(Future Scope)*
- Planned feature: Local JS-based heuristic or TensorFlow.js AI model.
- Will analyze metadata, SSL certificate, and page content for risks.

---
### 🖥️ Project Structure
```### 🖥️ Project Structure
Threat_Detection_Using_AI/
│
├── backend/ # Backend server folder
│ ├── server.js # Express server entry point
│ ├── package.json # Backend dependencies and scripts
│ ├── routes/ # API route handlers
│ │ └── status.js # Google Safe Browsing API integration route
│ └── .env # Environment file containing GSB API key (not public)
│
├── frontend/ # Frontend (React) application folder
│ ├── src/ # Source code directory
│ │ ├── App.jsx # Main React application component
│ │ ├── components/ # All UI components
│ │ │ ├── ProtectionStatus.jsx # Displays live website safety score
│ │ │ ├── AdBlockProtection.jsx # Ad-block detection module
│ │ │ └── CloudSecurityMonitor.jsx # Cloud/network status monitor
│ │ ├── utils/ # Utility and helper files
│ │ │ ├── api.js # Handles API calls (fetch, timeouts)
│ │ │ └── storage.js # Manages scan history in localStorage
│ │ └── styles.css # Application-wide styling
│ ├── package.json # Frontend dependencies and build scripts
│ └── vite.config.js # Vite configuration for React build setup
│
├── README.md # Project documentation (this file)
└── .gitignore # Ignored files for Git version control
```

---

## ⚙️ Tech Stack

**Frontend:** React.js, HTML5, CSS3, JavaScript (ES6+), Vite  
**Backend:** Node.js, Express.js  
**Database:** LocalStorage (for scan history)  
**API:** Google Safe Browsing API  
**Tools:** Git, npm, REST API, JSON

---

## 🧩 API Integration — Google Safe Browsing

The backend connects to Google’s **Safe Browsing API v4** to validate URLs.

**Example Request:**
```bash
POST https://safebrowsing.googleapis.com/v4/threatMatches:find?key=YOUR_API_KEY
```

### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/Threat_Detection_Using_AI.git
cd Threat_Detection_Using_AI
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install

Create a .env file in the backend folder:
GSB_API_KEY=YOUR_GOOGLE_SAFE_BROWSING_API_KEY

Then start the backend server:
node server.js
```

### 3️⃣ Frontend Setup
cd ../frontend
npm install
npm run dev
```
```
### 🔮 Future Enhancements

🚧 AI Heuristic Model:
Integrate a local or cloud-based AI model to predict phishing or malware likelihood based on page metadata, SSL info, and content behavior.

☁️ Cloud Threat Intelligence:
Integrate third-party APIs (like VirusTotal or Shodan) for deeper security analysis.

📊 Dashboard Analytics:
Visualize scans and trends using charts (Recharts / Chart.js).

```
```
### 👨‍💻 Author
Rohit Mondal

💼 Project: Threat Detection Using AI

🌐 Vision: Creating smart solutions to protect India’s digital ecosystem.

📧 Contact: rohitmondal.officiall@gmail.com

🪪 “Made in India | Secure Digital Bharat”
```
```

### 🧡 Thank You for Visiting!

“Stay safe. Stay secure. Build for Bharat.”
 



