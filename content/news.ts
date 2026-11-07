import type { NewsItem, Notice } from "@/lib/types";

/** NEWS & ANNOUNCEMENTS — newest first. */
export const news: NewsItem[] = [
  {
    slug: "convention-2027-announced",
    kind: "announcement",
    date: "2026-11-01",
    title: { bn: "একাশিয়ান মিলনমেলা–২০২৭: রেজিস্ট্রেশন শুরু", en: "Ekashian Milonmela 2027: registration open" },
    summary: { bn: "৩০ জানুয়ারি ২০২৭, শনিবার — চিটাগাং ক্লাব লিমিটেডের ব্যাংকুয়েট হলে। রেজিস্ট্রেশন চলবে ১০ ডিসেম্বর ২০২৬ পর্যন্ত।", en: "Saturday, 30 January 2027 — Banquet Hall, Chittagong Club Ltd. Registration runs until 10 December 2026." },
    body: {
      bn: "'স্মৃতির টানে – একাশিয়ান একপ্রাণে' শ্লোগানে একাশিয়ান মিলনমেলা–২০২৭ অনুষ্ঠিত হবে ৩০ জানুয়ারি ২০২৭, শনিবার বিকাল ৪:৩০ থেকে রাত ১১:৩০ পর্যন্ত, চিটাগাং ক্লাব লিমিটেডের (মূল ভবন) ব্যাংকুয়েট হলে। অনলাইন রেজিস্ট্রেশন ০১ নভেম্বর ২০২৬ থেকে শুরু হয়েছে এবং চলবে ১০ ডিসেম্বর ২০২৬ পর্যন্ত। ব্যাচ '৮১-এর বন্ধুদের রেজিস্ট্রেশন ফি ৳১,৫০০ (+২% চার্জ), bKash-এর মাধ্যমে পরিশোধযোগ্য।",
      en: "Under the slogan 'Drawn by memories – Ekashians as one', Ekashian Milonmela 2027 will be held on Saturday, 30 January 2027, 4:30 PM to 11:30 PM, at the Banquet Hall of Chittagong Club Limited (Main Building). Online registration opened on 1 November 2026 and runs until 10 December 2026. The fee for Batch '81 friends is ৳1,500 (+2% charge), payable via bKash.",
    },
  },
];

export const NEWS_KIND_LABEL = {
  news: { bn: "সংবাদ", en: "News" },
  announcement: { bn: "ঘোষণা", en: "Announcement" },
  meeting: { bn: "সভার নোটিশ", en: "Meeting Notice" },
  circular: { bn: "বিজ্ঞপ্তি", en: "Circular" },
} as const;

/** NOTICE BOARD — short dated notices. */
export const notices: Notice[] = [
  {
    id: "n1", date: "2026-11-01", pinned: true, important: true,
    title: { bn: "মিলনমেলা–২০২৭ রেজিস্ট্রেশন চলছে — শেষ তারিখ ১০ ডিসেম্বর", en: "Milonmela 2027 registration open — closes 10 December" },
    body: { bn: "অনলাইন ফরম পূরণ করে bKash-এ ফি পরিশোধ করুন। পেমেন্টের পর ইনভাইটেশন কার্ড ও মানি রিসিপ্ট ডাউনলোড করা যাবে।", en: "Fill in the online form and pay via bKash. Your invitation card and receipt can be downloaded after payment." },
    link: "https://81an.agamievent.org/public_event.php?headgroupkey=graduates_std",
  },
];
