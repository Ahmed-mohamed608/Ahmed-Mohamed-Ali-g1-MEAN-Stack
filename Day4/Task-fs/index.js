const addGrade = require("./modules/add.grade");
const readGrades = require("./modules/read.grade");
const updateGrade = require("./modules/update.grade");
const deleteGrade = require("./modules/delete.grade");

addGrade("Ahmed", "JavaScript", 95);
addGrade("Ali", "Node.js", 88);
// read
console.log("\nAll Grades:");
console.log(readGrades());
// update
updateGrade(1, 100);
// delete
deleteGrade(2);
// read again
console.log("\nGrades After Changes:");
console.log(readGrades());