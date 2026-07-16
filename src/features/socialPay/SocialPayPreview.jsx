import { useEffect, useState } from "react";
import Card from "../../components/ui/Card/Card";
import Badge from "../../components/ui/Badge/Badge";
import { getRecentStellarPayments } from "../../services/socialPay/stellarPaymentService";
import {
  formatAssetAmount,
  formatDateTime,
} from "../../utils/formatters";
import styles from "./SocialPayPreview.module.css";

function shortenAccountAddress(accountAddress) {
  if (!accountAddress) {
    return "Unknown";
  }

  const beginning = accountAddress.slice(0, 6);
  const ending = accountAddress.slice(-6);

  return `${beginning}...${ending}`;
}

function SocialPayPreview() {
  const [payments, setPayments] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    async function loadPayments() {
      try {
        const paymentData =
          await getRecentStellarPayments();

        setPayments(paymentData);
        setStatus("success");
      } catch (error) {
        console.error(
          "Unable to load recent Stellar payments:",
          error
        );

        setStatus("error");
      }
    }

    loadPayments();
  }, []);

  if (status === "loading") {
    return <Card>Loading Stellar payments...</Card>;
  }

  if (status === "error") {
    return (
      <Card>
        <p className={styles.error}>
          Stellar payment data is currently unavailable.
        </p>
      </Card>
    );
  }

  if (payments.length === 0) {
    return (
      <Card>
        <p className={styles.empty}>
          No supported Stellar payments were returned.
        </p>
      </Card>
    );
  }

  return (
    <Card>
      <div className={styles.header}>
        <p>
          Recent successful payment operations
        </p>

        <Badge tone="success">
          Stellar Mainnet
        </Badge>
      </div>

      <div className={styles.paymentList}>
        {payments.map((payment) => {
          const transactionUrl =
            `https://stellar.expert/explorer/public/tx/${payment.transactionHash}`;

          return (
            <article
              key={payment.id}
              className={styles.payment}
            >
              <div className={styles.asset}>
                <span className={styles.assetCode}>
                  {payment.assetCode}
                </span>

                <div>
                  <p className={styles.label}>
                    Amount
                  </p>

                  <p className={styles.amount}>
                    {formatAssetAmount(
                      payment.amount,
                      payment.assetCode
                    )}
                  </p>
                </div>
              </div>

              <div>
                <p className={styles.label}>
                  From
                </p>

                <p className={styles.address}>
                  {shortenAccountAddress(
                    payment.sender
                  )}
                </p>
              </div>

              <div>
                <p className={styles.label}>
                  To
                </p>

                <p className={styles.address}>
                  {shortenAccountAddress(
                    payment.recipient
                  )}
                </p>
              </div>

              <div>
                <p className={styles.label}>
                  Time
                </p>

                <p>
                  {formatDateTime(
                    payment.createdAt
                  )}
                </p>
              </div>

              <a
                className={styles.transactionLink}
                href={transactionUrl}
                target="_blank"
                rel="noreferrer"
              >
                View transaction
              </a>
            </article>
          );
        })}
      </div>
    </Card>
  );
}

export default SocialPayPreview;