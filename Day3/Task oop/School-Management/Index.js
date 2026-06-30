import Principal from "./Principal.js";
import Teacher from "./Teacher.js";
import Student from "./Student.js";

const principal = new Principal(
    "Ahmed",
    "principal@school.com",
    1
);

const teacher = new Teacher(
    "Ali",
    "teacher@school.com",
    2,
    "JavaScript"
);

const student = new Student(
    "Sara",
    "student@school.com",
    3
);

principal.addMember(teacher);
principal.addMember(student);

principal.listMembers();

teacher.gradeStudent("Sara", 95);
teacher.gradeStudent("Omar", 88);

teacher.listGrades();

student.enroll("JavaScript");
student.enroll("HTML");
student.enroll("CSS");

student.viewSubjects();

const members = [principal, teacher, student];

console.log("---------------");

members.forEach(member => {
    member.describeRole();
});