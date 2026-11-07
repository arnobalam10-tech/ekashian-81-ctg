import type { CommitteeMember } from "@/lib/types";

/**
 * EXECUTIVE COMMITTEE — Chattogram Division Chapter.
 * TODO: replace sample names with the real committee. Photos → /public/committee/<id>.jpg
 * Set `showPhone: true` only for members who agree to show their number publicly.
 */
export const COMMITTEE_IS_SAMPLE = false;

/**
 * Add the real executive committee here when available, e.g.
 * { id: "c01", role: "president", name: { bn: "...", en: "..." }, photo: "/committee/president.jpg", phone: "+88...", showPhone: true },
 * Until then the Committee page shows the Milonmela 2027 event admins (content/convention.ts → admins).
 */
export const committee: CommitteeMember[] = [];

export const ROLE_LABEL: Record<CommitteeMember["role"], { bn: string; en: string }> = {
  president: { bn: "সভাপতি", en: "President" },
  "senior-vice-president": { bn: "সিনিয়র সহ-সভাপতি", en: "Senior Vice President" },
  "vice-president": { bn: "সহ-সভাপতি", en: "Vice President" },
  "general-secretary": { bn: "সাধারণ সম্পাদক", en: "General Secretary" },
  "joint-general-secretary": { bn: "যুগ্ম সাধারণ সম্পাদক", en: "Joint General Secretary" },
  "organizing-secretary": { bn: "সাংগঠনিক সম্পাদক", en: "Organizing Secretary" },
  "finance-secretary": { bn: "অর্থ সম্পাদক", en: "Finance Secretary" },
  "office-secretary": { bn: "দপ্তর সম্পাদক", en: "Office Secretary" },
  "publicity-secretary": { bn: "প্রচার সম্পাদক", en: "Publicity Secretary" },
  "cultural-secretary": { bn: "সাংস্কৃতিক সম্পাদক", en: "Cultural Secretary" },
  "other-secretary": { bn: "সম্পাদক", en: "Secretary" },
  "executive-member": { bn: "কার্যনির্বাহী সদস্য", en: "Executive Member" },
};

/** Display tiers for the hierarchy (top → bottom) */
export const TIERS: CommitteeMember["role"][][] = [
  ["president"],
  ["senior-vice-president"],
  ["vice-president"],
  ["general-secretary"],
  ["joint-general-secretary"],
  ["organizing-secretary", "finance-secretary", "office-secretary", "publicity-secretary", "cultural-secretary", "other-secretary"],
  ["executive-member"],
];
