/**
 * CONVENTION 2027 (একাশিয়ান মিলনমেলা–২০২৭) — everything on /convention-2027 comes from here.
 * Source of truth for registration: https://81an.agamievent.org
 */
export const REG_SITE = "https://81an.agamievent.org";

export const convention = {
  title: { bn: "একাশিয়ান মিলনমেলা–২০২৭, চট্টগ্রাম", en: "Ekashian Milonmela 2027, Chattogram" },
  subtitle: { bn: "চট্টগ্রাম বিভাগীয় কনভেনশন ২০২৭", en: "Chattogram Division Convention 2027" },
  tagline: { bn: "স্মৃতির টানে – একাশিয়ান একপ্রাণে", en: "Drawn by memories – Ekashians as one" },
  emblem: "/brand/logo.png",
  /** Event start, Bangladesh time (+06:00) */
  startsAt: "2027-01-30T16:30:00+06:00",
  date: "2027-01-30",
  day: { bn: "শনিবার", en: "Saturday" },
  time: { bn: "বিকাল ৪:৩০ থেকে রাত ১১:৩০", en: "4:30 PM to 11:30 PM" },
  venue: { bn: "ব্যাংকুয়েট হল, চিটাগাং ক্লাব লিমিটেড (মূল ভবন)", en: "Banquet Hall, Chittagong Club Limited (Main Building)" },
  address: {
    bn: "শহীদ সাইফুদ্দিন খালেদ রোড, এম. এ. আজিজ স্টেডিয়াম সংলগ্ন, চট্টগ্রাম",
    en: "Shahid Saifuddin Khaled Road, beside M. A. Aziz Stadium, Chattogram",
  },
  mapQuery: "Chittagong Club Limited, Shahid Saifuddin Khaled Road, Chattogram",
  organizer: { bn: "একাশিয়ান – এসএসসি ব্যাচ ১৯৮১, চট্টগ্রাম বিভাগীয় শাখা", en: "EKASHIAN – SSC Batch 1981, Chattogram Division Chapter" },

  links: {
    register: `${REG_SITE}/public_event.php?headgroupkey=graduates_std`,
    verify: `${REG_SITE}/registration_verification.php`,
    site: REG_SITE,
  },

  registration: {
    opens: "2026-11-01",
    closes: "2026-12-10",
    fees: [
      { category: { bn: "প্রাক্তন শিক্ষার্থী / বন্ধু", en: "Alumni / Friend" }, note: { bn: "মূল অংশগ্রহণকারী (ব্যাচ '৮১)", en: "Main participant (Batch '81)" }, fee: { bn: "৳ ১,৫০০ + ২% চার্জ (মোট ৳১,৫৩০)", en: "৳1,500 + 2% charge (total ৳1,530)" } },
      { category: { bn: "ড্রাইভার", en: "Driver" }, note: { bn: "ব্যক্তিগত গাড়ির চালক", en: "Personal car driver" }, fee: { bn: "৳ ৪০০ + ২% চার্জ (মোট ৳৪০৮)", en: "৳400 + 2% charge (total ৳408)" } },
      { category: { bn: "স্ত্রী / স্বামী / সন্তান", en: "Spouse / Children" }, note: { bn: "পরিবারের সদস্য", en: "Family members" }, fee: { bn: "নির্ধারণ করা হবে", en: "To be announced" } },
    ],
    payment: { bn: "bKash অনলাইন পেমেন্ট", en: "bKash online payment" },
  },

  intro: {
    bn: "'স্মৃতির টানে – একাশিয়ান একপ্রাণে' — এসএসসি ব্যাচ ১৯৮১-এর বন্ধুদের মিলনমেলা। নিজ নিজ স্কুলের পরিচিতি পর্ব, বন্ধুদের প্রাণবন্ত স্মৃতিচারণ ও আড্ডা, সাংস্কৃতিক অনুষ্ঠান, প্রীতি নৈশভোজ এবং র‍্যাফেল ড্র।",
    en: "'Drawn by memories – Ekashians as one' — the reunion of the SSC Batch of 1981. School-wise introductions, lively reminiscing and conversation, a cultural programme, dinner and a raffle draw.",
  },
  /** Leave empty until the organisers publish objectives */
  objectives: [] as { bn: string; en: string }[],

  /** Leave null until the organisers publish numbers */
  expectedParticipants: null as number | null,
  registeredCount: null as number | null,

  /** Leave empty until guests are announced — the site shows "to be announced" */
  guests: {
    chief: [] as { name: { bn: string; en: string }; title: { bn: string; en: string }; photo: string }[],
    special: [] as { name: { bn: string; en: string }; title: { bn: string; en: string }; photo: string }[],
    invited: [] as { bn: string; en: string }[],
  },

  /** Event admins (from the registration site) */
  admins: [
    { name: { bn: "মোঃ কামাল উদ্দিন", en: "Md. Kamal Uddin" }, role: { bn: "অ্যাডমিন ০১", en: "Admin 01" }, phone: "+88-01819-64692", email: "mkcorporationbd@gmail.com", photo: "/committee/admin-kamal-uddin.jpg" },
    { name: { bn: "আবদুল্লাহ আল-কাদের", en: "Abdullah Al-Kader" }, role: { bn: "অ্যাডমিন ০২", en: "Admin 02" }, phone: "+88-01819-610125", email: "abdullah.alkader@yahoo.com", photo: "/committee/admin-abdullah-al-kader.jpg" },
    { name: { bn: "সাইদুর রহমান চৌধুরী", en: "Saidur Rahman Chowdhury" }, role: { bn: "অ্যাডমিন ০৩", en: "Admin 03" }, phone: "+88-01820-060711", email: "saidurchowdhury1966@gmail.com", photo: "/committee/admin-saidur-rahman-chowdhury.jpg" },
  ],

  organizingCommittee: [] as { role: { bn: string; en: string }; name: { bn: string; en: string } }[],

  /** Program flow (no fixed times published yet) */
  schedule: [
    { bn: "নিবন্ধনকৃত বন্ধুদের অভ্যর্থনা", en: "Welcoming registered friends" },
    { bn: "রেজিস্ট্রেশন যাচাই এবং ব্যাজ ও টি-শার্ট বিতরণ", en: "Registration check, badge & T-shirt distribution" },
    { bn: "নিজ নিজ স্কুলের পরিচিতি পর্ব", en: "School-wise introductions" },
    { bn: "বন্ধুদের প্রাণবন্ত স্মৃতিচারণ ও আড্ডা", en: "Lively reminiscing & conversation" },
    { bn: "বৈকালিক নাশতা", en: "Afternoon snacks" },
    { bn: "মনোজ্ঞ সাংস্কৃতিক অনুষ্ঠান ও পরিবেশনা", en: "Cultural programme & performances" },
    { bn: "প্রীতি নৈশভোজ", en: "Dinner" },
    { bn: "আকর্ষণীয় র‍্যাফেল ড্র", en: "Raffle draw" },
    { bn: "র‍্যাফেল ড্র বিজয়ীদের মাঝে পুরস্কার বিতরণ", en: "Prize giving for raffle winners" },
    { bn: "অনুষ্ঠানের সমাপ্তি ঘোষণা", en: "Closing" },
  ],

  guidelines: [
    { bn: "রেজিস্ট্রেশনের সময় সঠিক ও পূর্ণাঙ্গ তথ্য প্রদান করতে হবে।", en: "Provide correct and complete information when registering." },
    { bn: "স্কুলের নাম উল্লেখ করা বাধ্যতামূলক।", en: "School name is mandatory." },
    { bn: "ছবি আপলোড করা বাধ্যতামূলক।", en: "Uploading a photo is mandatory." },
    { bn: "রেজিস্ট্রেশন ফি-এর সঙ্গে প্রযোজ্য চার্জ যুক্ত হবে।", en: "Applicable charges are added to the registration fee." },
    { bn: "রেজিস্ট্রেশন সম্পন্ন হওয়ার পর কুপন ও ইনভাইটেশন কার্ড প্রদান করা হবে।", en: "A coupon and invitation card are issued after registration." },
    { bn: "কুপনের মাধ্যমে বৈকালিক নাশতা ও নৈশভোজ গ্রহণ করা যাবে।", en: "Snacks and dinner are served against the coupon." },
    { bn: "অনুষ্ঠানে প্রবেশের সময় ইনভাইটেশন কার্ড সঙ্গে আনতে হবে।", en: "Bring your invitation card for entry." },
    { bn: "টি-শার্টের সাইজ প্রদানের ক্ষেত্রে সতর্কতা অবলম্বন করতে হবে।", en: "Choose your T-shirt size carefully." },
  ],

  /** After the event: add photos (paths under /public/convention-2027/) and YouTube IDs. */
  photos: [] as string[],
  videos: [] as string[],
  memories: { bn: "", en: "" },
};
