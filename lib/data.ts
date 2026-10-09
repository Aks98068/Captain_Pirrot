export type Item = {
  title: string;
  slug: string;
  category: string;
  description: string;
  meta?: string;
  status?: string;
  tags?: string[];
};

export const data: Record<string, Item[]> = {
  research: [
    {
      title: "Modern Session Boundaries",
      slug: "modern-session-boundaries",
      category: "Web Security",
      description:
        "An applied study of session invalidation, token rotation, and trust boundaries in distributed applications.",
      meta: "18 JUN 2026",
      status: "Published",
      tags: ["OAuth", "Web", "Identity"],
    },
    {
      title: "DNS as a Detection Surface",
      slug: "dns-detection-surface",
      category: "Network Security",
      description:
        "Mapping low-noise behavioral indicators across encrypted and conventional DNS infrastructure.",
      meta: "04 MAY 2026",
      status: "Peer review",
      tags: ["DNS", "Detection"],
    },
    {
      title: "Recovering Intent from Binaries",
      slug: "recovering-intent",
      category: "Reverse Engineering",
      description:
        "A repeatable methodology for reconstructing software behavior from optimized executables.",
      meta: "21 MAR 2026",
      status: "Published",
      tags: ["Binary", "Analysis"],
    },
    {
      title: "Prompt Boundaries Under Pressure",
      slug: "prompt-boundaries",
      category: "AI Security",
      description:
        "Evaluating instruction hierarchy, tool access, and data exfiltration paths in agentic systems.",
      meta: "12 FEB 2026",
      status: "Ongoing",
      tags: ["AI", "Agents"],
    },
  ],
  projects: [
    {
      title: "Zebra",
      slug: "zebra",
      category: "Security Tooling",
      description:
        "A modular attack-surface mapper for observable services, assets, and trust relationships.",
      meta: "UPDATED 2D AGO",
      status: "Active",
      tags: ["TypeScript", "Go", "Graph"],
    },
    {
      title: "Northstar Gateway",
      slug: "northstar-gateway",
      category: "Defensive Security",
      description:
        "Policy-first application gateway with transparent audit trails and precise access controls.",
      meta: "UPDATED 8D AGO",
      status: "Beta",
      tags: ["Rust", "OPA", "Docker"],
    },
    {
      title: "Trace Evidence",
      slug: "trace-evidence",
      category: "Digital Forensics",
      description:
        "Evidence intake, hashing, chain-of-custody, and collaborative forensic review.",
      meta: "UPDATED 14D AGO",
      status: "Active",
      tags: ["Python", "MySQL"],
    },
    {
      title: "Spectra",
      slug: "spectra",
      category: "Network Analysis",
      description:
        "A quiet network telemetry workbench built for analysts, educators, and small research teams.",
      meta: "UPDATED 24D AGO",
      status: "Research",
      tags: ["Go", "PCAP", "WASM"],
    },
  ],
  writeups: [
    {
      title: "Deserialization Without the Drama",
      slug: "deserialization-without-drama",
      category: "Web",
      description:
        "A practical anatomy of unsafe object reconstruction, exploitability, and durable remediation.",
      meta: "12 MIN READ",
      status: "Advanced",
      tags: ["Java", "AppSec"],
    },
    {
      title: "Tracing a Memory Corruption Primitive",
      slug: "memory-corruption-primitive",
      category: "Reverse Engineering",
      description:
        "From crash artifact to controlled primitive: a structured lab walkthrough.",
      meta: "19 MIN READ",
      status: "Expert",
      tags: ["Pwn", "GDB"],
    },
    {
      title: "Forensic Triage on Minimal Linux Hosts",
      slug: "linux-forensic-triage",
      category: "Forensics",
      description:
        "What to preserve, what to trust, and how to reason when tooling is limited.",
      meta: "14 MIN READ",
      status: "Intermediate",
      tags: ["Linux", "IR"],
    },
  ],
  blog: [
    {
      title: "Why We Publish the Failed Experiments",
      slug: "publish-failed-experiments",
      category: "Community",
      description:
        "Research is not a highlight reel. Our notes, dead ends, and revisions are part of the work.",
      meta: "26 JUN 2026",
      tags: ["Culture", "Research"],
    },
    {
      title: "Building Zebra in Public",
      slug: "building-zebra",
      category: "Development",
      description:
        "Architecture decisions, broken assumptions, and the next stage of our mapping toolkit.",
      meta: "10 JUN 2026",
      tags: ["Open Source", "Zebra"],
    },
    {
      title: "A Small Collective, Deliberately",
      slug: "small-collective",
      category: "Announcements",
      description:
        "How independence shapes our research agenda, partnerships, and publishing model.",
      meta: "19 MAY 2026",
      tags: ["Collective"],
    },
  ],
  resources: [
    {
      title: "Web Assessment Field Guide",
      slug: "web-assessment-field-guide",
      category: "Learning Path",
      description:
        "A structured route from HTTP fundamentals to modern application assessment.",
      meta: "CURATED",
      tags: ["Web", "Learning"],
    },
    {
      title: "Incident Triage Checklist",
      slug: "incident-triage-checklist",
      category: "Cheat Sheet",
      description:
        "A concise evidence-first checklist for the opening hour of an incident.",
      meta: "PDF · 8 PAGES",
      tags: ["IR", "Forensics"],
    },
    {
      title: "Reverse Engineering Reading List",
      slug: "reverse-engineering-list",
      category: "Books & Papers",
      description:
        "Foundational and contemporary material, organized by practical objective.",
      meta: "34 REFERENCES",
      tags: ["RE", "Binary"],
    },
  ],
};

export const navGroups = {
  Research: [
    "Security Research",
    "Web Security",
    "Network Security",
    "Reverse Engineering",
    "Digital Forensics",
    "OSINT",
    "AI Security",
  ],
  Projects: [
    "All Projects",
    "Open Source",
    "Security Tools",
    "Research Projects",
  ],
  Activity: ["CTF", "Certificates", "Achievements", "GitHub"],
  Knowledge: ["Writeups", "Blog", "Resources"],
  About: ["About", "Team", "Resume", "Contact"],
};

export const pageConfig: Record<
  string,
  {
    label: string;
    title: string;
    intro: string;
    index: string;
    dataKey?: string;
    filters?: string[];
  }
> = {
  research: {
    label: "RESEARCH ARCHIVE",
    title: "Work that withstands scrutiny.",
    intro:
      "Original investigations, technical experiments, and applied security research—documented with enough precision to be challenged, repeated, and improved.",
    index: "01",
    dataKey: "research",
  },
  projects: {
    label: "ENGINEERING",
    title: "Tools built from the research.",
    intro:
      "Open-source utilities, research infrastructure, and security products designed around clear problems—not feature lists.",
    index: "02",
    dataKey: "projects",
    filters: ["All", "Open Source", "Security Tools", "Research Projects"],
  },
  writeups: {
    label: "TECHNICAL PUBLICATION",
    title: "Analysis, not content.",
    intro:
      "Deep technical writing on vulnerabilities, systems, competitions, and the methods we use to understand them.",
    index: "03",
    dataKey: "writeups",
    filters: [
      "All",
      "Web",
      "Network",
      "Reverse Engineering",
      "Forensics",
      "CTF",
    ],
  },
  blog: {
    label: "FIELD NOTES",
    title: "From inside the collective.",
    intro:
      "Announcements, development stories, opinions, and learning notes. For technical analysis, visit the Writeups archive.",
    index: "04",
    dataKey: "blog",
    filters: ["All", "Announcements", "Development", "Learning", "Community"],
  },
  resources: {
    label: "KNOWLEDGE BASE",
    title: "Useful things, carefully selected.",
    intro:
      "Field guides, papers, tools, learning paths, labs, and references we trust enough to recommend.",
    index: "09",
    dataKey: "resources",
    filters: [
      "All",
      "Security Tools",
      "Books & Papers",
      "Learning Paths",
      "Cheat Sheets",
    ],
  },
};
