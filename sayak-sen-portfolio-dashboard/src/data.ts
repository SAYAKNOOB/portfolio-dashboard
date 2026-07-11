export interface Job {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
  skills: string[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  bullets: string[];
  skills: string[];
  metrics: { value: string; label: string }[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  period: string;
  location: string;
}

export interface Certification {
  id: string;
  name: string;
  provider: string;
  status: 'completed' | 'in-progress';
}

export const resumeData = {
  personal: {
    name: "Sayak Sen",
    title: "SDET & Automation Engineer",
    subTitle: "Python | Playwright | Guidewire QA | GCP | Oracle | Informatica/IICS",
    summary: "Automation Engineer with 2+ years of hands-on experience designing and executing end-to-end test life cycles across Guidewire PolicyCenter / ClaimCenter, GCP and Oracle DB. Delivered 100% SLA compliance and zero P0 defects in production across all release cycles. Proficient in Python/Playwright automation, CI/CD pipeline integration, REST API validation, cloud data migration testing, and stakeholder quality dashboards.",
    email: "ssayak02@gmail.com",
    phone: "+91 6290890754",
    location: "Bengaluru, Karnataka, India",
    linkedin: "https://linkedin.com/in/sayak--sen/",
    github: "https://github.com/SAYAKNOOB",
    facebook: "https://www.facebook.com/sayak.sen.372",
    instagram: "https://www.instagram.com/the_humoured_content/"
  },
  skills: [
    {
      category: "Test Automation",
      items: ["Playwright", "Python", "PyTest", "TypeScript", "Robo Framework", "Codegen", "PySpark", "Apache"],
      icon: "Cpu",
      color: "amber"
    },
    {
      category: "Cloud & Databases",
      items: ["GCP (BigQuery, Cloud SQL)", "Oracle", "Oracle Cloud", "DBeaver", "Azure Cloud", "SQL Optimisation"],
      icon: "Database",
      color: "emerald"
    },
    {
      category: "API & Backend",
      items: ["REST API Validation", "Source-to-Target Reconciliation", "Postman", "EchoAPI"],
      icon: "GitBranch",
      color: "sky"
    },
    {
      category: "ETL & Pipelines",
      items: ["Informatica IICS", "ETL Monitoring & Optimisation", "RAGs", "DAGs"],
      icon: "Layers",
      color: "violet"
    },
    {
      category: "Domain Expertise",
      items: ["Guidewire PolicyCenter", "Guidewire ClaimCenter", "Functional Testing", "Regression Testing", "UAT"],
      icon: "ShieldAlert",
      color: "rose"
    },
    {
      category: "DevOps & Tools",
      items: ["Git", "JIRA", "CI/CD", "Allure Reporting", "Agile/Scrum"],
      icon: "Workflow",
      color: "indigo"
    },
    {
      category: "AI & GenAI",
      items: ["Google AI Certified", "Google AI Studio", "Claude Certified", "GitHub Copilot", "ChatGPT/LLMs", "Rapid Prototyping", "Test Case Generation"],
      icon: "Sparkles",
      color: "fuchsia"
    },
    {
      category: "Programming",
      items: ["Python", "SQL", "TypeScript", "JavaScript", "Java (OOP/DSA)", "HTML", "CSS"],
      icon: "Terminal",
      color: "cyan"
    }
  ],
  experience: [
    {
      id: "exp-altimetrik",
      company: "Altimetrik India",
      role: "Automation Engineer — Testing",
      period: "Jun 2025 – Present",
      location: "Bengaluru, KA",
      bullets: [
        "Achieved 100% SLA compliance and zero production rollbacks by designing and executing 150+ Playwright/Python test cases across Guidewire PolicyCenter and ClaimCenter insurance workflows, covering functional and regression suites.",
        "Reduced backend data defect leakage to zero across all pre- and post-deployment verification cycles by implementing a multi-source validation framework spanning GCP (BigQuery, Cloud SQL), Oracle DB, and DBeaver.",
        "Maintained 100% on-time delivery and zero stakeholder complaints by authoring test plans, leading peer reviews, and publishing release-gate quality dashboards at every sprint cycle end."
      ],
      skills: ["Python", "Playwright", "TypeScript", "GCP", "Guidewire", "Oracle DB", "Allure Reporting", "Agile"]
    },
    {
      id: "exp-slk",
      company: "SLK Software Services Pvt. Ltd.",
      role: "QA Engineer / SDET",
      period: "Jun 2024 – Jun 2025",
      location: "Bengaluru, KA",
      bullets: [
        "Reduced manual regression effort by ~60% and enabled consistent weekly release cadence by architecting end-to-end automated test suites in Python, TypeScript, and Playwright across 3 enterprise Guidewire insurance platforms.",
        "Compressed a multi-week cross-cloud validation effort to days — a ~90% acceleration by leveraging GitHub Copilot, LLMs, and Model-Based Testing to build a GCP ↔ Oracle data validation framework.",
        "Maintained a zero P0-defect-in-production record across 10+ Guidewire deployments by owning end-to-end defect triage, replication documentation, and root-cause analysis for PolicyCenter and ClaimCenter releases.",
        "Ensured 100% data integrity compliance pre- and post-deployment by building source-to-target reconciliation pipelines that validated 500+ tables and 1M+ records across GCP, Oracle DB, and DBeaver.",
        "Reduced QA cycle time by 50–60% by developing TypeScript + Playwright GUI automation suites for Planview Portfolios with cross-browser coverage, fully integrated into CI/CD for nightly regression runs."
      ],
      skills: ["Python", "Playwright", "TypeScript", "GCP", "Guidewire", "Oracle DB", "Informatica", "IICS", "CI/CD", "Allure"]
    }
  ] as Job[],
  projects: [
    {
      id: "proj-tap-migration",
      title: "TAP Migration",
      category: "Migration · Data Validation",
      description: "End-to-end data integrity validation across Guidewire Cloud and on-prem Oracle & DBeaver databases. Designed 15+ Informatica/IICS ETL pipelines.",
      bullets: [
        "Reduced manual validation effort by ~75% and compressed sign-off time from 3 days to under 4 hours by building Python reconciliation scripts validating data integrity across 10+ domains, 500+ tables, and 1M+ records during Oracle-to-GCP migration.",
        "Improved ETL pipeline reliability by ~30% and execution performance by ~30% by designing, monitoring, and SQL-optimising 15+ Informatica IICS transformation pipelines."
      ],
      skills: ["Python", "Playwright", "Oracle DB", "Informatica IICS", "GCP", "BigQuery", "SQL"],
      metrics: [
        { value: "1M+", label: "Records Validated" },
        { value: "~75%", label: "Manual Effort Cut" },
        { value: "<4h", label: "Sign-off (was 3 days)" },
        { value: "~30%", label: "ETL Speed Boost" }
      ]
    },
    {
      id: "proj-claimcenter",
      title: "ClaimCenter Migration & Regression",
      category: "ClaimCenter · CI/CD",
      description: "End-to-end ClaimCenter migration from on-premises Oracle servers to Google Cloud using Informatica Intelligent Cloud Services and Python verification.",
      bullets: [
        "Compressed story completion from 5 days to under 24 hours by automating 100% of previously manual Guidewire ClaimCenter workflows.",
        "Reduced regression cycle time by ~40% by designing a scalable CI/CD regression framework with Allure dashboards enabling nightly automated runs."
      ],
      skills: ["Python", "CI/CD", "Allure", "BigQuery", "Cloud SQL", "Oracle DB", "ClaimCenter"],
      metrics: [
        { value: "~40%", label: "Faster Regression" },
        { value: "<24h", label: "Story Cycle (was 5d)" },
        { value: "100%", label: "Workflow Automation" },
        { value: "Zero", label: "Defect Slippage" }
      ]
    },
    {
      id: "proj-guidewire-regression",
      title: "Guidewire Regression Suite",
      category: "PolicyCenter & ClaimCenter",
      description: "Comprehensive regression test library covering PolicyCenter and ClaimCenter UI/UX and database dependencies.",
      bullets: [
        "Eliminated post-production defect leakage and improved release confidence across all sprints by creating and maintaining 1,000+ automated regression test cases for Guidewire PolicyCenter and ClaimCenter.",
        "Designed flexible, data-driven test configurations to support broad test coverage over 50+ database tables and 10+ business domains."
      ],
      skills: ["Python", "Playwright", "TypeScript", "PolicyCenter", "ClaimCenter", "Agile"],
      metrics: [
        { value: "1,000+", label: "Automated Cases" },
        { value: "50+", label: "DB Tables Covered" },
        { value: "100%", label: "Defect Prevention" },
        { value: "Zero", label: "P0 Slippages" }
      ]
    },
    {
      id: "proj-gcp-cross-platform",
      title: "GCP Cross-Platform Validation",
      category: "Cloud · Data Pipeline",
      description: "Python scripts automating cross-platform data integrity checks between GCP (BigQuery/Cloud SQL) and Oracle DB in hybrid-cloud environments.",
      bullets: [
        "Automated comparison engine using PySpark and SQL query optimization, decreasing discrepancy checking time from hours to minutes.",
        "Provided live alerting logs and daily status updates that were fully integrated into Allure dashboards for key executive reviews."
      ],
      skills: ["Python", "GCP", "BigQuery", "Cloud SQL", "Oracle DB", "PySpark", "SQL"],
      metrics: [
        { value: "100%", label: "Data Consistency" },
        { value: "Mins", label: "vs Hours Before" },
        { value: "Zero", label: "Data Defect Leakage" },
        { value: "Active", label: "Live Alert Logs" }
      ]
    }
  ] as Project[],
  education: [
    {
      id: "edu-nit",
      institution: "Narula Institute of Technology",
      degree: "B.Tech in Computer Science & Engineering",
      period: "Jul 2020 – Jul 2024",
      location: "West Bengal, India"
    },
    {
      id: "edu-nes",
      institution: "National English School",
      degree: "Higher Secondary (Science with Maths)",
      period: "Apr 2018 – Apr 2020",
      location: "Kolkata, West Bengal, India"
    },
    {
      id: "edu-cbs",
      institution: "Calcutta Boys' School",
      degree: "Secondary Education",
      period: "Completed",
      location: "West Bengal, India"
    }
  ] as Education[],
  certifications: [
    { id: "cert-google-ai", name: "Google AI Professional", provider: "Google Cloud", status: "completed" },
    { id: "cert-gcp-found", name: "Google Cloud Platform (GCP) Fundamentals", provider: "Google Cloud", status: "completed" },
    { id: "cert-pw-ts", name: "Playwright with TypeScript — Advanced Automation", provider: "Udemy / Specialist Certification", status: "completed" },
    { id: "cert-py-auto", name: "Python Automation — GCP BigQuery / Cloud SQL ↔ Oracle DB", provider: "Internal / Specialist Cert", status: "completed" },
    { id: "cert-agile", name: "Agile & Scrum Practitioner", provider: "Scrum Alliance", status: "completed" },
    { id: "cert-istqb", name: "ISTQB Foundation Level", provider: "ISTQB", status: "in-progress" },
    { id: "cert-gcp-genai", name: "Google Cloud Generative AI Leader Professional", provider: "Google Cloud", status: "in-progress" }
  ] as Certification[]
};
