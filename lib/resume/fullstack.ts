import { commonCertifications, commonEducation, personal } from "./common";
import type { ResumeData } from "./types";

export const fullstackResume: ResumeData = {
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
      endDate: "Oct 2026",
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
        "Implemented core package for centralized exception handling, and outage management"
      ],
    },
  ],
  codingProfiles: [],
  certifications: commonCertifications,
};
