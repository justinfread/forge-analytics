import styles from "./Section.module.css";

function Section({ title, subtitle, children, action }) {
  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <div>
          <h3>{title}</h3>
          {subtitle && <p>{subtitle}</p>}
        </div>

        {action && <div>{action}</div>}
      </header>

      <div className={styles.content}>
        {children}
      </div>
    </section>
  );
}

export default Section;