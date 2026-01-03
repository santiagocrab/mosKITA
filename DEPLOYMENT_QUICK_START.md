# ⚡ Quick Deployment Checklist

## 🎯 Render (Backend) - 5 Steps

1. **Go to** [render.com](https://render.com) → Sign in with GitHub
2. **Click** "New +" → "Web Service"
3. **Connect** your `mosKITA` repository
4. **Settings:**
   ```
   Name: moskita-backend
   Build: pip install -r backend/requirements.txt
   Start: cd backend && uvicorn app:app --host 0.0.0.0 --port $PORT
   ```
5. **Add Environment Variables:**
   ```
   PYTHON_VERSION = 3.11.0
   FRONTEND_URL = (add after Vercel deployment)
   ```
6. **Deploy** → Copy backend URL

---

## 🎨 Vercel (Frontend) - 5 Steps

1. **Go to** [vercel.com](https://vercel.com) → Sign in with GitHub
2. **Click** "Add New..." → "Project"
3. **Import** your `mosKITA` repository
4. **Settings:**
   ```
   Framework: Vite
   Root Directory: frontend
   Build: npm install && npm run build
   ```
5. **Add Environment Variable:**
   ```
   VITE_API_URL = https://your-backend-url.onrender.com
   ```
6. **Deploy** → Copy frontend URL

---

## 🔄 Final Step

**Update Render Environment Variables:**
```
FRONTEND_URL = https://your-frontend-url.vercel.app
CORS_ORIGINS = https://your-frontend-url.vercel.app
```

**Redeploy** Render service

---

## ✅ Done!

- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-backend.onrender.com`

See `DEPLOYMENT.md` for detailed instructions and troubleshooting.

