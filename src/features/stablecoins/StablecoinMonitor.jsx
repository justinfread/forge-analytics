import { useEffect, useState } from "react";
import Card from "../../components/ui/Card/Card";
import Badge from "../../components/ui/Badge/Badge";
import { getStablecoinMarketData } from "../../services/stablecoins/stablecoinService";
import {
  formatCompactCurrency,
  formatCurrency,
} from "../../utils/formatters";
import styles from "./StablecoinMonitor.module.css";

function getPegStatus(price) {
  if (typeof price !== "number") {
    return {
      label: "Unknown",
      tone: "neutral",
    };
  }

  const deviation = Math.abs(price - 1);

  if (deviation <= 0.0025) {
    return {
      label: "On Peg",
      tone: "success",
    };
  }

  if (deviation <= 0.01) {
    return {
      label: "Watch",
      tone: "warning",
    };
  }

  return {
    label: "Depegged",
    tone: "danger",
  };
}

function StablecoinMonitor() {
  const [stablecoins, setStablecoins] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    async function loadStablecoins() {
      try {
        const data = await getStablecoinMarketData();

        setStablecoins(data);
        setStatus("success");
      } catch (error) {
        console.error("Unable to load stablecoin data:", error);
        setStatus("error");
      }
    }

    loadStablecoins();
  }, []);

  if (status === "loading") {
    return <Card>Loading stablecoin data...</Card>;
  }

  if (status === "error") {
    return (
      <Card>
        <p className={styles.error}>
          Stablecoin market data is currently unavailable.
        </p>
      </Card>
    );
  }

  return (
    <Card>
      <div className={styles.tableHeader}>
        <span>Asset</span>
        <span>Price</span>
        <span>Market Cap</span>
        <span>24h Volume</span>
        <span>Status</span>
      </div>

      <div className={styles.list}>
        {stablecoins.map((coin) => {
          const pegStatus = getPegStatus(coin.current_price);

          return (
            <article key={coin.id} className={styles.row}>
              <div className={styles.asset}>
                <img
                  className={styles.logo}
                  src={coin.image}
                  alt=""
                  aria-hidden="true"
                />

                <div>
                  <h4>{coin.symbol.toUpperCase()}</h4>
                  <p>{coin.name}</p>
                </div>
              </div>

              <p className={styles.price}>
                {formatCurrency(coin.current_price, 4)}
              </p>

              <p>{formatCompactCurrency(coin.market_cap)}</p>

              <p>{formatCompactCurrency(coin.total_volume)}</p>

              <Badge tone={pegStatus.tone}>{pegStatus.label}</Badge>
            </article>
          );
        })}
      </div>
    </Card>
  );
}

export default StablecoinMonitor;