import styles from "./PageHeader.module.css";

function PageHeader({ title, subtitle }) {
  return (
    <header className={styles.header}>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </header>
  );
}

export default PageHeader;