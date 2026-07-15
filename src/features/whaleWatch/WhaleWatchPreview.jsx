import { useEffect, useState } from "react";
import Card from "../../components/ui/Card/Card";
import Badge from "../../components/ui/Badge/Badge";
import { getLatestLargeBitcoinTransactions } from "../../services/whales/bitcoinWhaleService";
import {
  formatBitcoin,
  formatNumber,
} from "../../utils/formatters";
import styles from "./WhaleWatchPreview.module.css";

function shortenTransactionId(transactionId) {
  const beginning = transactionId.slice(0, 8);
  const ending = transactionId.slice(-8);

  return `${beginning}...${ending}`;
}

function WhaleWatchPreview() {
  const [whaleData, setWhaleData] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    async function loadWhaleData() {
      try {
        const data = await getLatestLargeBitcoinTransactions();

        setWhaleData(data);
        setStatus("success");
      } catch (error) {
        console.error(
          "Unable to load Bitcoin whale transactions:",
          error
        );

        setStatus("error");
      }
    }

    loadWhaleData();
  }, []);

  if (status === "loading") {
    return <Card>Loading large Bitcoin transactions...</Card>;
  }

  if (status === "error") {
    return (
      <Card>
        <p className={styles.error}>
          Bitcoin transaction data is currently unavailable.
        </p>
      </Card>
    );
  }

  return (
    <Card>
      <div className={styles.blockHeader}>
        <p>
          Latest block:
          <span>
            {" "}
            #{formatNumber(whaleData.blockHeight)}
          </span>
        </p>

        <Badge tone="success">On-Chain Data</Badge>
      </div>

      <div className={styles.transactionList}>
        {whaleData.transactions.map((transaction) => {
          const transactionUrl =
            `https://mempool.space/tx/${transaction.transactionId}`;

          return (
            <article
              key={transaction.transactionId}
              className={styles.transaction}
            >
              <div>
                <p className={styles.label}>
                  Transaction
                </p>

                <a
                  className={styles.transactionLink}
                  href={transactionUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {shortenTransactionId(
                    transaction.transactionId
                  )}
                </a>
              </div>

              <div>
                <p className={styles.label}>
                  Total outputs
                </p>

                <p className={styles.amount}>
                  {formatBitcoin(
                    transaction.bitcoinAmount
                  )}
                </p>
              </div>

              <div>
                <p className={styles.label}>
                  Network fee
                </p>

                <p>
                  {formatNumber(
                    transaction.feeSatoshis
                  )}{" "}
                  sats
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </Card>
  );
}

export default WhaleWatchPreview;