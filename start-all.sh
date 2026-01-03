#!/bin/bash

echo "🚀 Starting mosKITA..."
echo ""

# Kill any existing processes
pkill -f "uvicorn|vite" 2>/dev/null
sleep 2

# Start backend
echo "📦 Starting backend on http://localhost:8000..."
cd "$(dirname "$0")/backend"
python3 -m uvicorn app:app --host 0.0.0.0 --port 8000 --reload > /tmp/moskita-backend.log 2>&1 &
BACKEND_PID=$!

# Wait a bit for backend to start
sleep 3

# Start frontend
echo "🎨 Starting frontend on http://localhost:3000..."
cd "$(dirname "$0")/frontend"
npm run dev > /tmp/moskita-frontend.log 2>&1 &
FRONTEND_PID=$!

echo ""
echo "✅ Servers starting..."
echo ""
echo "📊 Backend:  http://localhost:8000"
echo "🌐 Frontend: http://localhost:3000"
echo ""
echo "📝 Logs:"
echo "   Backend:  tail -f /tmp/moskita-backend.log"
echo "   Frontend: tail -f /tmp/moskita-frontend.log"
echo ""
echo "🛑 To stop: pkill -f 'uvicorn|vite'"
echo ""
echo "Waiting 10 seconds for servers to start..."
sleep 10

# Check if servers are running
if curl -s http://localhost:8000/health > /dev/null; then
  echo "✅ Backend is running!"
else
  echo "❌ Backend failed to start. Check logs: tail -f /tmp/moskita-backend.log"
fi

if curl -s http://localhost:3000/ > /dev/null 2>&1; then
  echo "✅ Frontend is running!"
  echo ""
  echo "🎉 Open http://localhost:3000 in your browser!"
else
  echo "⏳ Frontend still starting... wait a few more seconds"
fi

