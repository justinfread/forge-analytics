const BASE_URL = "https://api.coingecko.com/api/v3";

export async function getCryptoPrices() {
  const coinIds = [
    "bitcoin",
    "ethereum",
    "solana",
    "tether",
    "usd-coin",
  ].join(",");

  const url = `${BASE_URL}/simple/price?ids=${coinIds}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch crypto prices");
  }

  return response.json();
}