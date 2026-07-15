const BASE_URL = "https://api.coingecko.com/api/v3";

const STABLECOIN_IDS = [
  "tether",
  "usd-coin",
  "dai",
  "paypal-usd",
  "ripple-usd",
];

export async function getStablecoinMarketData() {
  const params = new URLSearchParams({
    vs_currency: "usd",
    ids: STABLECOIN_IDS.join(","),
    order: "market_cap_desc",
    sparkline: "false",
    price_change_percentage: "24h",
  });

  const response = await fetch(`${BASE_URL}/coins/markets?${params}`);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch stablecoin market data: ${response.status}`
    );
  }

  return response.json();
}