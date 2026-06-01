import profileImg from "../assets/Profile.jpeg";
import "./AboutMe.css";

export default function AboutMe() {
  return (
      <article className="about-card">
        <div className="about-top">
          <div className="about-text" data-reveal>
            <h3 className="about-heading">Hi, I'm Adam</h3>
            <p className="about-paragraph">
              I’m a curious and creative person who enjoys building things, understanding how
              systems work, and experimenting with ideas. I’m especially motivated by learning,
              problem-solving, and turning abstract concepts into something tangible.
            </p>
            <p className="about-paragraph">
              I love improving continuously — learning new skills, refining the way I work, and
              getting a little better every day. Outside of tech, you’ll usually find me reading,
              listening to podcasts, playing chess, or training at the gym.
            </p>
            <p className="about-paragraph">
              I’m equally into software engineering and game development, and I like combining both
              mindsets. I enjoy the structured side of building systems, but I also come up with ideas
              all the time and love shaping them into something people can actually see, feel, and use.
              Working on games while studying engineering taught me to think in terms of mechanics,
              feedback, and small details — the kind that make an experience click. Beyond the technical
              side, I’m also interested in social sciences and economics: how people behave, what
              motivates them, and how they interact with software and games over time.
            </p>
          </div>
          <div className="about-photo-col" data-reveal data-reveal-delay="120">
            <img
              src={profileImg}
              alt="Adam Benitez, software engineer and game developer"
              className="about-photo"
              width="240"
              height="240"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <div className="about-highlights" data-reveal data-reveal-delay="220">
          <ul className="about-pills">
            <li className="skill-pill">Creative Problem Solving</li>
            <li className="skill-pill">Performs Well Under Pressure</li>
            <li className="skill-pill">Strong Organizational Skills</li>
            <li className="skill-pill">Positive & Growth-Oriented Mindset</li>
          </ul>
        </div>
      </article>
  );
}
