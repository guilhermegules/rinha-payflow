import { isUuid } from "../../utils/uuid-functions";
import { ProcessablePaymentBodyDTO } from "../processable-payment-body-dto";

export function processablePaymentBodyValidator(
  body: ProcessablePaymentBodyDTO
) {
  if (Number.isNaN(body.amount)) return false;

  if (!isUuid(body.correlationId)) return false;

  return true;
}
