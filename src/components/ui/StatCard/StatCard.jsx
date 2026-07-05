// src/components/ui/StatCard/StatCard.jsx
import Card from "../Card/Card";
import Badge from "../Badge/Badge";
import styles from "./StatCard.module.css";

function StatCard({ label, value, change, tone = "neutral" }) {
  return (
    <Card>
      <div className={styles.statCard}>
        <p className={styles.label}>{label}</p>
        <h3 className={styles.value}>{value}</h3>
        {change && <Badge tone={tone}>{change}</Badge>}
      </div>
    </Card>
  );
}

export default StatCard;