import { engineeringSection, gameDevSection } from "../data/stacks";
import SkillPill from "./SkillPill";
import "./Stack.css";

export default function Stack() {
  return (
    <div className="stack-root">
      <div className="stack-columns">
        <section className="stack-panel stack-panel--engineering" data-reveal data-reveal-delay="0" aria-label="Software Engineering stack">
          <div className="stack-panel-head">
            <svg className="stack-panel-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
            <h3>{engineeringSection.title}</h3>
          </div>

          <div className="stack-categories">
            {engineeringSection.categories.map((category, index) => (
              <article
                key={category.title}
                className="stack-category-block"
                data-reveal
                data-reveal-delay={index * 70}
              >
                <h4>{category.title}</h4>
                <ul className="stack-pill-list">
                  {category.skills.map((skill) => (
                    <SkillPill key={`${category.title}-${skill.name}`} name={skill.name} level={skill.level} />
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="stack-panel stack-panel--game" data-reveal data-reveal-delay="120" aria-label="Game Development stack">
          <div className="stack-panel-head">
            <svg className="stack-panel-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H9v2H7v-2H5v-2h2V9h2v2h2v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5S14.67 12 15.5 12s1.5.67 1.5 1.5S16.33 15 15.5 15zm3-3c-.83 0-1.5-.67-1.5-1.5S17.67 9 18.5 9s1.5.67 1.5 1.5S19.33 12 18.5 12z"/>
            </svg>
            <h3>{gameDevSection.title}</h3>
          </div>

          <div className="stack-categories">
            {gameDevSection.categories.map((category, index) => (
              <article
                key={category.title}
                className="stack-category-block"
                data-reveal
                data-reveal-delay={120 + index * 70}
              >
                <h4>{category.title}</h4>
                <ul className="stack-pill-list">
                  {category.skills.map((skill) => (
                    <SkillPill key={`${category.title}-${skill.name}`} name={skill.name} level={skill.level} />
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
