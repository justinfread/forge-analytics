export function formatCompactCurrency(value) {
  if (typeof value !== "number") {
    return "Unavailable";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPercentage(value) {
  if (typeof value !== "number") {
    return "Unavailable";
  }

  return `${value.toFixed(2)}%`;
}

export function formatNumber(value) {
  if (typeof value !== "number") {
    return "Unavailable";
  }

  return new Intl.NumberFormat("en-US").format(value);
}

export function formatCurrency(value, maximumFractionDigits = 2) {
  if (typeof value !== "number") {
    return "Unavailable";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits,
  }).format(value);
}

export function formatCompactNumber(value) {
  if (typeof value !== "number") {
    return "Unavailable";
  }

  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);
}

// Converts a value in satoshis to bitcoin
export function formatBitcoin(value) {
  if (typeof value !== "number") {
    return "Unavailable";
  }

  return `${new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(value)} BTC`;
}

// Formatters for social pay transactions
export function formatAssetAmount(value, assetCode) {
  if (typeof value !== "number") {
    return "Unavailable";
  }

  const formattedValue = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 7,
  }).format(value);

  return `${formattedValue} ${assetCode}`;
}

export function formatDateTime(value) {
  if (!value) {
    return "Unavailable";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Unavailable";
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}