import { useEffect, useRef } from "react";
import "./Section.css";

type SectionProps = {
  id?: string;
  children: React.ReactNode;
  fullWidth?: boolean;
  active?: boolean;
  variant?: "card" | "open";
};

export default function Section({ id, children, fullWidth = false, variant = "card" }: SectionProps) {
  const innerClass = [
    "section-inner",
    fullWidth ? "section-inner--full" : "",
    variant === "open" ? "section-inner--open" : "",
  ].filter(Boolean).join(" ");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (variant === "open") return; // open sections are always fully visible — no animation needed
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px 150px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [variant]);

  return (
    <section id={id} className="section">
      <div
        ref={ref}
        className={innerClass}
        data-reveal={variant !== "open" ? "" : undefined}
      >
        {children}
      </div>
    </section>
  );
}
