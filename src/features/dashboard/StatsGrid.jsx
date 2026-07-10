import StatCard from "../../components/ui/StatCard/StatCard";
import styles from "./StatsGrid.module.css";

function StatsGrid() {
  return (
    <div className={styles.statsGrid}>
      <StatCard
        label="Whale Transactions"
        value="134"
        change="+12 Today"
        tone="success"
      />

      <StatCard
        label="Stablecoin Volume"
        value="$246B"
        change="+4.8%"
        tone="success"
      />

      <StatCard
        label="Payment Projects"
        value="18"
        change="Watching"
        tone="neutral"
      />

      <StatCard
        label="Risk Alerts"
        value="3"
        change="Review"
        tone="warning"
      />
    </div>
  );
}

export default StatsGrid;