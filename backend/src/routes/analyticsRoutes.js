// analyticsRoutes.js
const express = require("express");
const { getAnalytics } = require("../controllers/analyticsController");
const router = express.Router();

// Route to fetch analytics data
router.get("/", getAnalytics);

module.exports = router;
