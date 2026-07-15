// src/pages/Dashboard.jsx
import PageHeader from "../components/ui/PageHeader/PageHeader";
import Section from "../components/ui/Section/Section";
import Button from "../components/ui/Button/Button";
import Badge from "../components/ui/Badge/Badge";
import StatsGrid from "../features/dashboard/StatsGrid";
import MarketSnapshot from "../features/dashboard/MarketSnapshot";
import StablecoinMonitor from "../features/stablecoins/StablecoinMonitor";
import WhaleWatchPreview from "../features/whaleWatch/WhaleWatchPreview";
import styles from "./Dashboard.module.css";

function Dashboard() {
  return (
    <section>
      <PageHeader
        title="Dashboard"
        subtitle="Monitor Web3 payment adoption, whale activity, and stablecoin movement."
      />

      <StatsGrid />

      <Section
        title="Market Snapshot"
        subtitle="Current prices, 24-hour movement, and trading volume."
        action={<Badge tone="success">Live Data</Badge>}
      >
        <MarketSnapshot />
      </Section>

      <Section
        title="Stablecoin Monitor"
        subtitle="Track market scale, trading activity, and dollar-peg stability."
        action={<Button variant="secondary">View Stablecoins</Button>}
      >
        <StablecoinMonitor />
      </Section>

      <Section
        title="Whale Watch"
        subtitle="Largest Bitcoin transactions found in the latest confirmed block."
        action={
          <Button variant="secondary">
            View Whale Watch
          </Button>
        }
      >
        <WhaleWatchPreview />
      </Section>

      <div className={styles.actions}>
        <Button>Refresh Data</Button>
        <Button variant="secondary">View Watchlist</Button>
        <Badge tone="success">System Online</Badge>
      </div>

    </section>
  );
}

export default Dashboard;