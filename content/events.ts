import type { EventItem, EventCategory } from "@/lib/types";

/**
 * EVENTS — add real events here (newest first). `date` is YYYY-MM-DD.
 * Event photos → /public/events/<slug>/... and list them in `photos`.
 */
export const events: EventItem[] = [
  {
    slug: "convention-2027",
    title: { bn: "একাশিয়ান মিলনমেলা–২০২৭, চট্টগ্রাম", en: "Ekashian Milonmela 2027, Chattogram" },
    category: "convention",
    date: "2027-01-30",
    time: { bn: "বিকাল ৪:৩০ – রাত ১১:৩০", en: "4:30 PM – 11:30 PM" },
    venue: { bn: "ব্যাংকুয়েট হল, চিটাগাং ক্লাব লিমিটেড", en: "Banquet Hall, Chittagong Club Ltd." },
    summary: { bn: "স্মৃতির টানে – একাশিয়ান একপ্রাণে।", en: "Drawn by memories – Ekashians as one." },
    registrationUrl: "https://81an.agamievent.org/public_event.php?headgroupkey=graduates_std",
    featured: true,
  },
];

export const CATEGORY_LABEL: Record<EventCategory, { bn: string; en: string }> = {
  reunion: { bn: "পুনর্মিলনী", en: "Reunion" },
  "get-together": { bn: "বার্ষিক মিলনমেলা", en: "Annual Get-together" },
  family: { bn: "পারিবারিক মিলনমেলা", en: "Family Gathering" },
  picnic: { bn: "বনভোজন ও ভ্রমণ", en: "Picnic & Tour" },
  iftar: { bn: "ইফতার মাহফিল", en: "Iftar Mahfil" },
  charity: { bn: "সমাজকল্যাণ", en: "Social & Charity" },
  meeting: { bn: "সভা", en: "Meeting" },
  convention: { bn: "মিলনমেলা", en: "Milonmela" },
};
