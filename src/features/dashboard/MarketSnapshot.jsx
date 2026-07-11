// src/features/dashboard/MarketSnapshot.jsx
import { useEffect, useState } from "react";
import Card from "../../components/ui/Card/Card";
import Badge from "../../components/ui/Badge/Badge";
import { getCryptoPrices } from "../../Services/market/cryptoPriceService";
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
        console.error("Unable to load market prices:", error);
        setStatus("error");
      }
    }

    loadPrices();
  }, []);

  if (status === "loading") {
    return <Card>Loading market snapshot...</Card>;
  }

  if (status === "error") {
    return (
      <Card>
        <p className={styles.error}>Could not load market data.</p>
      </Card>
    );
  }

  return (
    <Card>
      <div className={styles.grid}>
        {Object.entries(prices).map(([coinId, data]) => {
          const change = data.usd_24h_change;
          const hasChange = typeof change === "number";
          const isPositive = hasChange && change >= 0;

          return (
            <article key={coinId} className={styles.asset}>
              <div className={styles.assetHeader}>
                <p className={styles.name}>{coinId}</p>

                {hasChange && (
                  <Badge tone={isPositive ? "success" : "danger"}>
                    {isPositive ? "+" : ""}
                    {change.toFixed(2)}%
                  </Badge>
                )}
              </div>

              <h4 className={styles.price}>
                ${data.usd.toLocaleString(undefined, {
                  maximumFractionDigits: data.usd < 1 ? 4 : 2,
                })}
              </h4>

              <p className={styles.volume}>
                24h volume: $
                {data.usd_24h_vol?.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                }) ?? "Unavailable"}
              </p>
            </article>
          );
        })}
      </div>
    </Card>
  );
}

export default MarketSnapshot;