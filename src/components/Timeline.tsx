import TimelineItem from "./TimelineItem";
import { experiences } from "../data/experiences";
import "./Timeline.css";

export default function Timeline() {
  return (
    <div className="timeline" aria-label="Professional experience timeline">
      {experiences.map((experience, index) => (
        <div key={`${experience.company}-${index}`} data-reveal data-reveal-delay={index * 120}>
          <TimelineItem
            company={experience.company}
            role={experience.role}
            period={experience.period}
            description={experience.description}
            achievements={experience.achievements}
            stack={experience.stack}
          />
        </div>
      ))}
    </div>
  );
}
