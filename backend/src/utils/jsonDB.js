const fs = require("fs");
const path = require("path");

const getFilePath = (fileName) => path.join(__dirname, "../../db", fileName);

const readJSON = (fileName) => {
    const filePath = getFilePath(fileName);
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
};

const writeJSON = (fileName, data) => {
    const filePath = getFilePath(fileName);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
};

module.exports = { readJSON, writeJSON };
