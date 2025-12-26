# 🔧 Render Deployment Fix

## Problem
Server binding to `127.0.0.1:8000` instead of `0.0.0.0:$PORT`

## Solution

### Option 1: Update Render Service Settings (Recommended)

1. Go to your Render dashboard
2. Select your `moskita-backend` service
3. Go to **Settings** tab
4. Update **Start Command** to:
   ```
   uvicorn backend.app:app --host 0.0.0.0 --port $PORT
   ```
5. **Save Changes** and **Redeploy**

### Option 2: Manual Configuration

If using Render dashboard (not render.yaml):

**Build Command:**
```
pip install -r backend/requirements.txt
```

**Start Command:**
```
uvicorn backend.app:app --host 0.0.0.0 --port $PORT
```

**Environment Variables:**
- `PYTHON_VERSION` = `3.11.0`
- `PORT` = (leave empty, Render provides this automatically)

### Important Notes

- **DO NOT** set `PORT` environment variable manually - Render provides it automatically
- The `--host 0.0.0.0` is **critical** - it allows external connections
- The `$PORT` variable is provided by Render at runtime

### Verification

After redeploy, check logs for:
```
INFO:     Uvicorn running on http://0.0.0.0:XXXX (Press CTRL+C to quit)
```

NOT:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
```

