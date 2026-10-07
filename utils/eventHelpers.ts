import {
  events,
  CHURCH_TIMEZONE,
  type ChurchEvent,
} from "~/data/events";

export interface EventOccurrence {
  event: ChurchEvent;
  /** YYYY-MM-DD (Calgary local date) */
  date: string;
  /** YYYY-MM-DDTHH:MM local */
  start: string;
  end: string;
}

const pad = (n: number) => String(n).padStart(2, "0");

/* ---------- plain local date helpers (no timezone involved) ---------- */

const toUTCDate = (ymd: string) => {
  const [y, m, d] = ymd.split("-").map(Number);
  return new Date(Date.UTC(y!, m! - 1, d!));
};
const fromUTCDate = (d: Date) =>
  `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
export const addDays = (ymd: string, days: number) => {
  const d = toUTCDate(ymd);
  d.setUTCDate(d.getUTCDate() + days);
  return fromUTCDate(d);
};
const daysBetween = (a: string, b: string) =>
  Math.round((toUTCDate(b).getTime() - toUTCDate(a).getTime()) / 86400000);

/** Today's date in Calgary as YYYY-MM-DD */
export const todayInCalgary = () => {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: CHURCH_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  return parts; // en-CA formats as YYYY-MM-DD
};

export const monthStart = (ym: string) => `${ym}-01`;
export const monthEnd = (ym: string) => {
  const [y, m] = ym.split("-").map(Number);
  return fromUTCDate(new Date(Date.UTC(y!, m!, 0)));
};
export const shiftMonth = (ym: string, delta: number) => {
  const [y, m] = ym.split("-").map(Number);
  const d = new Date(Date.UTC(y!, m! - 1 + delta, 1));
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}`;
};

/* ---------- occurrences ---------- */

export const occurrencesBetween = (
  from: string,
  to: string,
  list: ChurchEvent[] = events
): EventOccurrence[] => {
  const out: EventOccurrence[] = [];
  for (const ev of list) {
    const firstDate = ev.start.slice(0, 10);
    const startTime = ev.start.slice(11);
    const endTime = ev.end.slice(11);
    const spanDays = daysBetween(firstDate, ev.end.slice(0, 10));
    const make = (date: string): EventOccurrence => ({
      event: ev,
      date,
      start: `${date}T${startTime}`,
      end: `${addDays(date, spanDays)}T${endTime}`,
    });

    if (ev.repeat === "weekly") {
      let date = firstDate;
      if (date < from) {
        const weeks = Math.ceil(daysBetween(date, from) / 7);
        date = addDays(date, weeks * 7);
      }
      while (date <= to && (!ev.until || date <= ev.until)) {
        out.push(make(date));
        date = addDays(date, 7);
      }
    } else if (firstDate >= from && firstDate <= to) {
      out.push(make(firstDate));
    }
  }
  return out.sort((a, b) => a.start.localeCompare(b.start));
};

export const findEvent = (slug: string) => events.find((e) => e.slug === slug);

/** The occurrence on `date`, or the next one on/after today. */
export const occurrenceFor = (
  ev: ChurchEvent,
  date?: string
): EventOccurrence | null => {
  if (date) {
    const hit = occurrencesBetween(date, date, [ev]);
    if (hit.length) return hit[0]!;
  }
  const today = todayInCalgary();
  const next = occurrencesBetween(today, addDays(today, 400), [ev]);
  if (next.length) return next[0]!;
  // a past one-off event
  return occurrencesBetween("1900-01-01", "2999-12-31", [ev])[0] ?? null;
};

/* ---------- formatting ---------- */

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const DAYS_LONG = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

const ordinal = (n: number) => {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0])!;
};

export const formatMonthShort = (ymd: string) =>
  MONTHS[Number(ymd.slice(5, 7)) - 1]!.toUpperCase();
export const formatDayOrdinal = (ymd: string) => ordinal(Number(ymd.slice(8, 10)));
export const formatMonthYear = (ym: string) =>
  `${MONTHS[Number(ym.slice(5, 7)) - 1]!.toUpperCase()} ${ym.slice(0, 4)}`;

export const formatFullDate = (ymd: string) => {
  const d = toUTCDate(ymd);
  return `${DAYS[d.getUTCDay()]}, ${MONTHS[d.getUTCMonth()]} ${ordinal(
    d.getUTCDate()
  )} ${d.getUTCFullYear()}`;
};

export const formatLongDate = (ymd: string) => {
  const d = toUTCDate(ymd);
  return `${DAYS_LONG[d.getUTCDay()]}, ${
    ["January","February","March","April","May","June","July","August","September","October","November","December"][d.getUTCMonth()]
  } ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
};

export const formatTime = (local: string) => {
  let h = Number(local.slice(11, 13));
  const m = local.slice(14, 16);
  const ap = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${m}${ap}`;
};

export const formatTimeRange = (o: { start: string; end: string }) =>
  `${formatTime(o.start)} - ${formatTime(o.end)}`;

export const repeatLabel = (ev: ChurchEvent) =>
  ev.repeat === "weekly"
    ? `Every ${DAYS_LONG[toUTCDate(ev.start.slice(0, 10)).getUTCDay()]}`
    : "";

/* ---------- calendar links / ICS ---------- */

/** Convert Calgary wall-clock time to a UTC Date */
const localToUtc = (local: string) => {
  const [d, t] = local.split("T");
  const [y, mo, da] = d!.split("-").map(Number);
  const [h, mi] = t!.split(":").map(Number);
  const guess = Date.UTC(y!, mo! - 1, da!, h!, mi!);
  const offsetAt = (ms: number) => {
    const p = new Intl.DateTimeFormat("en-US", {
      timeZone: CHURCH_TIMEZONE,
      hourCycle: "h23",
      year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", second: "2-digit",
    }).formatToParts(new Date(ms));
    const g = (k: string) => Number(p.find((x) => x.type === k)!.value);
    return Date.UTC(g("year"), g("month") - 1, g("day"), g("hour"), g("minute"), g("second")) - ms;
  };
  let ms = guess - offsetAt(guess);
  ms = guess - offsetAt(ms);
  return new Date(ms);
};

const utcStamp = (d: Date) =>
  d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
const localStamp = (local: string) => local.replace(/[-:]/g, "") + "00";

const eventUrl = (o: EventOccurrence, origin: string) =>
  `${origin}/events/${o.event.slug}`;

const detailsText = (o: EventOccurrence, origin: string) =>
  `${o.event.description}\n\nMore info: ${eventUrl(o, origin)}`;

export const googleCalendarUrl = (o: EventOccurrence, origin: string) => {
  const p = new URLSearchParams({
    action: "TEMPLATE",
    text: o.event.title,
    dates: `${localStamp(o.start)}/${localStamp(o.end)}`,
    ctz: CHURCH_TIMEZONE,
    details: detailsText(o, origin),
    location: o.event.location,
  });
  if (o.event.repeat === "weekly") p.set("recur", "RRULE:FREQ=WEEKLY");
  return `https://calendar.google.com/calendar/render?${p.toString()}`;
};

export const outlookCalendarUrl = (o: EventOccurrence, origin: string) => {
  const p = new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    subject: o.event.title,
    startdt: localToUtc(o.start).toISOString(),
    enddt: localToUtc(o.end).toISOString(),
    body: detailsText(o, origin),
    location: o.event.location,
  });
  return `https://outlook.live.com/calendar/0/deeplink/compose?${p.toString()}`;
};

export const yahooCalendarUrl = (o: EventOccurrence, origin: string) => {
  const p = new URLSearchParams({
    v: "60",
    title: o.event.title,
    st: utcStamp(localToUtc(o.start)),
    et: utcStamp(localToUtc(o.end)),
    desc: detailsText(o, origin),
    in_loc: o.event.location,
  });
  if (o.event.repeat === "weekly") p.set("RPAT", "01Wk");
  return `https://calendar.yahoo.com/?${p.toString()}`;
};

const icsEscape = (s: string) =>
  s.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");

const icsFold = (line: string) => {
  const out: string[] = [];
  while (line.length > 74) {
    out.push(line.slice(0, 74));
    line = " " + line.slice(74);
  }
  out.push(line);
  return out.join("\r\n");
};

const vevent = (o: EventOccurrence, origin: string) => {
  const lines = [
    "BEGIN:VEVENT",
    `UID:${o.event.slug}-${o.event.repeat ? "series" : o.date}@rccgrpc.ca`,
    `DTSTAMP:${utcStamp(new Date())}`,
    `DTSTART:${utcStamp(localToUtc(o.start))}`,
    `DTEND:${utcStamp(localToUtc(o.end))}`,
    `SUMMARY:${icsEscape(o.event.title)}`,
    `DESCRIPTION:${icsEscape(detailsText(o, origin))}`,
    `LOCATION:${icsEscape(o.event.location)}`,
    `URL:${eventUrl(o, origin)}`,
  ];
  if (o.event.repeat === "weekly") {
    lines.push(
      o.event.until
        ? `RRULE:FREQ=WEEKLY;UNTIL=${o.event.until.replace(/-/g, "")}T235959Z`
        : "RRULE:FREQ=WEEKLY"
    );
  }
  lines.push("END:VEVENT");
  return lines.map(icsFold).join("\r\n");
};

export const buildIcs = (occurrences: EventOccurrence[], origin: string) =>
  [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//RCCG Restoration Power Center//Events//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:RCCG RPC Calgary Events",
    ...occurrences.map((o) => vevent(o, origin)),
    "END:VCALENDAR",
  ].join("\r\n");

export const downloadIcs = (
  occurrences: EventOccurrence[],
  origin: string,
  filename: string
) => {
  const blob = new Blob([buildIcs(occurrences, origin)], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename.endsWith(".ics") ? filename : `${filename}.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};
