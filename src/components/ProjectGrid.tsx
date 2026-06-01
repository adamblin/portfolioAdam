import { useMemo } from "react";
import ProjectCard from "./ProjectCard";
import { projects } from "../data/projects";
import { useReveal } from "../hooks/useReveal";
import "./ProjectGrid.css";

export default function ProjectGrid() {
  useReveal("0px 0px -28% 0px", "[data-project-reveal]", 0.18);

  const uniqueProjects = useMemo(() => {
    const seen = new Set<string>();
    return projects.filter((project) => {
      const key = project.title.trim().toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, []);

  const featuredProject = useMemo(
    () => uniqueProjects.find((project) => project.featured) ?? uniqueProjects[0],
    [uniqueProjects]
  );

  const orderedProjects = useMemo(() => {
    if (!featuredProject) return uniqueProjects;
    const rest = uniqueProjects.filter((project) => project.title !== featuredProject.title);
    return [featuredProject, ...rest];
  }, [featuredProject, uniqueProjects]);

  return (
    <div className="projects-grid" aria-label="Projects list">
      <div className="projects-list">
        {orderedProjects.map((project, i) => (
          <div
            key={project.title}
            className="project-reveal"
            data-project-reveal
            data-reveal-delay={i * 100}
          >
            <ProjectCard
              title={project.title}
              image={project.image}
              video={project.video}
              poster={project.poster}
              shortDescription={project.shortDescription}
              contributions={project.contributions}
              highlights={project.highlights}
              role={project.role}
              duration={project.duration}
              team={project.team}
              year={project.year}
              stack={project.stack}
              link={project.link}
              liveDemo={project.liveDemo}
              repo={project.repo}
              imageFit={project.imageFit}
              variant="featured"
            />
          </div>
        ))}
      </div>
      {orderedProjects.length === 0 && (
        <p className="projects-empty">More projects coming soon.</p>
      )}
    </div>
  );
}
