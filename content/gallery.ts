import type { Album, Video } from "@/lib/types";

/**
 * GALLERY — put photos in /public/gallery/<album-slug>/ and add an album here, e.g.
 * { slug: "milonmela-2027", kind: "event", date: "2027-01-30", title: { bn: "...", en: "..." }, photos: [{ src: "/gallery/milonmela-2027/01.jpg" }] }
 */
export const albums: Album[] = [
  {
    slug: "friends-gathering",
    kind: "event",
    title: { bn: "একাশিয়ান বন্ধুদের সমাবেশ", en: "Ekashian friends together" },
    cover: "/gallery/friends-gathering/01.jpg",
    photos: [{ src: "/gallery/friends-gathering/01.jpg", caption: { bn: "একাশিয়ান বন্ধুরা একসাথে", en: "Ekashian friends together" } }],
  },
  {
    slug: "story-coaching-centre",
    kind: "memories",
    title: { bn: "৪১ বছর পর কোচিং সেন্টারে", en: "At the coaching centre, 41 years later" },
    cover: "/stories/coaching-centre-panchlaish.webp",
    photos: [{ src: "/stories/coaching-centre-panchlaish.webp", caption: { bn: "পাঁচলাইশে কোচিং সেন্টারের সামনে — ফরিদ উদ্দিন মাহমুদ (রঞ্জু)-এর পাঠানো ছবি", en: "Outside the coaching centre in Panchlaish — photo shared by Farid Uddin Mahmud (Ranju)" } }],
  },
  {
    slug: "our-chattogram",
    kind: "memories",
    title: { bn: "আমাদের চট্টগ্রাম", en: "Our Chattogram" },
    cover: "/images/ctg-college-red.jpg",
    photos: [
      { src: "/images/ctg-college-red.jpg", caption: { bn: "চট্টগ্রাম কলেজ", en: "Chittagong College" } },
      { src: "/images/collegiate-school.jpg", caption: { bn: "চট্টগ্রাম কলেজিয়েট স্কুল", en: "Chittagong Collegiate School" } },
      { src: "/images/crb.jpg", caption: { bn: "সেন্ট্রাল রেলওয়ে বিল্ডিং (সিআরবি)", en: "Central Railway Building (CRB)" } },
      { src: "/images/court-building.jpg", caption: { bn: "পরীর পাহাড় — কোর্ট বিল্ডিং", en: "Pori Pahar — Court Building" } },
      { src: "/images/hero-karnaphuli.jpg", caption: { bn: "কর্ণফুলী ও শাহ আমানত সেতু", en: "Karnaphuli & Shah Amanat Bridge" } },
      { src: "/images/patenga-sunset.jpg", caption: { bn: "পতেঙ্গা সমুদ্র সৈকত", en: "Patenga Sea Beach" } },
    ],
  },
];

export const ALBUM_KIND_LABEL = {
  event: { bn: "অনুষ্ঠান", en: "Events" },
  reunion: { bn: "পুনর্মিলনী", en: "Reunions" },
  memories: { bn: "পুরোনো স্মৃতি", en: "Memories" },
} as const;

/** VIDEOS — YouTube video IDs (the part after v= in the link). */
export const videos: Video[] = [];
