import { useEffect, useState } from "react";
import Card from "../../components/ui/Card/Card";
import Badge from "../../components/ui/Badge/Badge";
import { getCryptoPrices } from "../../services/cryptoPriceService";
import styles from "./MarketSnapshot.module.css";

function MarketSnapshot() {
  const [prices, setPrices] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    async function loadPrices() {
      try {
        const data = await getCryptoPrices();
        setPrices(data);
        setStatus("success");
      } catch (error) {
        console.error(error);
        setStatus("error");
      }
    }

    loadPrices();
  }, []);

  if (status === "loading") {
    return <Card>Loading market snapshot...</Card>;
  }

  if (status === "error") {
    return <Card>Could not load market data.</Card>;
  }

  return (
    <Card>
      <div className={styles.header}>
        <h3>Market Snapshot</h3>
        <Badge tone="success">Live Data</Badge>
      </div>

      <div className={styles.grid}>
        {Object.entries(prices).map(([coinId, data]) => (
          <div key={coinId} className={styles.asset}>
            <p className={styles.name}>{coinId}</p>
            <h4>${data.usd.toLocaleString()}</h4>
            <p className={data.usd_24h_change >= 0 ? styles.positive : styles.negative}>
              {data.usd_24h_change?.toFixed(2)}%
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default MarketSnapshot;