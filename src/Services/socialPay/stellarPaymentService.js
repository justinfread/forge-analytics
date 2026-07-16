const STELLAR_HORIZON_URL = "https://horizon.stellar.org";

function isSupportedPaymentRecord(paymentRecord) {
  const supportedTypes = [
    "payment",
    "path_payment_strict_receive",
    "path_payment_strict_send",
  ];

  return supportedTypes.includes(paymentRecord.type);
}

function getAssetCode(paymentRecord) {
  if (paymentRecord.asset_type === "native") {
    return "XLM";
  }

  return paymentRecord.asset_code ?? "Unknown";
}

function normalizePaymentRecord(paymentRecord) {
  return {
    id: paymentRecord.id,
    transactionHash: paymentRecord.transaction_hash,
    createdAt: paymentRecord.created_at,
    sender: paymentRecord.from,
    recipient: paymentRecord.to,
    amount: Number(paymentRecord.amount),
    assetCode: getAssetCode(paymentRecord),
    assetType: paymentRecord.asset_type,
  };
}

export async function getRecentStellarPayments(limit = 8) {
  const queryParameters = new URLSearchParams({
    order: "desc",
    limit: String(limit),
  });

  const response = await fetch(
    `${STELLAR_HORIZON_URL}/payments?${queryParameters}`
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch Stellar payments: ${response.status}`
    );
  }

  const responseData = await response.json();

  const paymentRecords =
    responseData._embedded?.records ?? [];

  return paymentRecords
    .filter(isSupportedPaymentRecord)
    .map(normalizePaymentRecord);
}