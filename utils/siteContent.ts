/**
 * Content edited through the CMS (/admin). The JSON files live in /content.
 */
import settingsJson from "../content/settings.json";
import homeJson from "../content/home.json";
import pastorsJson from "../content/pastors.json";
import historyJson from "../content/history.json";
import galleriesJson from "../content/galleries.json";

export interface Gallery {
  title: string;
  subtitle: string;
  photos: string[];
}

export const settings = settingsJson as {
  theme_year: string;
  theme_title: string;
  address: string;
  country: string;
  maps_url?: string;
  phone: string;
  email: string;
  instagram?: string;
  youtube?: string;
  facebook?: string;
};

export const home = homeJson as {
  upcoming_label: string;
  upcoming_title: string;
  upcoming_subtitle: string;
  stats: { value: string; label: string }[];
  services: { time: string; ampm: string; name: string; when: string; where: string }[];
  welcome_message: string;
};

export const pastors = pastorsJson as {
  photo: string;
  first_names: string;
  surname: string;
  title_prefix: string;
  role: string;
  role_long: string;
  message: string;
  leadership: { name: string; role: string; photo?: string }[];
};

export const history = historyJson as {
  milestones: { date: string; title: string; desc: string }[];
};

export const galleries = galleriesJson as Record<
  "church_anniversary" | "life_at_rpc" | "marriage_seminar" | "church_picnic",
  Gallery
>;

/** Split text written in the CMS into paragraphs (blank line = new paragraph). */
export const toParagraphs = (text: string | undefined) =>
  (text || "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

/** "+1 (587) 834 0780" → "+15878340780" for tel: links */
export const telHref = (phone: string) => "tel:" + phone.replace(/[^\d+]/g, "");

/** Doubled list so the photo marquee loops seamlessly */
export const loop = (photos: string[] = []) => [...photos, ...photos];
