# --- Stage 1: Build the Frontend ---
FROM node:22-alpine AS frontend-builder
WORKDIR /app/frontend

# Copy package.json and package-lock.json first to leverage Docker cache
COPY frontend/package*.json ./
# Install only production dependencies
RUN npm ci --omit=dev
# Copy the rest of the frontend source code
COPY frontend/ ./

# --- Stage 2: Build the Backend ---
FROM node:22-alpine AS backend-builder
WORKDIR /app/backend

# Copy package.json and package-lock.json
COPY backend/package*.json ./
RUN npm install --omit=dev
# Copy the backend source code
COPY backend/ ./


# --- Stage 3: Combine Frontend and Backend (Final Image) ---
FROM node:22-alpine AS final
LABEL org.opencontainers.image.source="test-forge/sut-playground"

# Set working directory in the final image
WORKDIR /app

# Copy the built frontend from the frontend-builder stage
COPY --from=frontend-builder /app/frontend ./frontend
# Copy the backend from the backend-builder stage
COPY --from=backend-builder /app/backend ./backend

# Expose the ports
EXPOSE 3000 5001

# Set the command to start both frontend and backend
# We'll use a simple shell script for this, which we will create below.
COPY ./start.sh ./
CMD ["./start.sh"]
