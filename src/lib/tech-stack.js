// Tech stack logos from CDN (using simpleicons.org via CDN)
export const techStack = {
  // Frontend
  react: {
    name: "React",
    icon: "https://cdn.simpleicons.org/react/61DAFB",
  },
  nextjs: {
    name: "Next.js",
    icon: "https://cdn.simpleicons.org/nextdotjs/000000",
  },
  vue: {
    name: "Vue.js",
    icon: "https://cdn.simpleicons.org/vuedotjs/4FC08D",
  },
  tailwind: {
    name: "Tailwind CSS",
    shortName: "Tailwind",
    icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
  },
  typescript: {
    name: "TypeScript",
    icon: "https://cdn.simpleicons.org/typescript/3178C6",
  },
  javascript: {
    name: "JavaScript",
    icon: "https://cdn.simpleicons.org/javascript/F7DF1E",
  },
  swiftui: {
    name: "SwiftUI",
    shortName: "Swift",
    icon: "https://cdn.simpleicons.org/swift/F05138",
  },
  swiftdata: {
    name: "SwiftData",
    shortName: "Swift",
    icon: "https://cdn.simpleicons.org/swift/F05138",
  },
  storekit: {
    name: "StoreKit",
    shortName: "iOS",
    icon: "https://cdn.simpleicons.org/apple/FFFFFF",
  },

  // Backend
  nodejs: {
    name: "Node.js",
    shortName: "Node",
    icon: "https://cdn.simpleicons.org/nodedotjs/339933",
  },
  python: {
    name: "Python",
    icon: "https://cdn.simpleicons.org/python/3776AB",
  },
  go: {
    name: "Go",
    icon: "https://cdn.simpleicons.org/go/00ADD8",
  },
  rust: {
    name: "Rust",
    icon: "https://cdn.simpleicons.org/rust/000000",
  },
  express: {
    name: "Express",
    icon: "https://cdn.simpleicons.org/express/000000",
  },
  fastapi: {
    name: "FastAPI",
    icon: "https://cdn.simpleicons.org/fastapi/009688",
  },

  // Databases
  postgresql: {
    name: "PostgreSQL",
    shortName: "Postgres",
    icon: "https://cdn.simpleicons.org/postgresql/4169E1",
  },
  mongodb: {
    name: "MongoDB",
    icon: "https://cdn.simpleicons.org/mongodb/47A248",
  },
  redis: {
    name: "Redis",
    icon: "https://cdn.simpleicons.org/redis/DC382D",
  },
  mysql: {
    name: "MySQL",
    icon: "https://cdn.simpleicons.org/mysql/4479A1",
  },

  // DevOps & Tools
  docker: {
    name: "Docker",
    icon: "https://cdn.simpleicons.org/docker/2496ED",
  },
  kubernetes: {
    name: "Kubernetes",
    icon: "https://cdn.simpleicons.org/kubernetes/326CE5",
  },
  git: {
    name: "Git",
    icon: "https://cdn.simpleicons.org/git/F05032",
  },
  github: {
    name: "GitHub",
    icon: "https://cdn.simpleicons.org/github/181717",
  },
  aws: {
    name: "AWS",
    icon: "https://cdn.simpleicons.org/amazonaws/232F3E",
  },
  vercel: {
    name: "Vercel",
    icon: "https://cdn.simpleicons.org/vercel/000000",
  },
  cloudflare: {
    name: "Cloudflare Workers",
    shortName: "Cloudflare",
    icon: "https://cdn.simpleicons.org/cloudflare/F38020",
  },

  // Other
  graphql: {
    name: "GraphQL",
    icon: "https://cdn.simpleicons.org/graphql/E10098",
  },
  firebase: {
    name: "Firebase",
    icon: "https://cdn.simpleicons.org/firebase/FFCA28",
  },
  supabase: {
    name: "Supabase",
    icon: "https://cdn.simpleicons.org/supabase/3FCF8E",
  },
  convex: {
    name: "Convex",
    icon: "https://cdn.simpleicons.org/convex/EE342F",
  },
};

export function getTechLabel(tech) {
  if (!tech) return "";
  if (typeof tech !== "string") return tech.shortName || tech.name || "";

  const config = techStack[tech];
  return config?.shortName || config?.name || tech;
}

export function getProjectTechLabels(techList = [], { limit } = {}) {
  const seen = new Set();
  const labels = [];

  techList.forEach((tech) => {
    const label = getTechLabel(tech);
    const key = label.toLowerCase();

    if (!label || seen.has(key)) return;

    seen.add(key);
    labels.push(label);
  });

  return typeof limit === "number" ? labels.slice(0, limit) : labels;
}
