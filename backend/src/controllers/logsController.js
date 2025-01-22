// logsController.js
const { readJSON , writeJSON } = require("../utils/jsonDB");
const { saveLog } = require("../utils/logging");

// Fetch Logs
exports.getLogs = (req, res) => {
    try {
        const logs = readJSON("logs.json");
        res.status(200).json(logs);
    } catch (err) {
        console.error("Error fetching logs:", err);
        res.status(500).json({ error: "Failed to fetch logs." });
    }
};


// Reset Checkout
exports.resetLogs = (req, res) => {
    try {
        writeJSON("logs.json", []);
        res.status(200).json({ message: "Logs reset to initial state." });
    } catch (err) {
        console.error("Error resetting logs:", err);
        saveLog("LOGS", `Error resetting logs: ${err}`);
        res.status(500).json({ error: "Failed to reset logs." });
    }
};