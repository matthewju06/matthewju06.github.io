export type SiteLink = {
  label: string;
  href: string;
  external?: boolean;
};

export const profile = {
  name: "Matthew Ju",
  role: ["CS & Stats @ UIUC", "Expected May 2028"],
  focus: "Backend systems & data",
  links: [
    { label: "GitHub", href: "https://github.com/matthewju06", external: true },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/matthew-ju/",
      external: true,
    },
    { label: "Email", href: "mailto:matthewju06@gmail.com" },
    {
      label: "Resume",
      href: "/assets/Matthew_Ju_Resume_2026.pdf",
      external: true,
    },
  ] satisfies SiteLink[],
};

export const nav = [
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
] as const;

export const about = {
  lead: "I'm Matthew, a Computer Science & Statistics student at UIUC.",
};

export const education = {
  school: "University of Illinois Urbana-Champaign",
  date: "Expected May 2028",
  degree: "B.S. in Computer Science & Statistics, GPA 3.77/4.00",
  coursework:
    "Data Structures, Computer Architecture, Systems Programming, Databases, Probability & Statistics",
};

export const experience = [
  {
    org: "Corteva",
    date: "May 2026 – Aug 2026",
    role: "Software Engineering Intern, Johnston, Iowa",
    paragraphs: [
      "Refactored 13 ASP.NET Core controllers into a layered service architecture, adding pagination, response DTOs, Entra ID JWT auth on previously open endpoints, and a file-path traversal fix. Added 8 Playwright suites and 10+ xUnit tests as Azure DevOps predeployment gates, and rebuilt 8 Angular pages with Material, AG Grid, and MapCon status updates.",
    ],
  },
  {
    org: "AbbVie",
    date: "Jun 2024 – Aug 2024",
    role: "Data Engineering Intern, North Chicago, Illinois",
    paragraphs: [
      "Built a Python pipeline to extract and visualize industrial sensor data, cutting processing time by 50%, with moving-average and median filters for streaming anomaly detection.",
    ],
  },
];

export const projects: {
  id?: string;
  name: string;
  date?: string;
  stack: string;
  paragraphs: string[];
  links: SiteLink[];
  note?: string;
}[] = [
  {
    id: "pearlmetric",
    name: "PearlMetric",
    stack: "C#, ASP.NET Core, Python, FastAPI, Angular, PostgreSQL, OpenCV, Docker",
    paragraphs: [
      "Dental shade MVP: Angular, an ASP.NET Core gateway, and a FastAPI service that segments a tooth region and matches it to 16 Vita shades with OpenCV and CIEDE2000. 17 authenticated endpoints on a 6-table PostgreSQL schema, 50+ tests, and Docker Compose with Caddy.",
    ],
    links: [
      {
        label: "staging.pearlmetric.com",
        href: "https://staging.pearlmetric.com/",
        external: true,
      },
    ],
  },
  {
    name: "ListingLab",
    date: "Dec 2025 – Present",
    stack: "FastAPI, Angular, PostgreSQL, Redis, Vercel",
    paragraphs: [
      "eBay price research on Vercel. Concurrent Browse API requests dedupe up to 400 listings, with Redis caching, per-IP rate limits, and a locked OAuth refresh. Tukey IQR and log-gap segmentation suggest buying ranges, and ECharts charts link to the table.",
    ],
    links: [
      {
        label: "listing-lab.vercel.app",
        href: "https://listing-lab.vercel.app/",
        external: true,
      },
      {
        label: "GitHub",
        href: "https://github.com/matthewju06/ListingLab-eBay-listing-analyzer",
        external: true,
      },
    ],
  },
  {
    id: "tailor",
    name: "Tailor",
    stack: "TypeScript, Next.js, React, IndexedDB, Vercel AI SDK, LaTeX",
    paragraphs: [
      "Next.js resume editor. Resume data is stored in IndexedDB across 7 tables, with JSON import and export, and AI edits are reviewed before they are saved. Zod checks structure on 25+ models, and a LaTeX parser plus the TeXLive API compile the PDF.",
    ],
    links: [
      {
        label: "tailor-ur-resume.vercel.app",
        href: "https://tailor-ur-resume.vercel.app/",
        external: true,
      },
    ],
  },
  {
    name: "MCP Weather Server",
    date: "Jan 2026",
    stack: "Python, FastMCP, Docker, Open-Meteo API",
    paragraphs: [
      "A Python MCP server for current conditions, forecasts, and alerts across 48,000+ cities.",
    ],
    links: [],
    note: "GitHub coming soon",
  },
  {
    name: "Locked In Toolbox",
    date: "Oct 2025 – Dec 2025",
    stack: "React, TypeScript, Supabase, SQL, REST APIs",
    paragraphs: [
      "A study platform that shows daily activity and tool usage in an analytics dashboard.",
    ],
    links: [
      {
        label: "Presentation",
        href: "https://docs.google.com/presentation/d/1-8PPp-UHHBu3jmKzqPbaIDZtX5yNaxF6-KkhTnra6D4/edit?usp=sharing",
        external: true,
      },
      {
        label: "GitHub",
        href: "https://github.com/CS222-UIUC/fa25-fa25-team085",
        external: true,
      },
    ],
  },
  {
    name: "PokeNotify Auto Link Opener",
    date: "Jul 2025",
    stack: "JavaScript, HTML/CSS",
    paragraphs: [
      "A Chrome extension that watches Discord channels and opens matching links as messages arrive.",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/matthewju06/PokeNotify-Autolink-Extension",
        external: true,
      },
    ],
  },
];

export const skills = [
  { label: "Languages", items: "Python, C#, TypeScript, C++, SQL" },
  { label: "Backend", items: "ASP.NET Core, EF Core, FastAPI, REST APIs" },
  {
    label: "Frontend",
    items: "Angular, React, Next.js, AG Grid, Tailwind CSS, Apache ECharts",
  },
  { label: "Data", items: "pandas, NumPy, OpenCV, matplotlib" },
  {
    label: "Databases",
    items: "PostgreSQL, Azure SQL, Redis, IndexedDB, Neon",
  },
  {
    label: "Tools",
    items: "Git, Docker, Azure DevOps, GitHub Actions, Microsoft Entra ID, Vercel, Clerk",
  },
  { label: "Testing", items: "Playwright, xUnit, pytest, Vitest" },
];
