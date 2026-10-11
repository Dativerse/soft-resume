// The `resumes` map holds multiple CV variants (e.g. "fullstack", "backend")
// and switches between them via the `cvType` query param on the resume page.
import type { EducationItem, PersonalInfo, ResumeData } from "./types";

const personal: PersonalInfo = {
  name: "Nguyễn Văn Đạt",
  title: "Product Software Engineer",
  email: "dativerse@gmail.com",
  phone: "+84 775702201",
  location: "Ho Chi Minh, Vietnam",
  github: null,
  linkedin: "https://www.linkedin.com/in/envidat/",
  website: null,
};

const commonEducation: EducationItem[] = [
  {
    institution: "University of Information Technology",
    degree: "Bachelor of Engineering, Software Engineering",
    location: "Ho Chi Minh City, Vietnam",
    graduationYear: "2023",
    startYear: "2019",
  },
];

const commonCertifications = [
  "AWS Certified Developer - Associate (Dec 2024)",
  "AWS Certified Solutions Architect - Associate (Oct 2023)",
];

const fullstackResume: ResumeData = {
  personal,
  summary:
    "Full-stack Engineer with 4+ years of experience and 10+ successfully delivered projects, specializing in .NET, React, and AWS. Proven track record delivering end-to-end SaaS and payment solutions, bridging seamless UX with scalable backends through microservices and monorepo architectures.",
  education: commonEducation,
  experience: [
    {
      company: "Freelance",
      position: "Software Engineer",
      location: "Remote",
      startDate: "May 2026",
      endDate: "Present",
      achievements: [
        "Building SaaS and financial products end-to-end for clients, from requirements and system design to production delivery",
        "Developing full-stack features with React and Node.js, covering customer-facing apps, admin dashboards, and billing flows",
      ],
    },
    {
      company: "ConsultechAilab",
      position: "Software Engineer",
      location: "Dubai, United Arab Emirates",
      startDate: "Jul 2025",
      endDate: "Apr 2026",
      achievements: [
        "Engineered end-to-end payment gateway platform serving 5+ countries, bridging React frontends with robust .NET backends",
        "Designed and implemented multi-currency transaction flows and integrated diverse third-party payment providers",
        "Developed both high-performance customer payment portals and comprehensive internal admin dashboards",
        "Enhanced development velocity by building custom CLI tools and AI agents for workflow automation",
      ],
    },
    {
      company: "Nexcel Solutions",
      position: "Fullstack Software Engineer",
      location: "Ho Chi Minh City, Vietnam",
      startDate: "Apr 2022",
      endDate: "Jul 2025",
      achievements: [
        "Delivered experimental SaaS products from conception to production with startup agility and enterprise standards",
        "Owned feature development across the stack, including responsive UIs, scalable APIs, and database migrations",
        "Modernized legacy products by migrating to .NET 6+ and React, improving maintainability and performance",
        "Collaborated in Agile/Scrum environments, actively participating in product design and technical strategy",
      ],
    },
  ],
  skills: [
    {
      category: "Frameworks & Libraries",
      items: [".NET", "Dapper", "React", "Next.js", "Node.js", "Express", "Tailwind CSS", "REST APIs", "Kafka"],
    },
    { category: "Languages", items: ["TypeScript", "JavaScript", "C#", "Go", "HTML", "CSS", "SQL"] },
    {
      category: "Infrastructure & Tools",
      items: ["PostgreSQL", "Redis", "AWS", "Docker", "Kubernetes", "CI/CD", "Git", "Agile/Scrum"],
    },
  ],
  projects: [
    {
      title: "Cashquora",
      url: "/projects/cashquora",
      description:
        "White-label digital wallet and payment hub that lets partner platforms take deposits and pay out withdrawals through local payment providers in 5 currencies across Southeast and South Asia",
      techStack: [".NET 8", "PostgreSQL", "Dapper", "Kafka", "Redis", "React", "TypeScript", "AWS EKS", "AI Agents"],
      period: "Sep 2025 - Jan 2026",
      achievements: [
        "Built deposit and withdrawal flows end to end across a user portal, an admin portal and .NET microservices that talk over Kafka",
        "Integrated local payment providers and banks with priority-based auto-selection, time-of-day provider schedules and admin retry of failed payouts",
        "Delivered admin tooling for multi-approval withdrawals, bank deposit reconciliation and live transaction updates over Server-Sent Events",
        "Integrated AI agents into the dev loop to automate code reviews and documentation",
      ],
    },
    {
      title: "S1",
      url: "/projects/s1",
      description:
        "Microservices-based B2B platform with domain-driven design and technology-agnostic architecture",
      techStack: [".NET", "React", "Next.js", "MySQL", "Kafka", "Kubernetes"],
      period: "Aug 2024 - Feb 2025",
      achievements: [
        "Implemented secure API gateways and message-driven communication between services",
        "Optimized frontend bundle sizes and backend query performance for a snappier user experience",
      ],
    },
    {
      title: "Licensee Admin Portal",
      url: "/projects/licensee-admin-portal",
      description: "High-performance admin website for license management",
      techStack: [".NET Framework", ".NET 6", "React", "Webpack", "jQuery", "Angular", "SQL Server"],
      period: "Oct 2022 - Aug 2024",
      achievements: [
        "Migrated MVC to 3-layer architecture and separated codebase into micro-sites (SOA)",
        "Handled and developed various types of content and optimized loading performance",
      ],
    },
  ],
  codingProfiles: [],
  certifications: commonCertifications,
};

const backendResume: ResumeData = {
  ...fullstackResume,
  summary:
    "Backend Engineer with 4+ years of experience and 10+ successfully delivered projects, focused on high-performance systems and scalable cloud architectures using .NET, Go, and AWS. Specialized in distributed databases, payment infrastructure, and optimizing microservices for reliability and concurrency.",
  experience: [
    {
      company: "Freelance",
      position: "Software Engineer",
      location: "Remote",
      startDate: "May 2026",
      endDate: "Present",
      achievements: [
        "Building backends for SaaS and financial products, from requirements and system design to production delivery",
        "Designing multi-tenant APIs, database schemas, and subscription/billing logic with Node.js, PostgreSQL, and Redis",      ],
    },
    {
      company: "ConsultechAilab",
      position: "Software Engineer",
      location: "Dubai, United Arab Emirates",
      startDate: "Jul 2025",
      endDate: "Apr 2026",
      achievements: [
        "Architected a scalable payment gateway backend supporting multi-currency transactions across 5+ countries",
        "Designed distributed database schemas and integrated complex third-party payment APIs for high availability",
        "Optimized transaction processing engines for low-latency and strict data consistency",
        "Developed internal CLI tools and AI-driven automation for backend deployment and load testing",
      ],
    },
    {
      company: "Nexcel Solutions",
      position: "Software Engineer",
      location: "Ho Chi Minh City, Vietnam",
      startDate: "Apr 2022",
      endDate: "Jul 2025",
      achievements: [
        "Designed and implemented core business logic and microservices architecture for experimental SaaS products",
        "Led the migration of legacy monolithic systems to modern, 3-layer .NET architectures with SOA principles",
        "Built comprehensive smoke test and load testing suites to ensure system stability under high traffic",
        "Automated CI/CD pipelines and optimized SQL Server performance through advanced indexing and query tuning",
      ],
    },
  ],
  skills: [
    {
      category: "Frameworks & Libraries",
      items: [".NET", "C#", "Go", "Node.js", "Express", "REST APIs", "gRPC", "Kafka", "Microservices"],
    },
    {
      category: "Databases & Cloud",
      items: ["PostgreSQL", "SQL Server", "Redis", "Elasticsearch", "AWS", "Docker", "Kubernetes"],
    },
    {
      category: "Architecture & DevOps",
      items: ["System Design", "Domain-Driven Design (DDD)", "Unit Testing", "CI/CD", "Git", "Agile/Scrum"],
    },
  ],
  projects: [
    {
      ...fullstackResume.projects[0],
      achievements: [
        "Built deposit and withdrawal flows end to end across a user portal, an admin portal and .NET microservices that talk over Kafka",
        "Integrated local payment providers and banks with priority-based auto-selection, time-of-day provider schedules and admin retry of failed payouts",
        "Delivered admin tooling for multi-approval withdrawals, bank deposit reconciliation and live transaction updates over Server-Sent Events",
        "Integrated AI agents into the dev loop to automate code reviews and documentation",
      ],
    },
    {
      ...fullstackResume.projects[1],
      achievements: [
        "Built a robust microservices ecosystem with strict database separation following DDD principles",
        "Implemented event-driven communication using message queues to decouple core services",
        "Conducted extensive load testing and performance profiling to identify and resolve system bottlenecks",
      ],
    },
    {
      ...fullstackResume.projects[2],
      achievements: [
        "Refactored monolithic MVC application into a scalable 3-layer architecture (SOA)",
        "Optimized SQL Server query performance and database schema for high-concurrency license management",
      ],
    },
  ],
};

export const resumes: Record<string, ResumeData> = {
  fullstack: fullstackResume,
  backend: backendResume,
};

/** CV variant shown when no (or an unknown) `cvType` is requested. */
export const defaultCvType = "fullstack";

export const resumeData = resumes[defaultCvType];

const PROJECT_URL_PREFIX = "/projects/";

/** Slugs of projects that have a detail page (`url: "/projects/<slug>"`). */
export function projectSlugs() {
  return resumeData.projects
    .map((p) => p.url)
    .filter((url): url is string => Boolean(url?.startsWith(PROJECT_URL_PREFIX)))
    .map((url) => url.slice(PROJECT_URL_PREFIX.length));
}

/** Finds a top-level project by its detail-page slug (e.g. "cashquora"). */
export function findProjectBySlug(slug: string) {
  return resumeData.projects.find((p) => p.url === `${PROJECT_URL_PREFIX}${slug}`) ?? null;
}
