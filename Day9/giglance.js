var JobStatus;
(function (JobStatus) {
    JobStatus["Open"] = "Open";
    JobStatus["InProgress"] = "InProgress";
    JobStatus["Review"] = "Review";
    JobStatus["Completed"] = "Completed";
})(JobStatus || (JobStatus = {}));
/* ------- Task 3: OOP & Encapsulation -------- */
class Proposal {
    id;
    projectId;
    freelancerId;
    bidAmount;
    submittedAt;
    constructor(id, projectId, freelancerId, bidAmount) {
        this.id = id;
        this.projectId = projectId;
        this.freelancerId = freelancerId;
        this.bidAmount = bidAmount;
        this.submittedAt = new Date();
    }
}
class PlatformManager {
    // Encapsulated core data
    freelancers = [];
    clients = [];
    projects = [];
    proposals = [];
    // Static property tracking lifetime platform earnings
    static totalPlatformRevenue = 0;
    static COMMISSION_RATE = 0.1;
    // ---------- User / Project creation with validation ----------
    addFreelancer(freelancer) {
        if (freelancer.hourlyRate < 0) {
            throw new Error(`Freelancer "${freelancer.name}" cannot have a negative hourly rate.`);
        }
        this.freelancers.push(freelancer);
        return freelancer;
    }
    addClient(client) {
        if (client.budget < 0) {
            throw new Error(`Client "${client.name}" cannot be created with a negative budget.`);
        }
        this.clients.push(client);
        return client;
    }
    addProject(project) {
        const clientExists = this.clients.some((c) => c.id === project.clientId);
        if (!clientExists) {
            throw new Error(`Cannot create project: client with id "${project.clientId}" does not exist.`);
        }
        if (project.budget < 0) {
            throw new Error(`Project "${project.title}" cannot have a negative budget.`);
        }
        this.projects.push(project);
        return project;
    }
    // ---------- Business Logic ----------
    submitProposal(projectId, freelancerId, bidAmount) {
        const project = this.findProjectById(projectId);
        const freelancer = this.findFreelancerById(freelancerId);
        if (!project)
            throw new Error(`Project "${projectId}" not found.`);
        if (!freelancer)
            throw new Error(`Freelancer "${freelancerId}" not found.`);
        if (project.status !== JobStatus.Open) {
            throw new Error(`Project "${project.title}" is not open for proposals.`);
        }
        if (bidAmount < 0) {
            throw new Error(`Bid amount cannot be negative.`);
        }
        const proposal = new Proposal(`prop-${this.proposals.length + 1}`, projectId, freelancerId, bidAmount);
        this.proposals.push(proposal);
        return proposal;
    }
    assignProject(projectId, freelancerId) {
        const project = this.findProjectById(projectId);
        const freelancer = this.findFreelancerById(freelancerId);
        if (!project)
            throw new Error(`Project "${projectId}" not found.`);
        if (!freelancer)
            throw new Error(`Freelancer "${freelancerId}" not found.`);
        if (project.status !== JobStatus.Open) {
            throw new Error(`Project "${project.title}" cannot be assigned; it is not Open.`);
        }
        project.assignedFreelancerId = freelancerId;
        project.status = JobStatus.InProgress;
        return project;
    }
    completeProject(projectId) {
        const project = this.findProjectById(projectId);
        if (!project)
            throw new Error(`Project "${projectId}" not found.`);
        if (project.status !== JobStatus.InProgress && project.status !== JobStatus.Review) {
            throw new Error(`Project "${project.title}" must be InProgress or in Review to be completed.`);
        }
        project.status = JobStatus.Completed;
        const commission = project.budget * PlatformManager.COMMISSION_RATE;
        PlatformManager.totalPlatformRevenue += commission;
        return project;
    }
    // Read-only accessors (encapsulation-safe views) 
    getFreelancers() {
        return [...this.freelancers];
    }
    getClients() {
        return [...this.clients];
    }
    getProjects() {
        return [...this.projects];
    }
    getProposals() {
        return [...this.proposals];
    }
    findProjectById(id) {
        return this.projects.find((p) => p.id === id);
    }
    findFreelancerById(id) {
        return this.freelancers.find((f) => f.id === id);
    }
}
//Task 4: Generics
class FilterEngine {
    filterByProperty(items, property, value) {
        return items.filter((item) => item[property] === value);
    }
}
//Demo usage (run with: npx ts-node giglance.ts)
function demo() {
    const platform = new PlatformManager();
    const client = platform.addClient({
        id: "c1",
        name: "Ahmed Corp",
        email: "ahmed@corp.com",
        budget: 5000,
    });
    const freelancer = platform.addFreelancer({
        id: "f1",
        name: "Sara Dev",
        email: "sara@dev.com",
        skills: ["TypeScript", "React"],
        hourlyRate: 25,
    });
    const project = platform.addProject({
        id: "p1",
        title: "Build a Landing Page",
        description: "Responsive landing page with React + TypeScript",
        budget: 1000,
        status: JobStatus.Open,
        clientId: client.id,
    });
    platform.submitProposal(project.id, freelancer.id, 900);
    platform.assignProject(project.id, freelancer.id);
    platform.completeProject(project.id);
    console.log("Projects:", platform.getProjects());
    console.log("Platform revenue:", PlatformManager.totalPlatformRevenue);
    const filterEngine = new FilterEngine();
    const completedProjects = filterEngine.filterByProperty([...platform.getProjects()], "status", JobStatus.Completed);
    console.log("Completed projects:", completedProjects);
}
demo();
export { JobStatus, Proposal, PlatformManager, FilterEngine, };
