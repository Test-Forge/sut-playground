# Getting Started with SUT app
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup

### `npm install` - command to install the saveDev dependency for concurrent application running
### `npm run install-app` - command to install frontend and backend dependencies in their specific folders
### `npm run start-app` - command to start frontend and backend

## Available Scripts in package.json

In the project directory (frontend or backend), you can run:

### `npm run start` - to start services separately

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view frontend in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

Runs the backend app in the development mode.\
Open [http://localhost:5001](http://localhost:5001) to view backend in your browser

API Get services: \
http://localhost:5001/api/products \
http://localhost:5001/api/analytics \
http://localhost:5001/api/logs \

``````
project/
├── backend/
│   ├── package.json                 # Dependencies for the backend
│   ├── src/                         # Source code for backend functionality
│   │   ├── app.js                   # Main application entry point for backend
│   │   ├── routes/                  # API route handlers
│   │   ├── controllers/             # Business logic for routes
│   │   └── utils/                   # Helper utilities
│   ├── db/                          # Database-related files
│   │   ├── products.json            # Current product data
│   │   ├── initialProducts.json     # Initial product data for resets
│   │   ├── logs.json                # Logging of actions
│   │   └── history.json             # History of procurement or actions
├── frontend/
│   ├── package.json                 # Dependencies for the frontend
│   ├── public/                      # Static assets for the frontend
│   ├── src/                         # Source code for frontend functionality
│   │   ├── App.js                   # Main application entry point for frontend
│   │   ├── components/              # Reusable React components
│   │   ├── pages/                   # Page-level components
│   │   ├── styles/                  # CSS and styling files
│   │   └── utils/                   # Utility functions