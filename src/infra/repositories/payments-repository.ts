import { Payment } from "../../domain/payment";
import { db } from "../libs/pg";
import { paymentEntityFactory } from "../../domain/payment-entity-factory";

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

export async function findPaymentSummary(from?: string, to?: string) {
  const conditions = [`status = 'success'`];
  const filters: string[] = [];

  if (from) {
    filters.push(from);
    conditions.push(`requested_at >= $${filters.length}`);
  }

  if (to) {
    filters.push(to);
    conditions.push(`requested_at < $${filters.length}`);
  }

  const whereClause = conditions.length
    ? `WHERE ${conditions.join(" AND ")}`
    : "";

  const query = `SELECT processor, COUNT(*) as totalRequests, SUM(amount) as totalAmount 
    FROM payments 
    ${whereClause}
    GROUP BY processor`;

  const response = await db.query(query, filters);

  return response.rows.map(paymentEntityFactory);
}
