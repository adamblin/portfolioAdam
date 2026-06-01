import "./SectionTitle.css";

type SectionTitleProps = {
  children?: React.ReactNode;
};

export default function SectionTitle({ children = "Projects" }: SectionTitleProps) {
  return <h2 className="section-title" data-reveal>{children}</h2>;
}
