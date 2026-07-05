import PageHeader from "../components/ui/PageHeader/PageHeader";
import StatCard from "../components/ui/StatCard/StatCard";
import Button from "../components/ui/Button/Button";
import Badge from "../components/ui/Badge/Badge";
import styles from "./Dashboard.module.css";

function Dashboard() {
  return (
    <section>
      <PageHeader
        title="Dashboard"
        subtitle="Monitor Web3 payment adoption, whale activity, and stablecoin movement."
      />

      <div className={styles.statsGrid}>
        <StatCard label="Whale Transactions" value="134" change="+12 today" tone="success" />
        <StatCard label="Stablecoin Volume" value="$246B" change="+4.8%" tone="success" />
        <StatCard label="Payment Projects" value="18" change="Watching" />
        <StatCard label="Risk Alerts" value="3" change="Review" tone="warning" />
      </div>

      <div className={styles.actions}>
        <Button>Refresh Data</Button>
        <Button variant="secondary">View Watchlist</Button>
        <Badge tone="success">System Online</Badge>
      </div>
    </section>
  );
}

export default Dashboard;