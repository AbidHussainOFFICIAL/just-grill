export interface OpeningHours {
  /** IANA time zone of the restaurant, for example "Europe/London" */
  timeZone: string;
  /** 24-hour "HH:MM" */
  open: string;
  close: string;
}

export interface OpenStatusResult {
  isOpen: boolean;
  label: string;
}

const toMinutes = (time: string) => {
  const [hours = 0, minutes = 0] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

/** "22:00" becomes "10:00 pm". */
export function formatTime(time: string) {
  const [hours = 0, minutes = 0] = time.split(":").map(Number);
  const suffix = hours >= 12 ? "pm" : "am";
  return `${hours % 12 || 12}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

/** Whether the restaurant is open at `now`, judged in the restaurant's own time zone. */
export function getOpenStatus(hours: OpeningHours, now: Date = new Date()): OpenStatusResult {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: hours.timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);

  const read = (type: string) => Number(parts.find((part) => part.type === type)?.value ?? 0);
  const current = read("hour") * 60 + read("minute");
  const open = toMinutes(hours.open);
  const close = toMinutes(hours.close);

  // A closing time earlier than the opening time means "after midnight".
  const isOpen =
    open <= close ? current >= open && current < close : current >= open || current < close;

  return isOpen
    ? { isOpen, label: `Open now · until ${formatTime(hours.close)}` }
    : { isOpen, label: `Closed · opens ${formatTime(hours.open)}` };
}
