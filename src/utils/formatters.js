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