# mosKITA 🦟

**Outsmart the Bite Before It Strikes**

A full-stack web application for predicting dengue risk levels in five barangays of Naga City using a Random Forest machine learning model.

## 🏗️ Architecture

- **Backend**: FastAPI (Python)
- **Frontend**: React + Vite + Tailwind CSS + Framer Motion
- **Model**: Random Forest Classifier (scikit-learn)
- **Maps**: React Leaflet with OpenStreetMap

## 🚀 Quick Start

### Backend
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn app:app --reload --port 8000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 🎯 Features

- **Home Dashboard**: Animated tiles, weather panel, interactive heatmap
- **5 Naga City Barangays**: Bagumbayan Norte, Concepcion Grande, Tinago, Balatas, San Felipe
- **Search & Filter**: Search barangays and filter by date/weather
- **MyNaga Admin**: CSV upload with preview, side menu navigation
- **Real-time Predictions**: ML-powered dengue risk forecasts

## 📊 Risk Levels

- **🟢 Low Risk**: < 30%
- **🟡 Moderate Risk**: 30-60%
- **🔴 High Risk**: > 60%

## 📡 API

- `POST /predict` - Generate forecast
- `POST /upload/climate` - Upload climate data
- `POST /upload/dengue` - Upload cases data
- `GET /barangays` - List barangays
- `GET /health` - Health check

## 📄 License

Educational and public health purposes.
