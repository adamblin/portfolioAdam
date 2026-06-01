import "./ProjectCard.css";
import SkillPill from "./SkillPill";
import { useRef, useState } from "react";

type ProjectCardProps = {
  title: string;
  image?: string;
  video?: string;
  poster?: string;
  shortDescription?: string;
  highlights?: {
    objective?: string;
    contribution?: string;
    result?: string;
  };
  contributions?: string[];
  role?: string;
  duration?: string;
  team?: string;
  year?: string;
  stack: string[];
  link?: string;
  liveDemo?: string;
  repo?: string;
  imageFit?: "cover" | "contain";
  variant?: "featured" | "compact";
};

export default function ProjectCard({
  title,
  image,
  video,
  poster,
  shortDescription,
  highlights,
  contributions,
  role,
  team,
  year,
  stack,
  link,
  liveDemo,
  repo,
  imageFit = "cover",
  variant = "featured",
}: ProjectCardProps) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isCompact = variant === "compact";

  type EmbedInfo = { url: string; service: "youtube" | "vimeo"; id?: string };

  const toYouTubeEmbed = (url: string): EmbedInfo | null => {
    try {
      const u = new URL(url);
      if (u.hostname.includes("youtu.be")) {
        const id = u.pathname.slice(1);
        return { url: `https://www.youtube.com/embed/${id}?mute=1&controls=0&playsinline=1`, service: "youtube", id };
      }
      if (u.hostname.includes("youtube.com")) {
        const id = u.searchParams.get("v");
        if (id) {
          return { url: `https://www.youtube.com/embed/${id}?mute=1&controls=0&playsinline=1`, service: "youtube", id };
        }
      }
    } catch {}
    return null;
  };

  const toVimeoEmbed = (url: string): EmbedInfo | null => {
    try {
      const u = new URL(url);
      if (u.hostname.includes("vimeo.com")) {
        const id = u.pathname.split("/").pop();
        return { url: `https://player.vimeo.com/video/${id}?muted=1`, service: "vimeo" };
      }
    } catch {}
    return null;
  };

  const embed = video ? (toYouTubeEmbed(video) ?? toVimeoEmbed(video)) : null;
  const stackPills = stack.map((s) => <SkillPill key={s} name={s} level="secondary" />);
  const metaItems = [role, team, year].filter(Boolean) as string[];
  const topContribution = contributions?.[0] ?? null;

  return (
    <article className={`project-card border ${isCompact ? "is-compact" : "is-featured"}`}>
      <div className="card-grid">
        <div className={`card-media media${playing ? " playing" : ""}`}>
          <div
            className="visual"
            role="button"
            tabIndex={0}
            aria-label={playing ? `Pause ${title} demo` : `Play ${title} demo`}
            aria-pressed={playing}
            onMouseEnter={() => {
              if (embed) setPlaying(true);
              if (!embed && videoRef.current) {
                videoRef.current.play();
                setPlaying(true);
              }
            }}
            onMouseLeave={() => {
              if (embed) setPlaying(false);
              if (!embed && videoRef.current) {
                videoRef.current.pause();
                setPlaying(false);
              }
            }}
            onClick={() => {
              const next = !playing;
              setPlaying(next);
              if (!embed && videoRef.current) {
                next ? videoRef.current.play() : videoRef.current.pause();
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                const next = !playing;
                setPlaying(next);
                if (!embed && videoRef.current) {
                  next ? videoRef.current.play() : videoRef.current.pause();
                }
              }
            }}
          >
            {image && (
              <img
                className={`image ${imageFit}`}
                src={image}
                alt={title}
                loading="lazy"
                decoding="async"
                fetchPriority="low"
              />
            )}

            {video && embed && playing && (
              <div className="video-embed">
                <iframe
                  src={`${embed.url}&autoplay=1${embed.service === "youtube" ? `&loop=1&playlist=${embed.id}` : `&loop=1`}`}
                  allow="autoplay; fullscreen; picture-in-picture"
                  title={`${title} demo`}
                />
              </div>
            )}

            {video && !embed && (
              <video
                ref={videoRef}
                className="video"
                src={video}
                poster={poster || image}
                muted
                preload="metadata"
                playsInline
                onEnded={() => {
                  if (playing && videoRef.current) {
                    try {
                      videoRef.current.currentTime = 0;
                    } catch {}
                    videoRef.current.play();
                  }
                }}
              />
            )}

            {video && (
              <div className={`play-overlay${playing ? " play-overlay--hidden" : ""}`} aria-hidden="true">
                <svg className="play-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="24" cy="24" r="24" fill="rgba(0,0,0,0.48)" />
                  <polygon points="19,14 38,24 19,34" fill="white" />
                </svg>
              </div>
            )}
          </div>

        </div>

        <div className="card-info">
          <div className="info-main">
            <h2 className="title">{title}</h2>
            {metaItems.length > 0 && (
              <p className="project-meta-line" aria-label="Project details">
                {metaItems.join(' · ')}
              </p>
            )}
            {shortDescription && <p className="description">{shortDescription}</p>}
            {topContribution && (
              <ul className="project-highlights">
                <li>{topContribution}</li>
              </ul>
            )}
            {highlights?.result && (
              <p className="description description--result">{highlights.result}</p>
            )}
          </div>

          <div className="info-footer">
            {(link || liveDemo || repo) && (
              <div className="actions">
                {(link || liveDemo) && (
                  <a className="btn primary" href={link ?? liveDemo} target="_blank" rel="noopener noreferrer">
                    View Project →
                  </a>
                )}
                {repo && (
                  <a className="btn secondary" href={repo} target="_blank" rel="noopener noreferrer">
                    Source Code
                  </a>
                )}
              </div>
            )}

            <ul className={`stack-items ${isCompact ? "stack-items--compact" : "stack-items--featured"}`}>
              {stackPills}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}
