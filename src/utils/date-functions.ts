export function isValidDate(date: string | undefined) {
  return !!date && !isNaN(Date.parse(date));
}
