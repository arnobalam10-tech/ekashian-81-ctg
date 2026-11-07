export const LANGS = ["bn", "en"] as const;
export type Lang = (typeof LANGS)[number];
export type L10n = { bn: string; en: string };

export function isLang(v: string): v is Lang {
  return (LANGS as readonly string[]).includes(v);
}

/** Pick the right language from a bilingual value. */
export function t(v: L10n | string | undefined, lang: Lang): string {
  if (!v) return "";
  return typeof v === "string" ? v : v[lang] || v.en || v.bn;
}

const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
/** Convert ASCII digits to Bengali digits when lang is bn. */
export function num(n: number | string, lang: Lang): string {
  const s = String(n);
  return lang === "bn" ? s.replace(/\d/g, (d) => BN_DIGITS[+d]) : s;
}

const MONTHS: Record<Lang, string[]> = {
  bn: ["জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"],
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
};
export function monthName(m: number, lang: Lang) {
  return MONTHS[lang][m];
}

/** "2027-01-30" -> "৩০ জানুয়ারি ২০২৭" / "30 January 2027" */
export function formatDate(iso: string, lang: Lang, opts: { year?: boolean } = { year: true }) {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  const s = `${num(d, lang)} ${MONTHS[lang][m - 1]}${opts.year === false ? "" : " " + num(y, lang)}`;
  return s;
}

export function href(lang: Lang, path = "") {
  return `/${lang}${path === "/" ? "" : path}`;
}

/** UI strings */
export const ui = {
  orgName: { bn: "একাশিয়ান", en: "EKASHIAN" },
  orgTag: { bn: "এসএসসি ব্যাচ ১৯৮১ · চট্টগ্রাম বিভাগ", en: "SSC Batch 1981 · Chattogram Division" },
  nav: {
    home: { bn: "প্রথম পাতা", en: "Home" },
    about: { bn: "আমাদের কথা", en: "About" },
    committee: { bn: "কার্যনির্বাহী কমিটি", en: "Committee" },
    members: { bn: "সদস্য তালিকা", en: "Members" },
    events: { bn: "অনুষ্ঠান", en: "Events" },
    convention: { bn: "কনভেনশন ২০২৭", en: "Convention 2027" },
    gallery: { bn: "গ্যালারি", en: "Gallery" },
    news: { bn: "সংবাদ", en: "News" },
    notices: { bn: "নোটিশ বোর্ড", en: "Notice Board" },
    birthdays: { bn: "জন্মদিন", en: "Birthdays" },
    blood: { bn: "রক্তদাতা তালিকা", en: "Blood Directory" },
    membership: { bn: "সদস্যপদ", en: "Membership" },
    contact: { bn: "যোগাযোগ", en: "Contact" },
    more: { bn: "আরও", en: "More" },
  },
  applyNow: { bn: "সদস্য হতে আবেদন করুন", en: "Apply for Membership" },
  register: { bn: "নিবন্ধন করুন", en: "Register Now" },
  learnMore: { bn: "বিস্তারিত", en: "Learn more" },
  viewAll: { bn: "সব দেখুন", en: "View all" },
  readMore: { bn: "আরও পড়ুন", en: "Read more" },
  back: { bn: "ফিরে যান", en: "Back" },
  search: { bn: "খুঁজুন", en: "Search" },
  all: { bn: "সব", en: "All" },
  upcoming: { bn: "আসন্ন", en: "Upcoming" },
  past: { bn: "সম্পন্ন", en: "Past" },
  contactViaCommittee: { bn: "কমিটির মাধ্যমে যোগাযোগ", en: "Contact via committee" },
  sampleData: {
    bn: "নমুনা তথ্য — আসল সদস্যদের তথ্য শীঘ্রই যুক্ত হবে।",
    en: "Sample data — real member records will be added soon.",
  },
  days: { bn: "দিন", en: "Days" },
  hours: { bn: "ঘণ্টা", en: "Hours" },
  minutes: { bn: "মিনিট", en: "Minutes" },
  seconds: { bn: "সেকেন্ড", en: "Seconds" },
} satisfies Record<string, unknown>;
