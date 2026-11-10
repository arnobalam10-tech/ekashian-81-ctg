/**
 * REGISTERED FRIENDS — Ekashian Milonmela 2027 online registration.
 * Source: official list published on 9 November 2026 (9 PM). 55 names.
 * Registration stays open until 10 Dec 2026; the list is republished weekly.
 *
 * To add more names: append `[name, SCHOOL]` rows below. Reuse the school constants
 * (or the exact same string) so friends of one school are grouped together.
 * Phone numbers / addresses are NOT published here.
 */

export const registeredAsOf = "2026-11-09";

const MUSLIM = "চট্টগ্রাম সরকারি মুসলিম হাই স্কুল";
const COLLEGIATE = "চট্টগ্রাম সরকারি কলেজিয়েট হাই স্কুল";
const GOHIRA = "গহিরা এ,জে,ওয়াই,এম,এস বহুমুখী উচ্চ বিদ্যালয়, রাউজান, চট্টগ্রাম";
const AGRABAD_COLONY = "আগ্রাবাদ গভর্নমেন্ট কলোনি হাই স্কুল, চট্টগ্রাম";
const JOARA = "Joara Bishwamber Chy High School, চন্দনাইশ, চট্টগ্রাম";
const KUMIRA = "কুমিরা আবাসিক উচ্চ বিদ্যালয়, চট্টগ্রাম";
const NASIRABAD = "নাসিরাবাদ গভর্নমেন্ট বয়েজ হাই স্কুল, চট্টগ্রাম";
const UTTAR_RANGUNIA = "উত্তর রাঙ্গুনিয়া হাই স্কুল, চট্টগ্রাম";
const GUZARA = "Guzara Nityanada High School, আনোয়ারা, চট্টগ্রাম";

const rows: [name: string, school: string][] = [
  ["মোঃ কামাল উদ্দীন", "পাহাড়তলী রেলওয়ে গর্ভমেন্ট হাই স্কুল, চট্টগ্রাম"],
  ["মোহম্মদ আজিজুর রহমান রহিম", JOARA],
  ["আবদুল্লাহ আল কাদের", "চিটাগং গভর্নমেন্ট হাই স্কুল"],
  ["আরিফ আহমেদ", "পেকুয়া জি,এম,সি ইন্সটিটিউশানস, চট্টগ্রাম"],
  ["মোঃ আমিনুল ইসলাম", "গাছবাড়িয়া এন জি স্কুল, চন্দনাইশ, চট্টগ্রাম"],
  ["মোঃ মঈন উদ্দীন আহমেদ খান", JOARA],
  ["মির্জা ফজলুল কাদের", "আর,কে,আর হাই স্কুল, রাঙ্গুনিয়া, চট্টগ্রাম"],
  ["অলোক ঘোষ", JOARA],
  ["সাইদুর রহমান চৌধুরী", MUSLIM],
  ["আখতারুজ্জামান বাবুল", "Barangali High School, Manikganj"],
  ["মীর মোহম্মদ শফিউল আলম নিজাম", GOHIRA],
  ["আব্দর রহীম রেসনী", "জি,আর,কে হাই স্কুল, আগ্রাবাদ, চট্টগ্রাম"],
  ["আলী তারেক পারভেজ", MUSLIM],
  ["মোঃ আলাউদ্দীন আল আজাদ", "আবির পাড়া মাধ্যমিক হাই স্কুল"],
  ["ফরিদ উদ্দিন মাহামুদ রঞ্জু", "আগ্রাবাদ টি এন্ড টি উচ্চ বিদ্যালয়, চট্টগ্রাম"],
  ["সাইদুর রহমান", KUMIRA],
  ["সুমি বড়ুয়া", "অপর্ণা চরণ বালিকা উচ্চ বিদ্যালয়, চট্টগ্রাম"],
  ["মোঃ নুরুল আনোয়ার আনু", COLLEGIATE],
  ["মনির আহম্মদ", "শেরে বাংলা হাই স্কুল"],
  ["মোঃ জাহাঙ্গীর উদ্দিন", COLLEGIATE],
  ["মোহম্মদ মাহাতাবুর রহমান", MUSLIM],
  ["মোঃ সেকান্দর মিয়া", COLLEGIATE],
  ["পার্থ সারথি মুৎসুদ্দি", AGRABAD_COLONY],
  ["মোহম্মদ শহিদ উদ্দিন", "কালীপুর এজাহারুল হক উচ্চ বিদ্যালয়, বাঁশখালি, চট্টগ্রাম"],
  ["মোঃ শওকত হোসেন ভুইয়া", "Chaitanyna Bahumukhi High School, Narsingdi"],
  ["মোঃ লিয়াকত আলী চৌধুরী", GOHIRA],
  ["ডঃ আযাদ বুলবুল", "দত্তপাড়া রামরতন আদর্শ উচ্চ বিদ্যালয়, নোয়াখালী"],
  ["আলহাজ্ব আবু ইউসুফ চৌধুরী", GOHIRA],
  ["সৈয়দ মুজতবা সাব্বির", "ওয়াপদা স্কুল"],
  ["মোহাম্মদ সামছুল ফারুক", "চট্টগ্রাম মিউনিসিপ্যাল হাই স্কুল"],
  ["রিয়াজ মোঃ জাহিদুল আলম", "গঙ্গামন্ডল রাজ ইনিস্টিউশান"],
  ["নুরুল আমিন", "বাণিগ্রাম সাধনপুর উচ্চ বিদ্যালয়"],
  ["স্বপন দাশ গুপ্ত", NASIRABAD],
  ["শফিকুল আলম চৌঃ", "মিউনিসিপ্যাল মডেল হাই স্কুল, চট্টগ্রাম"],
  ["বাবুল চন্দ্র দাস", NASIRABAD],
  ["মাখন লাল দাশ", "গশ্চি উচ্চ বিদ্যালয়, রাউজান, চট্টগ্রাম"],
  ["আবু আলম", MUSLIM],
  ["আবদুল মালেক চৌধুরী", UTTAR_RANGUNIA],
  ["মোহাম্মদ মনোয়ারুল হক শামীম", COLLEGIATE],
  ["মোঃ ওসমান খান চৌধুরী", "A.L. Khan Multilateral High School, Mohara, Chattogram"],
  ["মোহম্মদ আবু তাহের", "ধর্মপুর হাই স্কুল"],
  ["মোঃ আবু জাফর", "মিঠাছড়া হাই স্কুল, মিরসরাই, চট্টগ্রাম"],
  ["ইঞ্জিনিয়ার আবু তালেব চৌধুরী", UTTAR_RANGUNIA],
  ["এ এইচ এম ইকাবাল দানিশ", COLLEGIATE],
  ["মাহাবুবুল হক", "মহসিন হাই স্কুল"],
  ["মোহাম্মদ বেলাল", "দৌলতপুর এ,বি,সি উচ্চ বিদ্যালয়, ফটিকছড়ি, চট্টগ্রাম"],
  ["মোহম্মদ মফিজুর রহমান", "গাছবাড়িয়া উচ্চ বিদ্যালয়, চট্টগ্রাম"],
  ["প্রণব কুমার দাশ গুপ্ত", GUZARA],
  ["অনুপম কুমার পাল", GUZARA],
  ["তাপস শেখর", AGRABAD_COLONY],
  ["গাজী হুমায়ুন কবির", KUMIRA],
  ["রেজাউল করিম চৌধুরী", MUSLIM],
  ["উৎপল দে চৌধুরী", COLLEGIATE],
  ["শেখ মোহম্মদ আবদুল্লাহ জাকারিয়া", "মসজিদ্দিয়া হাই স্কুল, কুমিরা, চট্টগ্রাম"],
  ["মীর রেজুয়ান হোসেন টিপু", AGRABAD_COLONY],
];

export type SchoolGroup = { school: string; names: string[] };

const isLatin = (s: string) => /^[A-Za-z]/.test(s);

/** Schools sorted A–Z (Bengali-named schools first, then English-named), friends sorted A–Z inside each school. */
export const registeredBySchool: SchoolGroup[] = (() => {
  const map = new Map<string, string[]>();
  for (const [name, school] of rows) map.set(school, [...(map.get(school) ?? []), name]);
  return Array.from(map, ([school, names]) => ({ school, names: names.sort((a, b) => a.localeCompare(b, "bn")) })).sort(
    (a, b) => Number(isLatin(a.school)) - Number(isLatin(b.school)) || a.school.localeCompare(b.school, isLatin(a.school) ? "en" : "bn"),
  );
})();

export const registeredCount = rows.length;
export const registeredSchoolCount = registeredBySchool.length;
