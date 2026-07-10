import PageHeader from "../components/ui/PageHeader/PageHeader";
import StatsGrid from "../features/dashboard/StatsGrid";
import MarketSnapshot from "../features/dashboard/MarketSnapshot";
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

      <StatsGrid />

      <div className={styles.marketSection}>
        <MarketSnapshot />
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