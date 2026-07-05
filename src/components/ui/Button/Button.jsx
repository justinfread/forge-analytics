// src/components/ui/Button/Button.jsx
import styles from "./Button.module.css";

function Button({ children, variant = "primary", type = "button", onClick }) {
  return (
    <button className={`${styles.button} ${styles[variant]}`} type={type} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;