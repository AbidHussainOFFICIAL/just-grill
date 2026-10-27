/** YYYY-MM-DD for the given moment in the visitor's local time zone. */
export function localDateISO(now: Date = new Date()): string {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** YYYY-MM-DD for yesterday in UTC (used for the lenient server-side check). */
export function yesterdayUTC(now: number = Date.now()): string {
  return new Date(now - 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
}
