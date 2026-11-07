/**
 * ============================================================
 *  SITE SETTINGS — edit this file to update contacts, links,
 *  and the organisation's core text.
 *  Leave a value as "" / null to show "coming soon" on the site.
 * ============================================================
 */
export const site = {
  chapter: "chattogram",
  name: { bn: "একাশিয়ান – এসএসসি ব্যাচ ১৯৮১", en: "EKASHIAN – SSC Batch 1981" },
  chapterName: { bn: "চট্টগ্রাম বিভাগীয় শাখা", en: "Chattogram Division Chapter" },
  url: "https://ekashian-81-ctg.vercel.app",

  links: {
    /** External application / registration website (submissions are handled there). */
    apply: "https://81an.agamievent.org/public_event.php?headgroupkey=graduates_std",
    conventionRegister: "https://81an.agamievent.org/public_event.php?headgroupkey=graduates_std",
    verifyRegistration: "https://81an.agamievent.org/registration_verification.php",
  },

  contact: {
    /** Office address — not provided yet */
    address: { bn: "", en: "" },
    /** Event admins' numbers (from the registration site) until an official chapter number is given */
    phones: ["+88-01819-64692", "+88-01819-610125", "+88-01820-060711"],
    email: "mkcorporationbd@gmail.com",
    officeHours: { bn: "", en: "" },
    /** Google Maps embed query (Milonmela 2027 venue) */
    mapQuery: "Chittagong Club Limited, Shahid Saifuddin Khaled Road, Chattogram",
  },

  socials: {
    facebook: "",
    youtube: "",
    whatsapp: "",
  },

  /** Numbers shown on the home page. Leave null to hide. */
  stats: {
    members: null as number | null,
    schools: null as number | null,
    districts: 11, // districts in Chattogram Division
  },

  /** Welcome message from the chapter — not provided yet */
  welcome: {
    title: { bn: "", en: "" },
    body: { bn: "", en: "" },
    signedBy: { bn: "", en: "" },
  },

  /** From the organisation's brief */
  intro: {
    bn: "একাশিয়ান হলো ১৯৮১ সালে সারা বাংলাদেশ থেকে মাধ্যমিক স্কুল সার্টিফিকেট (এসএসসি) পরীক্ষায় উত্তীর্ণ শিক্ষার্থীদের সংগঠন। বিভিন্ন স্কুল, জেলা ও পেশার সহপাঠীদের একত্রিত করে আজীবন বন্ধুত্ব গড়ে তোলা, পারস্পরিক সম্পর্ক দৃঢ় করা এবং সমাজকল্যাণমূলক কার্যক্রম এগিয়ে নেওয়াই এর লক্ষ্য।",
    en: "Ekashian is the organisation of students from across Bangladesh who passed the Secondary School Certificate (SSC) examination in 1981. It aims to bring together former classmates from different schools, districts and professions, build lifelong friendships, strengthen mutual relationships and promote social welfare activities.",
  },
  vision: {
    bn: "একাশিয়ান পরিবারের জন্য একটি পূর্ণাঙ্গ ডিজিটাল প্ল্যাটফর্ম — যেখানে সদস্যরা পুরোনো বন্ধুদের সাথে আবার যুক্ত হবেন, সহপাঠীদের খুঁজে পাবেন, স্মৃতি ভাগাভাগি করবেন এবং আজীবন সম্পর্ক বজায় রাখবেন। বন্ধুত্ব, ঐক্য ও মর্যাদার প্রতীক।",
    en: "A complete digital platform for the Ekashian family — where members reconnect with old friends, find former classmates, share memories and maintain lifelong relationships. A symbol of friendship, unity and dignity.",
  },
  mission: {
    bn: "বিভিন্ন স্কুল, জেলা ও পেশার সহপাঠীদের একত্রিত করা, আজীবন বন্ধুত্ব গড়ে তোলা, পারস্পরিক সম্পর্ক দৃঢ় করা এবং সমাজকল্যাণমূলক কার্যক্রম এগিয়ে নেওয়া।",
    en: "Bring together classmates from different schools, districts and professions, build lifelong friendships, strengthen mutual relationships and promote social welfare activities.",
  },
  objectives: [
    { bn: "বিভিন্ন স্কুল, জেলা ও পেশার সহপাঠীদের একত্রিত করা", en: "Bring together classmates from different schools, districts and professions" },
    { bn: "আজীবন বন্ধুত্ব গড়ে তোলা", en: "Build lifelong friendships" },
    { bn: "পারস্পরিক সম্পর্ক দৃঢ় করা", en: "Strengthen mutual relationships" },
    { bn: "সমাজকল্যাণমূলক কার্যক্রম এগিয়ে নেওয়া", en: "Promote social welfare activities" },
  ],
};

export type Site = typeof site;
