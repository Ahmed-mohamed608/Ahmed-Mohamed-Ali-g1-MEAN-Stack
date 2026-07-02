const readGrades = require("./read.grade");
const saveGrades = require("./save.grade");

function deleteGrade(id) {
    const grades = readGrades();

    const filtered = grades.filter(g => g.id !== id);

    if (filtered.length === grades.length) {
        console.log("Student Not Found");
        return;
    }

    saveGrades(filtered);

    console.log("Grade Deleted Successfully");
}

module.exports = deleteGrade;