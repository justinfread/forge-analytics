const BASE_URL = "https://mempool.space/api";

const SATOSHIS_PER_BITCOIN = 100_000_000;

function convertSatoshisToBitcoin(satoshis) {
  return satoshis / SATOSHIS_PER_BITCOIN;
}

function calculateTransactionOutput(transaction) {
  const totalOutputSatoshis = transaction.vout.reduce(
    (runningTotal, output) => {
      return runningTotal + output.value;
    },
    0
  );

  return convertSatoshisToBitcoin(totalOutputSatoshis);
}

export async function getLatestLargeBitcoinTransactions(limit = 5) {
  const blockHeightResponse = await fetch(
    `${BASE_URL}/blocks/tip/height`
  );

  if (!blockHeightResponse.ok) {
    throw new Error(
      `Failed to fetch latest Bitcoin block height: ${blockHeightResponse.status}`
    );
  }

  const latestBlockHeight = await blockHeightResponse.text();

  const blockHashResponse = await fetch(
    `${BASE_URL}/block-height/${latestBlockHeight}`
  );

  if (!blockHashResponse.ok) {
    throw new Error(
      `Failed to fetch latest Bitcoin block hash: ${blockHashResponse.status}`
    );
  }

  const latestBlockHash = await blockHashResponse.text();

  const transactionsResponse = await fetch(
    `${BASE_URL}/block/${latestBlockHash}/txs`
  );

  if (!transactionsResponse.ok) {
    throw new Error(
      `Failed to fetch latest Bitcoin transactions: ${transactionsResponse.status}`
    );
  }

  const transactions = await transactionsResponse.json();

  const largeTransactions = transactions
    .map((transaction) => {
      return {
        transactionId: transaction.txid,
        bitcoinAmount: calculateTransactionOutput(transaction),
        feeSatoshis: transaction.fee,
        confirmed: transaction.status.confirmed,
      };
    })
    .sort((firstTransaction, secondTransaction) => {
      return (
        secondTransaction.bitcoinAmount -
        firstTransaction.bitcoinAmount
      );
    })
    .slice(0, limit);

  return {
    blockHeight: Number(latestBlockHeight),
    transactions: largeTransactions,
  };
}