// src/features/dashboard/StatsGrid.jsx
import { useEffect, useState } from "react";
import StatCard from "../../components/ui/StatCard/StatCard";
import { getGlobalMarketData } from "../../services/market/globalMarketService";
import {
  formatCompactCurrency,
  formatNumber,
  formatPercentage,
} from "../../utils/formatters";
import styles from "./StatsGrid.module.css";

function StatsGrid() {
  const [marketData, setMarketData] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    async function loadGlobalMarketData() {
      try {
        const data = await getGlobalMarketData();

        setMarketData(data);
        setStatus("success");
      } catch (error) {
        console.error("Unable to load global market data:", error);
        setStatus("error");
      }
    }

    loadGlobalMarketData();
  }, []);

  if (status === "loading") {
    return (
      <div className={styles.statsGrid}>
        <StatCard label="Total Market Cap" value="Loading..." />
        <StatCard label="24h Market Volume" value="Loading..." />
        <StatCard label="BTC Dominance" value="Loading..." />
        <StatCard label="Active Cryptocurrencies" value="Loading..." />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className={styles.statsGrid}>
        <StatCard
          label="Global Market Data"
          value="Unavailable"
          change="API Error"
          tone="danger"
        />
      </div>
    );
  }

  const marketCapChange =
    marketData.market_cap_change_percentage_24h_usd;

  const marketCapTone =
    marketCapChange >= 0 ? "success" : "danger";

  return (
    <div className={styles.statsGrid}>
      <StatCard
        label="Total Market Cap"
        value={formatCompactCurrency(
          marketData.total_market_cap.usd
        )}
        change={`${marketCapChange >= 0 ? "+" : ""}${formatPercentage(
          marketCapChange
        )}`}
        tone={marketCapTone}
      />

      <StatCard
        label="24h Market Volume"
        value={formatCompactCurrency(
          marketData.total_volume.usd
        )}
        change="Global"
        tone="neutral"
      />

      <StatCard
        label="BTC Dominance"
        value={formatPercentage(
          marketData.market_cap_percentage.btc
        )}
        change={`ETH ${formatPercentage(
          marketData.market_cap_percentage.eth
        )}`}
        tone="neutral"
      />

      <StatCard
        label="Active Cryptocurrencies"
        value={formatNumber(
          marketData.active_cryptocurrencies
        )}
        change={`${formatNumber(marketData.markets)} markets`}
        tone="neutral"
      />
    </div>
  );
}

export default StatsGrid;