import { Payment } from "../../domain/payment";
import { db } from "../libs/pg";

export async function savePayment(payment: Payment) {
  const result = await db.query(
    `INSERT INTO payments (correlation_id, amount, processor, status, requested_at) 
    VALUES ($1, $2, $3, $4, $5)`,
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

export async function findPaymentSummary(from: string, to: string) {
  const response = await db.query(
    `SELECT processor, COUNT(*) as totalRequests, SUM(amount) as totalAmount 
    FROM payments 
    WHERE requested_at >= $1 AND requested_at < $2 AND status = 'success'
    GROUP BY processor`,
    [from, to]
  );

  return response.rows;
}
