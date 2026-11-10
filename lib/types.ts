import type { L10n } from "./i18n";

export type Member = {
  /** Membership ID, e.g. "EK81-CTG-0001". Photo file: /public/members/<id>.jpg */
  id: string;
  name: L10n;
  photo?: string;
  school: L10n;
  district: L10n;
  upazila: L10n;
  profession: L10n;
  bloodGroup?: string;
  /** Show blood group publicly (member's choice) */
  showBloodGroup?: boolean;
  /** "MM-DD", no year */
  birthday?: string;
  bio?: L10n;
  /** Marks placeholder records */
  sample?: boolean;
};

export type CommitteeRole =
  | "president"
  | "senior-vice-president"
  | "vice-president"
  | "general-secretary"
  | "joint-general-secretary"
  | "organizing-secretary"
  | "finance-secretary"
  | "office-secretary"
  | "publicity-secretary"
  | "cultural-secretary"
  | "other-secretary"
  | "executive-member";

export type CommitteeMember = {
  id: string;
  name: L10n;
  role: CommitteeRole;
  /** Custom title for "other-secretary", e.g. Social Welfare Secretary */
  title?: L10n;
  photo?: string;
  phone?: string;
  showPhone?: boolean;
  intro?: L10n;
  memberId?: string;
};

export type EventCategory = "reunion" | "get-together" | "family" | "picnic" | "iftar" | "charity" | "meeting" | "convention";

export type EventItem = {
  slug: string;
  title: L10n;
  category: EventCategory;
  date: string; // ISO
  time?: L10n;
  venue: L10n;
  summary: L10n;
  body?: L10n;
  cover?: string;
  photos?: string[];
  registrationUrl?: string;
  participants?: number;
  featured?: boolean;
};

export type NewsKind = "news" | "announcement" | "meeting" | "circular" | "story";
export type NewsItem = {
  slug: string;
  kind: NewsKind;
  title: L10n;
  date: string;
  summary: L10n;
  body: L10n;
  cover?: string;
  /** Shown under the cover image, e.g. photo credit */
  coverCaption?: L10n;
  /** Byline for stories shared by a member */
  author?: L10n;
};

export type Notice = {
  id: string;
  date: string;
  title: L10n;
  body: L10n;
  important?: boolean;
  pinned?: boolean;
  link?: string;
};

export type Album = {
  slug: string;
  title: L10n;
  date?: string;
  kind: "event" | "reunion" | "memories";
  cover?: string;
  photos: { src: string; caption?: L10n }[];
};

export type Video = { youtubeId: string; title: L10n; date?: string };
