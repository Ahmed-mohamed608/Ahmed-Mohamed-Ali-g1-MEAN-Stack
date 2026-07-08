

enum JobStatus {
  Open = "Open",
  InProgress = "InProgress",
  Review = "Review",
  Completed = "Completed",
}

type Skill = "TypeScript" | "NodeJS" | "React" | "UI/UX";

/* -----Task 2: Interfaces --- */

interface IUser {
  id: string;
  name: string;
  email: string;
}

interface IFreelancer extends IUser {
  skills: Skill[];
  hourlyRate: number;
}

interface IClient extends IUser {
  budget: number;
}

interface IProject {
  id: string;
  title: string;
  description: string;
  budget: number;
  status: JobStatus;
  clientId: string;
  assignedFreelancerId?: string;
}

/* ------- Task 3: OOP & Encapsulation -------- */

class Proposal {
  readonly id: string;
  readonly projectId: string;
  readonly freelancerId: string;
  readonly bidAmount: number;
  readonly submittedAt: Date;

  constructor(id: string, projectId: string, freelancerId: string, bidAmount: number) {
    this.id = id;
    this.projectId = projectId;
    this.freelancerId = freelancerId;
    this.bidAmount = bidAmount;
    this.submittedAt = new Date();
  }
}

class PlatformManager {
  // Encapsulated core data
  private freelancers: IFreelancer[] = [];
  private clients: IClient[] = [];
  private projects: IProject[] = [];
  private proposals: Proposal[] = [];

  // Static property tracking lifetime platform earnings
  static totalPlatformRevenue: number = 0;

  private static readonly COMMISSION_RATE = 0.1;

  // ---------- User / Project creation with validation ----------

  addFreelancer(freelancer: IFreelancer): IFreelancer {
    if (freelancer.hourlyRate < 0) {
      throw new Error(`Freelancer "${freelancer.name}" cannot have a negative hourly rate.`);
    }
    this.freelancers.push(freelancer);
    return freelancer;
  }

  addClient(client: IClient): IClient {
    if (client.budget < 0) {
      throw new Error(`Client "${client.name}" cannot be created with a negative budget.`);
    }
    this.clients.push(client);
    return client;
  }

  addProject(project: IProject): IProject {
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

  submitProposal(projectId: string, freelancerId: string, bidAmount: number): Proposal {
    const project = this.findProjectById(projectId);
    const freelancer = this.findFreelancerById(freelancerId);

    if (!project) throw new Error(`Project "${projectId}" not found.`);
    if (!freelancer) throw new Error(`Freelancer "${freelancerId}" not found.`);
    if (project.status !== JobStatus.Open) {
      throw new Error(`Project "${project.title}" is not open for proposals.`);
    }
    if (bidAmount < 0) {
      throw new Error(`Bid amount cannot be negative.`);
    }

    const proposal = new Proposal(
      `prop-${this.proposals.length + 1}`,
      projectId,
      freelancerId,
      bidAmount
    );
    this.proposals.push(proposal);
    return proposal;
  }

  assignProject(projectId: string, freelancerId: string): IProject {
    const project = this.findProjectById(projectId);
    const freelancer = this.findFreelancerById(freelancerId);

    if (!project) throw new Error(`Project "${projectId}" not found.`);
    if (!freelancer) throw new Error(`Freelancer "${freelancerId}" not found.`);
    if (project.status !== JobStatus.Open) {
      throw new Error(`Project "${project.title}" cannot be assigned; it is not Open.`);
    }

    project.assignedFreelancerId = freelancerId;
    project.status = JobStatus.InProgress;
    return project;
  }

  completeProject(projectId: string): IProject {
    const project = this.findProjectById(projectId);
    if (!project) throw new Error(`Project "${projectId}" not found.`);
    if (project.status !== JobStatus.InProgress && project.status !== JobStatus.Review) {
      throw new Error(`Project "${project.title}" must be InProgress or in Review to be completed.`);
    }

    project.status = JobStatus.Completed;

    const commission = project.budget * PlatformManager.COMMISSION_RATE;
    PlatformManager.totalPlatformRevenue += commission;

    return project;
  }

  // Read-only accessors (encapsulation-safe views) 

  getFreelancers(): ReadonlyArray<IFreelancer> {
    return [...this.freelancers];
  }

  getClients(): ReadonlyArray<IClient> {
    return [...this.clients];
  }

  getProjects(): ReadonlyArray<IProject> {
    return [...this.projects];
  }

  getProposals(): ReadonlyArray<Proposal> {
    return [...this.proposals];
  }


  private findProjectById(id: string): IProject | undefined {
    return this.projects.find((p) => p.id === id);
  }

  private findFreelancerById(id: string): IFreelancer | undefined {
    return this.freelancers.find((f) => f.id === id);
  }
}

//Task 4: Generics

class FilterEngine<T> {
  filterByProperty(items: T[], property: keyof T, value: any): T[] {
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

  
  const filterEngine = new FilterEngine<IProject>();
  const completedProjects = filterEngine.filterByProperty(
    [...platform.getProjects()],
    "status",
    JobStatus.Completed
  );
  console.log("Completed projects:", completedProjects);

  
}

demo();

export {
  JobStatus,
  Skill,
  IUser,
  IFreelancer,
  IClient,
  IProject,
  Proposal,
  PlatformManager,
  FilterEngine,
};
