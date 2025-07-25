export function createPaymentSummaryQueryDto(from?: string, to?: string) {
  return {
    from: from ? new Date(from).toISOString() : undefined,
    to: to ? new Date(to).toISOString() : undefined,
  };
}
