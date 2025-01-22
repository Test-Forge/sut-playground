// logsRoutes.js
const express = require("express");
const { getLogs, resetLogs } = require("../controllers/logsController");
const router = express.Router();

// Route to fetch logs
router.get("/", getLogs);
router.post("/reset", resetLogs);

module.exports = router;