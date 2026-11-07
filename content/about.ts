/**
 * About page content. Only facts from the organisation's own brief are used here.
 * Leave a field as "" (or a list empty) to show "coming soon" on the site.
 */
export const about = {
  /** Detailed history — waiting on the organisation */
  history: { bn: "", en: "" },
  formation: {
    bn: "একাশিয়ান গঠিত হয়েছে ১৯৮১ সালে সারা বাংলাদেশ থেকে এসএসসি পরীক্ষায় উত্তীর্ণ শিক্ষার্থীদের নিয়ে। চট্টগ্রাম বিভাগীয় শাখা চট্টগ্রাম বিভাগের একাশিয়ানদের নিয়ে কাজ করে।",
    en: "Ekashian was formed by students from across Bangladesh who passed the SSC examination in 1981. The Chattogram Division Chapter brings together the Ekashians of Chattogram Division.",
  },
  chapterIntro: { bn: "", en: "" },
  achievements: [] as { year: string; text: { bn: string; en: string } }[],
  structure: [] as { bn: string; en: string }[],
  /** From the organisation's brief */
  futurePlans: [
    { bn: "সদস্যদের নিজস্ব লগইন ও প্রোফাইল হালনাগাদ সুবিধা", en: "Member login and self-service profile updates" },
    { bn: "ডিজিটাল সদস্য কার্ড", en: "Digital membership cards" },
    { bn: "জন্মদিন ও পুনর্মিলনীর নোটিফিকেশন", en: "Birthday and reunion notifications" },
    { bn: "ঢাকা, রাজশাহী, খুলনা, সিলেটসহ অন্যান্য বিভাগীয় শাখাকে একই প্ল্যাটফর্মে যুক্ত করা", en: "Bring Dhaka, Rajshahi, Khulna, Sylhet and other divisional chapters onto the same platform" },
  ],
  donation: { bn: "", en: "" },
};
