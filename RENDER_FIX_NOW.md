# 🚨 URGENT: Fix Render Port Binding Issue

## The Problem
Backend is binding to `127.0.0.1:8000` instead of `0.0.0.0:$PORT`

## ✅ Quick Fix in Render Dashboard

1. **Go to Render Dashboard**: https://dashboard.render.com
2. **Click on your `moskita-backend` service**
3. **Go to Settings tab**
4. **Update Start Command** to:
   ```
   cd backend && uvicorn app:app --host 0.0.0.0 --port $PORT
   ```
5. **IMPORTANT**: Make sure `PORT` environment variable is **NOT SET** manually (Render provides it automatically)
6. **Remove any custom PORT variable** if you added one
7. **Click "Save Changes"**
8. **Click "Manual Deploy" → "Deploy latest commit"**

## ✅ Verify Settings

**Build Command:**
```
pip install -r backend/requirements.txt
```

**Start Command:**
```
cd backend && uvicorn app:app --host 0.0.0.0 --port $PORT
```

**Environment Variables:**
- `PYTHON_VERSION` = `3.11.0`
- **DO NOT** set `PORT` manually (Render provides it)

## ✅ After Redeploy

Check logs - you should see:
```
INFO:     Uvicorn running on http://0.0.0.0:XXXX
```

NOT:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
```

## 🔍 If Still Not Working

1. Check if you're using `render.yaml` - Render might not be reading it
2. Manually set the start command in dashboard (more reliable)
3. Make sure you're in the correct service (not a different one)

---

**The code is fixed, but Render needs the start command updated in the dashboard!**

