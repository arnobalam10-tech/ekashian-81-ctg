"use client";

import { useMemo, useState } from "react";
import { Search, School, X } from "lucide-react";
import { num, type Lang } from "@/lib/i18n";
import type { SchoolGroup } from "@/content/registered";

const norm = (s: string) => s.toLowerCase().normalize("NFC").replace(/[.,\s]+/g, " ").trim();

export default function RegisteredList({ groups, lang }: { groups: SchoolGroup[]; lang: Lang }) {
  const bn = lang === "bn";
  const [q, setQ] = useState("");

  const total = useMemo(() => groups.reduce((n, g) => n + g.names.length, 0), [groups]);

  const shown = useMemo(() => {
    const nq = norm(q);
    if (!nq) return groups;
    return groups
      .map((g) => (norm(g.school).includes(nq) ? g : { ...g, names: g.names.filter((n) => norm(n).includes(nq)) }))
      .filter((g) => g.names.length);
  }, [groups, q]);

  const shownCount = shown.reduce((n, g) => n + g.names.length, 0);

  return (
    <div>
      <div className="rounded-3xl card p-4 sm:p-6">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-soft" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            type="search"
            placeholder={bn ? "নাম বা স্কুলের নাম লিখে খুঁজুন…" : "Search by name or school…"}
            className="w-full rounded-2xl border-0 bg-white/[.04] py-4 pl-12 pr-12 text-[17px] ring-1 ring-white/10 placeholder:text-dim focus:ring-2 focus:ring-brand-400"
            aria-label={bn ? "নিবন্ধিত বন্ধুদের খুঁজুন" : "Search registered friends"}
          />
          {q && (
            <button onClick={() => setQ("")} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-soft hover:text-white" aria-label={bn ? "মুছুন" : "Clear"}>
              <X className="size-5" />
            </button>
          )}
        </div>
      </div>

      <p className="mt-8 text-soft">
        <span className="font-display text-2xl font-bold text-white">{num(shownCount, lang)}</span>{" "}
        {bn ? `জন বন্ধু · ${num(shown.length, lang)}টি স্কুল (মোট ${num(total, lang)} জন)` : `friends · ${shown.length} schools (of ${total})`}
      </p>

      {shown.length ? (
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {shown.map((g) => (
            <section key={g.school} className="card flex flex-col p-5 sm:p-6">
              <header className="flex items-start gap-3">
                <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-xl bg-brand-500/15 text-brand-200 ring-1 ring-brand-400/30">
                  <School className="size-5" />
                </span>
                <h3 className="min-w-0 flex-1 text-lg font-semibold leading-snug text-white">{g.school}</h3>
                <span className="shrink-0 rounded-full bg-brand-500/15 px-3 py-1 text-sm font-semibold text-brand-200 ring-1 ring-brand-400/30">{num(g.names.length, lang)}</span>
              </header>
              <ul className="mt-4 space-y-1.5 border-t border-white/10 pt-4">
                {g.names.map((n) => (
                  <li key={n} className="flex items-center gap-3 text-[17px] text-white/90">
                    <span className="size-1.5 shrink-0 rounded-full bg-brand-400" />
                    {n}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      ) : (
        <p className="mt-10 rounded-3xl bg-white/[.04] p-10 text-center text-soft">{bn ? "কাউকে পাওয়া যায়নি। অন্যভাবে খুঁজে দেখুন।" : "No one found. Try a different search."}</p>
      )}
    </div>
  );
}
