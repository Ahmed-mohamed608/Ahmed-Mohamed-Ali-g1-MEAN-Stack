const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "data", "grades.json");

function readGrades() {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, "[]");
    }

    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
}

module.exports = readGrades;