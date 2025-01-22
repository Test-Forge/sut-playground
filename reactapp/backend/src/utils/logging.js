const { writeJSON } = require("../utils/jsonDb");
const {readJSON} = require("./jsonDB");

const saveLog = (action, details) => {
    const timestamp = new Date().toISOString();
    const newLog = { timestamp, action, details };

    let logs = readJSON("logs.json");
    logs.push(newLog);
    writeJSON("logs.json", logs);
};

module.exports = { saveLog };
