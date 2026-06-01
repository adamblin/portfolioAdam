import { useMemo, useState } from "react";
import "./Stack.css";
import reactIcon from "../assets/react.svg";
const localIconModules = import.meta.glob("../assets/icons/*.svg", { eager: true }) as Record<string, any>;
const AWS_CLOUD_ICON_URL = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/AWS_Simple_Icons_AWS_Cloud.svg/960px-AWS_Simple_Icons_AWS_Cloud.svg.png";
const UNITY_ICON_URL = "https://s3-symbol-logo.tradingview.com/unity--600.png";
const BLENDER_ICON_URL = "https://upload.wikimedia.org/wikipedia/commons/0/0c/Blender_logo_no_text.svg";

type IconConfig = {
  simple?: string;
  simpleColor?: string;
  devicon?: string;
  emoji?: string;
};

const SKILL_ICON_CONFIG: Record<string, IconConfig> = {
  "react": { simple: "react", simpleColor: "61DAFB", devicon: "react", emoji: "⚛️" },
  "unity": { simple: "unity", simpleColor: "FFFFFF", devicon: "unity", emoji: "🎮" },
  "c#": { simple: "csharp", simpleColor: "9B4F96", devicon: "csharp", emoji: "#️⃣" },
  "c++": { simple: "cplusplus", simpleColor: "00599C", devicon: "cplusplus", emoji: "➕➕" },
  "java": { simple: "java", simpleColor: "ED8B00", devicon: "java", emoji: "☕" },
  "python": { simple: "python", simpleColor: "3776AB", devicon: "python", emoji: "🐍" },
  "javascript": { simple: "javascript", simpleColor: "F7DF1E", devicon: "javascript", emoji: "📜" },
  "typescript": { simple: "typescript", simpleColor: "3178C6", devicon: "typescript", emoji: "🔵" },
  "html": { simple: "html5", simpleColor: "E34F26", devicon: "html5", emoji: "🔶" },
  "css": { simple: "css3", simpleColor: "1572B6", devicon: "css3", emoji: "🎨" },
  "spring boot": { simple: "spring", simpleColor: "6DB33F", devicon: "spring", emoji: "🌱" },
  "git": { simple: "git", simpleColor: "F05032", devicon: "git", emoji: "🔧" },
  "github": { simple: "github", simpleColor: "181717", devicon: "github", emoji: "🐙" },
  "aws": { simple: "amazonaws", simpleColor: "FF9900", devicon: "amazonwebservices", emoji: "☁️" },
  "terraform": { simple: "terraform", simpleColor: "7B42BC", devicon: "terraform", emoji: "🧱" },
  "ansible": { simple: "ansible", simpleColor: "EE0000", devicon: "ansible", emoji: "⚙️" },
  "jenkins": { simple: "jenkins", simpleColor: "D24939", devicon: "jenkins", emoji: "🤖" },
  "mongodb": { simple: "mongodb", simpleColor: "47A248", devicon: "mongodb", emoji: "🍃" },
  "mysql": { simple: "mysql", simpleColor: "4479A1", devicon: "mysql", emoji: "🗄️" },
  "oracle": { simple: "oracle", simpleColor: "F80000", devicon: "oracle", emoji: "🗄️" },
  "sql": { simple: "mysql", simpleColor: "4479A1", emoji: "🗄️" },
  "pl/sql": { simple: "oracle", simpleColor: "F80000", emoji: "🗄️" },
  "rest apis": { simple: "swagger", simpleColor: "85EA2D", emoji: "🔗" },
  "spring security": { simple: "spring", simpleColor: "6DB33F", emoji: "🛡️" },
  "oauth 2.0 (jwt-based)": { simple: "jsonwebtokens", simpleColor: "000000", emoji: "🔐" },
  "jwt": { simple: "jsonwebtokens", simpleColor: "000000", emoji: "🔐" },
  "oauth 2.0": { emoji: "🔐" },
  "microservices": { emoji: "🧩" },
  "vite": { simple: "vite", simpleColor: "646CFF", devicon: "vite", emoji: "⚡" },
  "android studio": { simple: "androidstudio", simpleColor: "3DDC84", devicon: "androidstudio", emoji: "🤖" },
  "unreal engine": { simple: "unrealengine", simpleColor: "0E1128", devicon: "unrealengine", emoji: "🕹️" },
  "photoshop": { simple: "adobephotoshop", simpleColor: "31A8FF", devicon: "photoshop", emoji: "🖌️" },
  "illustrator": { simple: "adobeillustrator", simpleColor: "FF9A00", devicon: "illustrator", emoji: "🖍️" },
  "blender": { simple: "blender", simpleColor: "E87D0D", devicon: "blender", emoji: "🧊" },
  "aseprite": { simple: "aseprite", simpleColor: "7D929E", emoji: "🎞️" },
  "3ds max": { simple: "autodesk", simpleColor: "000000", emoji: "📐" },
  "ui/ux": { emoji: "🧠" },
  "level design": { emoji: "🗺️" },
  "trello": { simple: "trello", simpleColor: "0052CC", devicon: "trello", emoji: "🗂️" },
  "jira": { simple: "jira", simpleColor: "0052CC", devicon: "jira", emoji: "📈" },
  "notion": { simple: "notion", simpleColor: "000000", devicon: "notion", emoji: "📒" },
  "ai": { simple: "openai", simpleColor: "412991", emoji: "🤖" },
};

const SKILL_ALIASES: Record<string, string> = {
  "amazon web service": "aws",
  "amazon web services": "aws",
  "amazon web service (aws)": "aws",
  "amazon web services (aws)": "aws",
  "amazon aws": "aws",
};

function findLocalIconBySlug(slug: string): string | undefined {
  const lowerSlug = slug.toLowerCase();
  const entry = Object.entries(localIconModules).find(([path]) => {
    const normalizedPath = path.toLowerCase();
    return (
      normalizedPath.endsWith(`/logo-${lowerSlug}.svg`) ||
      normalizedPath.endsWith(`/${lowerSlug}.svg`)
    );
  });
  const mod = entry?.[1] as any;
  if (!mod) return undefined;
  return typeof mod === "string" ? mod : (mod.default as string | undefined);
}

export type SkillPillProps = {
  name: string;
  level?: "core" | "secondary";
  variant?: "default" | "hero" | "compact";
};

function normalizeSkillKey(name: string): string {
  return name.trim().toLowerCase();
}

function resolveSkillKey(name: string): string {
  const key = normalizeSkillKey(name);
  return SKILL_ALIASES[key] ?? key;
}

function getIconConfig(name: string): IconConfig | undefined {
  const aliasKey = resolveSkillKey(name);

  return (
    SKILL_ICON_CONFIG[aliasKey] ??
    SKILL_ICON_CONFIG[aliasKey.replace(/\s+/g, "")] ??
    undefined
  );
}
function getIconSources(name: string): string[] {
  const key = resolveSkillKey(name);
  const config = getIconConfig(name);
  const sources: string[] = [];

  if (key === "aws") {
    sources.push(AWS_CLOUD_ICON_URL);
  }

  if (key === "unity") {
    sources.push(UNITY_ICON_URL);
  }

  if (key === "blender") {
    sources.push(BLENDER_ICON_URL);
  }
  
  if (key === "react") sources.push(reactIcon);
  
  const localSlug = key.replace(/[^a-z0-9]+/g, "-");
  const localUrl = findLocalIconBySlug(localSlug);
  if (localUrl) sources.push(localUrl);

  if (config?.simple) {
    if (config.simpleColor) {
      sources.push(`https://cdn.simpleicons.org/${config.simple}/${config.simpleColor}`);
    }
    sources.push(`https://cdn.simpleicons.org/${config.simple}`);
  }

  if (config?.devicon) {
    const devKey = config.devicon;
    sources.push(`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${devKey}/${devKey}-original.svg`);
  }

  return Array.from(new Set(sources));
}

function getEmojiFallback(name: string): string {
  return getIconConfig(name)?.emoji ?? "🔷";
}

export default function SkillPill({ name, level = "secondary", variant = "default" }: SkillPillProps) {
  const [srcIndex, setSrcIndex] = useState(0);
  const sources = useMemo(() => getIconSources(name), [name]);
  const currentSrc = sources[srcIndex];
  const showEmoji = !currentSrc || srcIndex >= sources.length;
  
  const pillClass = `skill-pill skill-pill--${variant} ${level}`;
  
  return (
    <li className={pillClass} title={name} data-name={name} aria-label={name}>
      <span className="pill-icon-wrapper">
        {currentSrc && (
          <span className="pill-icon"><img src={currentSrc} alt="" referrerPolicy="no-referrer" onError={() => setSrcIndex(i => i + 1)} /></span>
        )}
        {showEmoji && (
          <span className="pill-icon" aria-hidden="true">{getEmojiFallback(name)}</span>
        )}
      </span>
      <span className="pill-label">{name}</span>
    </li>
  );
}
