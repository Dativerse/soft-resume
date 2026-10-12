// Backend variant: reuses the fullstack resume and overrides the
// backend-focused sections.
import { fullstackResume } from "./fullstack";
import type { ResumeData } from "./types";

export const backendResume: ResumeData = {
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
        "Designing multi-tenant APIs, database schemas, and subscription/billing logic with Node.js, PostgreSQL, and Redis",
      ],
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
        "Implemented core package for centralized exception handling, and outage management"
      ],
    },
  ],
};
