import "./TimelineItem.css";

type TimelineItemProps = {
  company: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
  stack?: string;
};

export default function TimelineItem({
  company,
  role,
  period,
  description,
  achievements,
  stack
}: TimelineItemProps) {
  return (
    <div className="timeline-item">
      <div className="timeline-dot"></div>
      <div className="timeline-content">
        <div className="timeline-header">
          <h3 className="timeline-company">{company}</h3>
          <span className="timeline-period">{period}</span>
        </div>
        <h4 className="timeline-role">{role}</h4>
        <p className="timeline-description">{description}</p>
        <ul className="timeline-achievements">
          {achievements.map((achievement, index) => (
            <li key={index}>{achievement}</li>
          ))}
        </ul>
        {stack && (
          <ul className="timeline-stack" aria-label="Technologies used">
            {stack.split(",").map(s => s.trim()).filter(Boolean).map(tech => (
              <li key={tech} className="timeline-tech-tag">{tech}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
