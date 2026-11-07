import membersJson from "@/content/members.json";
import type { Member } from "./types";
import { events } from "@/content/events";

export const members = (membersJson as Member[]).slice().sort((a, b) => a.name.en.localeCompare(b.name.en));
export const membersAreSample = members.some((m) => m.sample);

export function getMember(id: string) {
  return members.find((m) => m.id.toLowerCase() === id.toLowerCase());
}

/** Member photo path: explicit `photo`, else undefined (initials avatar is shown). */
export function memberPhoto(m: Member) {
  return m.photo || undefined;
}

export function initials(name: string) {
  const parts = name.replace(/[.,]/g, " ").split(/\s+/).filter(Boolean);
  const pick = parts.filter((p) => !/^(md|mohammad|muhammad|syed|a|k|m)$/i.test(p));
  const use = (pick.length ? pick : parts).slice(-2);
  return use.map((p) => p[0]).join("").toUpperCase();
}

const today = () => new Date().toISOString().slice(0, 10);

export function upcomingEvents() {
  const t = today();
  return events.filter((e) => e.date >= t).sort((a, b) => a.date.localeCompare(b.date));
}
export function pastEvents() {
  const t = today();
  return events.filter((e) => e.date < t).sort((a, b) => b.date.localeCompare(a.date));
}

export function unique<T>(arr: T[]) {
  return Array.from(new Set(arr));
}
