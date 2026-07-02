const readGrades = require("./read.grade");
const saveGrades = require("./save.grade");

function updateGrade(id, newGrade) {
    const grades = readGrades();

    const student = grades.find(g => g.id === id);

    if (!student) {
        console.log("Student Not Found");
        return;
    }

    student.grade = newGrade;

    saveGrades(grades);

    console.log("Grade Updated Successfully");
    console.log(student);
}

module.exports = updateGrade;