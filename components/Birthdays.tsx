"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Cake, PartyPopper } from "lucide-react";
import type { Member } from "@/lib/types";
import { href, monthName, num, t, type Lang } from "@/lib/i18n";
import { initials } from "@/lib/data";
import { Avatar } from "./ui";

/** Computed in the browser so "today" is always correct on a static site. */
export default function Birthdays({ members, lang }: { members: Member[]; lang: Lang }) {
  const bn = lang === "bn";
  const [now, setNow] = useState<Date | null>(null);
  const [month, setMonth] = useState<number>(0);
  useEffect(() => {
    const d = new Date();
    setNow(d);
    setMonth(d.getMonth());
  }, []);
  if (!now) return <div className="h-64" />;

  const todayKey = `${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  const withBday = members.filter((m) => m.birthday);
  const today = withBday.filter((m) => m.birthday === todayKey);
  const inMonth = withBday.filter((m) => Number(m.birthday!.slice(0, 2)) === month + 1).sort((a, b) => a.birthday!.localeCompare(b.birthday!));

  return (
    <div>
      {today.length > 0 && (
        <div className="mb-12 overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-500 via-brand-600 to-violet-500 p-6 sm:p-10">
          <p className="flex items-center gap-2 font-display text-2xl font-bold text-white">
            <PartyPopper className="size-7" />
            {bn ? "আজ যাঁদের জন্মদিন" : "Birthdays today"}
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {today.map((m) => (
              <Link key={m.id} href={href(lang, `/members/${m.id}`)} className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 hover:bg-white">
                <Avatar src={m.photo} name={t(m.name, lang)} initials={initials(m.name.en)} size={64} />
                <div>
                  <p className="font-display text-lg font-semibold text-white">{t(m.name, lang)}</p>
                  <p className="text-sm text-white/70">{bn ? "শুভ জন্মদিন! 🎉" : "Happy birthday! 🎉"}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2">
        {Array.from({ length: 12 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setMonth(i)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold ${month === i ? "bg-brand-500/15 text-white" : "bg-white/[.04] text-white ring-1 ring-white/10"}`}
          >
            {monthName(i, lang)}
          </button>
        ))}
      </div>

      <h2 className="mt-8 text-2xl font-bold text-white">
        {monthName(month, lang)} — {num(inMonth.length, lang)} {bn ? "জন" : inMonth.length === 1 ? "birthday" : "birthdays"}
      </h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {inMonth.map((m) => {
          const d = Number(m.birthday!.slice(3));
          const isToday = m.birthday === todayKey;
          return (
            <Link
              key={m.id}
              href={href(lang, `/members/${m.id}`)}
              className={`flex items-center gap-4 rounded-3xl p-4 ring-1 transition hover:-translate-y-0.5 hover:shadow-lg ${isToday ? "bg-brand-500/15 ring-brand-400" : "bg-white/[.04] ring-white/10"}`}
            >
              <div className="grid w-14 shrink-0 place-items-center rounded-2xl bg-brand-500/15 py-2 text-center text-white">
                <span className="font-display text-xl font-bold leading-none">{num(d, lang)}</span>
                <Cake className="mt-1 size-3.5 text-brand-200" />
              </div>
              <div className="min-w-0">
                <p className="truncate font-display text-lg font-semibold text-white">{t(m.name, lang)}</p>
                <p className="truncate text-sm text-soft">{t(m.school, lang)}</p>
              </div>
            </Link>
          );
        })}
        {!inMonth.length && <p className="text-soft">{bn ? "এই মাসে কোনো জন্মদিন নেই।" : "No birthdays this month."}</p>}
      </div>
    </div>
  );
}
