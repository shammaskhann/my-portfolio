import { Icon, Marquee } from "./ui";
import css from "./Footer.module.css";

const items = ["Flutter", "Spring Boot", "SwiftUI", "AWS", "PostgreSQL", "Terraform", "Firebase"];

export default function Footer({ data }) {
  return (
    <footer className={css.footer}>
      <Marquee items={items} speed={64} variant="solid" className={css.marquee} />
      <div className={`container ${css.bottom}`}>
        <p>
          © {new Date().getFullYear()} {data.name}
        </p>
        <p className={css.mid}>Designed &amp; built with React, Flutter energy.</p>
        <a href="#top" className={css.toTop}>
          Back to top <Icon name="arrowUp" size={13} />
        </a>
      </div>
    </footer>
  );
}
