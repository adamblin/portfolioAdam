export type SkillLevel = "core" | "secondary";

export type Skill = {
  name: string;
  level: SkillLevel;
};

export type Category = {
  title: string;
  skills: Skill[];
};

export type StackSectionData = {
  title: string;
  categories: Category[];
};

export const engineeringSection: StackSectionData = {
  title: "Software Engineering",
  categories: [
    {
      title: "Cloud & DevOps",
      skills: [
        { name: "AWS", level: "core" },
        { name: "Terraform", level: "core" },
        { name: "Ansible", level: "core" },
        { name: "Jenkins", level: "core" }
      ]
    },
    {
      title: "Databases",
      skills: [
        { name: "Oracle", level: "core" },
        { name: "SQL", level: "core" },
        { name: "PL/SQL", level: "core" },
        { name: "MySQL", level: "secondary" },
        { name: "MongoDB", level: "secondary" }
      ]
    },
    {
      title: "Programming Languages",
      skills: [
        { name: "Java", level: "core" },
        { name: "C#", level: "core" },
        { name: "JavaScript", level: "core" },
        { name: "TypeScript", level: "core" },
        { name: "Python", level: "secondary" },
        { name: "C++", level: "secondary" }
      ]
    },
    {
      title: "Frontend",
      skills: [
        { name: "React", level: "core" },
        { name: "CSS", level: "core" },
        { name: "HTML", level: "core" },
        { name: "Vite", level: "secondary" }
      ]
    },
    {
  title: "Backend",
  skills: [
    { name: "Spring Boot", level: "core" },
    { name: "REST APIs", level: "core" },
    { name: "Spring Security", level: "core" },
    { name: "OAuth 2.0 (JWT-based)", level: "core" }
  ]
}
,
    {
      title: "Version Control",
      skills: [
        { name: "Git", level: "core" },
        { name: "GitHub", level: "core" }
      ]
    }
  ]
};

export const gameDevSection: StackSectionData = {
  title: "Game Development",
  categories: [
    {
      title: "Engines & Programming",
      skills: [
        { name: "Unity", level: "core" },
        { name: "C#", level: "core" },
        { name: "Unreal Engine", level: "secondary" },
        { name: "C++", level: "secondary" }
      ]
    },
    {
      title: "Art & Tools",
      skills: [
        { name: "Blender", level: "core" },
        { name: "Photoshop", level: "core" },
        { name: "Illustrator", level: "secondary" },
        { name: "Aseprite", level: "secondary" },
        { name: "3ds Max", level: "secondary" }
      ]
    },
    {
      title: "Design",
      skills: [
        { name: "UI/UX", level: "secondary" },
        { name: "Level Design", level: "secondary" }
      ]
    },
    {
      title: "Production",
      skills: [
        { name: "Jira", level: "secondary" },
        { name: "Trello", level: "secondary" },
        { name: "Notion", level: "secondary" }
      ]
    }
  ]
};
