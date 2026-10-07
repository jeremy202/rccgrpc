/**
 * Events are edited in the CMS (/admin → Events). Each event is one JSON file
 * in /content/events — the file name is the event's web address
 * (/events/<file-name>).
 */

export interface ChurchEvent {
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  location: string;
  /** Google Maps / Zoom / any link for the location (optional) */
  locationUrl?: string;
  /** Calgary local time "YYYY-MM-DDTHH:MM" */
  start: string;
  end: string;
  repeat?: "weekly";
  until?: string;
}

interface EventFile {
  title?: string;
  subtitle?: string;
  description?: string;
  image?: string;
  location?: string;
  location_url?: string;
  date?: string;
  start_time?: string;
  end_time?: string;
  repeat?: string;
  until?: string;
  hidden?: boolean;
}

export const CHURCH_TIMEZONE = "America/Edmonton";

const files = import.meta.glob<EventFile>("../content/events/*.json", {
  eager: true,
  import: "default",
});

const pad = (n: number) => String(n).padStart(2, "0");

/** Accepts "HH:mm", "H:mm", "h:mm AM" or an ISO date-time and returns "HH:MM". */
const normTime = (t: string | undefined, fallback: string) => {
  if (!t) return fallback;
  const iso = t.match(/T(\d{2}):(\d{2})/);
  if (iso) return `${iso[1]}:${iso[2]}`;
  const m = t.trim().match(/^(\d{1,2}):(\d{2})\s*([AaPp][Mm])?$/);
  if (!m) return fallback;
  let h = Number(m[1]);
  const ap = m[3]?.toUpperCase();
  if (ap === "PM" && h < 12) h += 12;
  if (ap === "AM" && h === 12) h = 0;
  return `${pad(h)}:${m[2]}`;
};

const normDate = (d: string | undefined) => (d || "").slice(0, 10);

const addOneDay = (ymd: string) => {
  const [y, m, d] = ymd.split("-").map(Number);
  const dt = new Date(Date.UTC(y!, m! - 1, d! + 1));
  return `${dt.getUTCFullYear()}-${pad(dt.getUTCMonth() + 1)}-${pad(dt.getUTCDate())}`;
};

export const events: ChurchEvent[] = Object.entries(files)
  .map(([path, f]): ChurchEvent | null => {
    const slug = path.split("/").pop()!.replace(/\.json$/, "");
    const date = normDate(f.date);
    if (!f.title || !/^\d{4}-\d{2}-\d{2}$/.test(date) || f.hidden) return null;
    const startTime = normTime(f.start_time, "10:00");
    const endTime = normTime(f.end_time, startTime);
    // An end time earlier than the start means the event finishes after midnight
    const endDate = endTime < startTime ? addOneDay(date) : date;
    return {
      slug,
      title: f.title,
      subtitle: f.subtitle || "",
      description: f.description || "",
      image: f.image || "/images/img-worship-min.jpg",
      location: f.location || "",
      locationUrl: f.location_url || "",
      start: `${date}T${startTime}`,
      end: `${endDate}T${endTime}`,
      repeat: f.repeat === "weekly" ? "weekly" : undefined,
      until: normDate(f.until) || undefined,
    };
  })
  .filter((e): e is ChurchEvent => e !== null)
  .sort((a, b) => a.start.localeCompare(b.start));
