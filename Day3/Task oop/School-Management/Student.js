import Person from "./Person.js";

class Student extends Person {
    constructor(name, email, id) {
        super(name, email, id);
        this.subjects = [];
    }

    enroll(subject) {
        this.subjects.push(subject);
        console.log(`${this.name} enrolled in ${subject}`);
    }

    viewSubjects() {
        console.log(`${this.name}'s Subjects:`);

        this.subjects.forEach(subject => {
            console.log(subject);
        });
    }

    describeRole() {
        console.log("I am a Student.");
    }
}

export default Student;