import { Payment } from "../../domain/payment";
import { db } from "../libs/pg";

export async function savePayment(payment: Payment) {
  const result = await db.query(
    `INSERT INTO payments (correlation_id, amount, processor, status, requested_at) VALUES ($1, $2, $3, $4, $5)`,
    [
      payment.correlationId,
      payment.amount,
      payment.processor,
      payment.status,
      payment.requestedAt,
    ]
  );

  return result.rows[0];
}
