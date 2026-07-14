const GLOBAL_MARKET_URL = "https://api.coingecko.com/api/v3/global";

export async function getGlobalMarketData() {
  const response = await fetch(GLOBAL_MARKET_URL);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch global market data: ${response.status}`
    );
  }

  const responseData = await response.json();

  return responseData.data;
}