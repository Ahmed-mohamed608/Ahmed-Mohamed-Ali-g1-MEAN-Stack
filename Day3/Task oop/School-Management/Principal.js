import Person from "./Person.js";

class Principal extends Person {
    constructor(name, email, id) {
        super(name, email, id);
        this.members = [];
    }

    addMember(member) {
        this.members.push(member);
        console.log(`${member.name} added successfully.`);
    }

    removeMember(id) {
        this.members = this.members.filter(member => member.id !== id);
        console.log("Member removed.");
    }

    listMembers() {
        console.log("School Members:");

        this.members.forEach(member => {
            console.log(member.name);
        });
    }

    describeRole() {
        console.log("I am the Principal. I manage the school.");
    }
}

export default Principal;