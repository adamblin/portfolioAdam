import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-inner" data-reveal>
        <div className="footer-social">
          <a
            className="social-button linkedin"
            href="https://www.linkedin.com/in/adam-benitez"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            className="social-button itch"
            href="https://adamblin.itch.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            itch.io
          </a>
        </div>
        <p className="footer-copy">© {year} Adam Benitez — Built with React & TypeScript.</p>
      </div>
    </footer>
  );
}
