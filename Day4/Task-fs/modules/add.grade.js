const readGrades = require("./read.grade");
const saveGrades = require("./save.grade");

function addGrade(student, subject, grade) {
    const grades = readGrades();

    const id =
        grades.length > 0
            ? Math.max(...grades.map(g => g.id)) + 1
            : 1;

    const newGrade = {
        id,
        student,
        subject,
        grade
    };

    grades.push(newGrade);

    saveGrades(grades);

    console.log("Grade Added Successfully");
    console.log(newGrade);
}

module.exports = addGrade;