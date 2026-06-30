import Person from "./Person.js";

class Teacher extends Person {
    constructor(name, email, id, subject) {
        super(name, email, id);
        this.subject = subject;
        this.grades = [];
    }

    gradeStudent(studentName, grade) {
        this.grades.push({
            studentName,
            grade
        });

        console.log(`${studentName} got ${grade}`);
    }

    listGrades() {
        console.log("Grades:");

        this.grades.forEach(student => {
            console.log(`${student.studentName} : ${student.grade}`);
        });
    }

    describeRole() {
        console.log(`I teach ${this.subject}.`);
    }
}

export default Teacher;