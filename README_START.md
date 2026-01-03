# 🚀 How to Start mosKITA

## Quick Start (Easiest)

**Option 1: Start Everything at Once**
```bash
./start-all.sh
```

This will start both backend and frontend automatically.

---

## Manual Start (Two Terminal Windows)

**Terminal 1 - Backend:**
```bash
cd backend
python3 -m uvicorn app:app --host 0.0.0.0 --port 8000 --reload
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

---

## Or Use the Individual Scripts

**Start Backend Only:**
```bash
./start-backend.sh
```

**Start Frontend Only:**
```bash
./start-frontend.sh
```

---

## Access the Website

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000
- **API Health Check:** http://localhost:8000/health

---

## Stop the Servers

```bash
pkill -f "uvicorn|vite"
```

Or press `Ctrl+C` in each terminal window.

---

## Troubleshooting

**If frontend shows black screen:**
1. Open browser DevTools (F12)
2. Check Console tab for errors
3. Refresh page (Cmd+R or Ctrl+R)

**If backend won't start:**
- Make sure Python 3 is installed: `python3 --version`
- Install dependencies: `pip install -r backend/requirements.txt`

**If frontend won't start:**
- Make sure Node.js is installed: `node --version`
- Install dependencies: `cd frontend && npm install`

