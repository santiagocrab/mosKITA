# 🚀 Deployment Guide: mosKITA

Deploy mosKITA with **Render** (Backend) and **Vercel** (Frontend).

## 📋 Prerequisites

- GitHub account
- Render account (free tier available)
- Vercel account (free tier available)
- All code pushed to GitHub repository

---

## 🔧 Part 1: Deploy Backend to Render

### Step 1: Prepare Repository
1. Ensure all files are committed and pushed to GitHub
2. Model files (`rf_dengue_model.pkl`, `barangay_encoder.pkl`) should be in the repository root

### Step 2: Create Render Web Service

1. **Go to Render Dashboard**
   - Visit [https://dashboard.render.com](https://dashboard.render.com)
   - Sign up/Login with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the `mosKITA` repository

3. **Configure Service Settings**
   ```
   Name: moskita-backend
   Region: Singapore (or closest to you)
   Branch: main
   Root Directory: (leave empty)
   Runtime: Python 3
   Build Command: pip install -r backend/requirements.txt
   Start Command: cd backend && uvicorn app:app --host 0.0.0.0 --port $PORT
   ```

4. **Environment Variables** (Add these in Render dashboard)
   ```
   PYTHON_VERSION = 3.11.0
   PORT = 10000
   FRONTEND_URL = https://your-frontend-url.vercel.app
   CORS_ORIGINS = https://your-frontend-url.vercel.app
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for build to complete (5-10 minutes)
   - Copy your backend URL (e.g., `https://moskita-backend.onrender.com`)

### Step 3: Test Backend

Visit: `https://your-backend-url.onrender.com/docs`

You should see the FastAPI documentation page.

---

## 🎨 Part 2: Deploy Frontend to Vercel

### Step 1: Prepare Frontend

1. **Update API URL** (if needed)
   - The frontend already uses `VITE_API_URL` environment variable
   - We'll set this in Vercel

### Step 2: Deploy to Vercel

1. **Go to Vercel Dashboard**
   - Visit [https://vercel.com](https://vercel.com)
   - Sign up/Login with GitHub

2. **Import Project**
   - Click "Add New..." → "Project"
   - Import your `mosKITA` repository
   - Select the repository

3. **Configure Project Settings**
   ```
   Framework Preset: Vite
   Root Directory: frontend
   Build Command: npm install && npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Environment Variables** (Add these in Vercel)
   ```
   VITE_API_URL = https://your-backend-url.onrender.com
   ```

   **Important:** Replace `your-backend-url.onrender.com` with your actual Render backend URL!

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (2-5 minutes)
   - Copy your frontend URL (e.g., `https://moskita.vercel.app`)

### Step 3: Update Backend CORS

1. **Go back to Render Dashboard**
2. **Update Environment Variables**
   ```
   FRONTEND_URL = https://your-frontend-url.vercel.app
   CORS_ORIGINS = https://your-frontend-url.vercel.app
   ```
3. **Redeploy** the backend service

---

## ✅ Verification

1. **Test Frontend**: Visit your Vercel URL
2. **Test API Connection**: Check browser console for API calls
3. **Test Predictions**: Try making a prediction on any barangay page

---

## 🔄 Updating Deployments

### Backend (Render)
- Push changes to GitHub
- Render automatically redeploys
- Or manually trigger redeploy from Render dashboard

### Frontend (Vercel)
- Push changes to GitHub
- Vercel automatically redeploys
- Or manually trigger redeploy from Vercel dashboard

---

## 🐛 Troubleshooting

### Backend Issues

**Problem:** Model file not found
- **Solution:** Ensure `rf_dengue_model.pkl` and `barangay_encoder.pkl` are in repository root

**Problem:** Build fails
- **Solution:** Check Render build logs, ensure all dependencies are in `requirements.txt`

**Problem:** CORS errors
- **Solution:** Update `FRONTEND_URL` and `CORS_ORIGINS` in Render environment variables

### Frontend Issues

**Problem:** API calls fail
- **Solution:** Check `VITE_API_URL` in Vercel environment variables matches your Render backend URL

**Problem:** Build fails
- **Solution:** Check Vercel build logs, ensure all dependencies are in `package.json`

**Problem:** 404 errors on routes
- **Solution:** Vercel should handle this with `vercel.json`, but check that rewrites are configured

---

## 📝 Important Notes

1. **Free Tier Limitations:**
   - Render: Services spin down after 15 minutes of inactivity (first request may be slow)
   - Vercel: Generous free tier, no spin-down

2. **Model Files:**
   - Ensure model files are committed to Git (they're large but necessary)
   - Or use Render's persistent disk for model storage

3. **Environment Variables:**
   - Never commit sensitive data
   - Always use environment variables for URLs and API keys

4. **Custom Domain:**
   - Both Render and Vercel support custom domains
   - Configure in respective dashboards

---

## 🎉 Success!

Your mosKITA application should now be live:
- **Frontend:** `https://your-app.vercel.app`
- **Backend:** `https://your-backend.onrender.com`

Share your deployed app and enjoy! 🦟

