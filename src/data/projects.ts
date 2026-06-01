import sunriseImg from "../assets/sunrise.png";
import colorShifterImg from "../assets/ColorShifter.png";

export type Project = {
  title: string;
  image?: string;
  video?: string;
  poster?: string;
  shortDescription?: string;
  contributions?: string[];
  highlights?: {
    objective?: string;
    contribution?: string;
    result?: string;
  };
  role?: string;
  duration?: string;
  team?: string;
  year?: string;
  stack: string[];
  link?: string;
  liveDemo?: string;
  repo?: string;
  featured?: boolean;
  imageFit?: "cover" | "contain";
};

export const projects: Project[] = [
  {
    title: "Sunrise",
    image: sunriseImg,
    video: "https://www.youtube.com/watch?v=95t_7wyq9rk",
    poster: sunriseImg,
    role: "Programmer & Producer",
    team: "Team of 6",
    year: "2025",
    shortDescription:
      "First-person stealth-action game set in the 18th century, where an ancient vampire awakens at dawn to defend his castle from a holy crusade.",
    contributions: [
      "Produced the project across a six-person team, coordinating tasks, milestones, scope control, and delivery planning.",
      "Programmed Unity gameplay systems in C#, supporting first-person stealth, interaction flow, and core player mechanics.",
      "Integrated the audio pipeline and in-game sound behavior to reinforce tension, feedback, and moment-to-moment game feel.",
    ],
    highlights: {
      result: "Released as a playable Windows build, combining stealth traversal, supernatural abilities, and a polished team production pipeline.",
    },
    stack: ["Unity", "C#", "Trello", "GitHub"],
    link: "https://valls.itch.io/sunrise",
    repo: "https://github.com/RubenMailloBaena/Proyectos_3_AlarmaTeam",
    featured: true,
    imageFit: "cover",
  },
  {
    title: "ColorShifter",
    image: colorShifterImg,
    video: "https://www.youtube.com/watch?v=Dlx45woehSU",
    role: "Designer & Programmer",
    team: "Team of 5",
    year: "2024",
    shortDescription:
      "2D puzzle-platformer about Chroma, a chameleon who loses his natural colors after a meteorite impact and must recover them through color-based challenges.",
    contributions: [
      "Led game design and programming, shaping the core color-recovery concept into a playable puzzle-platformer loop.",
      "Programmed Unity gameplay systems in C#, including movement, jumping, aiming, shooting, and interaction logic.",
      "Designed level and puzzle flow around readable color mechanics, keeping progression clear while introducing new challenges.",
    ],
    highlights: {
      result: "Released as a playable Windows build, combining 2D platforming, puzzle progression, and a colorful character-driven premise.",
    },
    stack: ["Unity", "C#", "Level Design", "GitHub"],
    link: "https://adamblin.itch.io/colorshifter",
    repo: "https://github.com/adamblin/ColorShifter",
    featured: true,
    imageFit: "cover",
  },
];
