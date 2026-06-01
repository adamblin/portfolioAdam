import SkillPill from "./SkillPill";
import type { Category } from "../data/stacks";
import "./Stack.css";

export default function StackCard({ title, skills }: Category) {
  return (
    <article className={`stack-card ${skills.length <= 4 ? 'compact' : ''}`}>
      <h4 className="stack-card-title">{title}</h4>
      <ul className="stack-card-items">
        {skills.map((s) => (
          <SkillPill key={s.name} name={s.name} level={s.level} />
        ))}
      </ul>
    </article>
  );
}
