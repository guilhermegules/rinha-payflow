import { isValidDate } from "../../utils/date-functions";

export const paymentSummaryQueryValidator = {
  isInvalid(from: string | undefined, to: string | undefined) {
    return (from && !isValidDate(from)) || (to && !isValidDate(to));
  },
};
