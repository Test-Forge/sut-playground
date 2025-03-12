#!/bin/sh
cd /app/backend && npm run prod &
BACKEND_PID=$!

cd /app/frontend && npm run prod &
FRONTEND_PID=$!

wait $BACKEND_PID $FRONTEND_PID
