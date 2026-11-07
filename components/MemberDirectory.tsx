"use client";

import { useMemo, useState } from "react";
import { Search, X, SlidersHorizontal } from "lucide-react";
import type { Member } from "@/lib/types";
import { num, t, type Lang } from "@/lib/i18n";
import { MemberCard } from "./cards";

type Filters = { district: string; upazila: string; school: string; profession: string; blood: string };
const EMPTY: Filters = { district: "", upazila: "", school: "", profession: "", blood: "" };

function norm(s: string) {
  return s
    .toLowerCase()
    .normalize("NFC")
    .replace(/[.\s]+/g, " ")
    .trim();
}

export default function MemberDirectory({ members, lang }: { members: Member[]; lang: Lang }) {
  const bn = lang === "bn";
  const [q, setQ] = useState("");
  const [f, setF] = useState<Filters>(EMPTY);
  const [letter, setLetter] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const opts = useMemo(() => {
    const uniq = (get: (m: Member) => string, pool = members) => Array.from(new Set(pool.map(get).filter(Boolean))).sort((a, b) => a.localeCompare(b, lang));
    return {
      district: uniq((m) => t(m.district, lang)),
      upazila: uniq((m) => t(m.upazila, lang), f.district ? members.filter((m) => t(m.district, lang) === f.district) : members),
      school: uniq((m) => t(m.school, lang)),
      profession: uniq((m) => t(m.profession, lang)),
      blood: uniq((m) => (m.showBloodGroup && m.bloodGroup) || ""),
    };
  }, [members, lang, f.district]);

  const sorted = useMemo(() => members.slice().sort((a, b) => t(a.name, lang).localeCompare(t(b.name, lang), lang)), [members, lang]);
  const letters = useMemo(() => Array.from(new Set(sorted.map((m) => t(m.name, lang).trim()[0]?.toUpperCase()))), [sorted, lang]);

  const list = useMemo(() => {
    const nq = norm(q);
    return sorted.filter((m) => {
      if (nq) {
        const hay = norm([m.name.bn, m.name.en, m.school.bn, m.school.en, m.profession.bn, m.profession.en, m.district.bn, m.district.en, m.upazila.bn, m.upazila.en, m.id].join(" | "));
        if (!hay.includes(nq)) return false;
      }
      if (f.district && t(m.district, lang) !== f.district) return false;
      if (f.upazila && t(m.upazila, lang) !== f.upazila) return false;
      if (f.school && t(m.school, lang) !== f.school) return false;
      if (f.profession && t(m.profession, lang) !== f.profession) return false;
      if (f.blood && !(m.showBloodGroup && m.bloodGroup === f.blood)) return false;
      if (letter && t(m.name, lang).trim()[0]?.toUpperCase() !== letter) return false;
      return true;
    });
  }, [sorted, q, f, letter, lang]);

  const active = Object.values(f).filter(Boolean).length + (letter ? 1 : 0);
  const sel = (k: keyof Filters, label: string) => (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-soft">{label}</span>
      <select
        value={f[k]}
        onChange={(e) => setF((p) => ({ ...p, [k]: e.target.value, ...(k === "district" ? { upazila: "" } : {}) }))}
        className="w-full appearance-none rounded-xl border-0 bg-white/[.04] px-4 py-3 text-[15px] text-white ring-1 ring-white/10 focus:ring-2 focus:ring-brand-400"
      >
        <option value="">{bn ? "সব" : "All"}</option>
        {opts[k].map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );

  return (
    <div>
      <div className="rounded-3xl card p-4 sm:p-6">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-soft" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              type="search"
              placeholder={bn ? "নাম, স্কুল, পেশা বা সদস্য আইডি লিখুন…" : "Type a name, school, profession or member ID…"}
              className="w-full rounded-2xl border-0 bg-white/[.04] py-4 pl-12 pr-4 text-[17px] ring-1 ring-white/10 placeholder:text-dim focus:ring-2 focus:ring-brand-400"
              aria-label={bn ? "সদস্য খুঁজুন" : "Search members"}
            />
          </div>
          <button
            onClick={() => setShowFilters((v) => !v)}
            className={`flex items-center gap-2 rounded-2xl px-4 font-semibold transition lg:hidden ${showFilters ? "bg-brand-500/15 text-white" : "bg-white/[.04] text-white ring-1 ring-white/10"}`}
            aria-expanded={showFilters}
          >
            <SlidersHorizontal className="size-5" />
            {active > 0 && <span className="grid size-5 place-items-center rounded-full bg-brand-500 text-xs text-white">{num(active, lang)}</span>}
          </button>
        </div>
        <div className={`mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5 ${showFilters ? "" : "hidden lg:grid"}`}>
          {sel("district", bn ? "জেলা" : "District")}
          {sel("upazila", bn ? "উপজেলা" : "Upazila")}
          {sel("school", bn ? "স্কুল" : "School")}
          {sel("profession", bn ? "পেশা" : "Profession")}
          {sel("blood", bn ? "রক্তের গ্রুপ" : "Blood group")}
        </div>
        <div className="no-scrollbar mt-4 flex gap-1.5 overflow-x-auto pb-1">
          <button
            onClick={() => setLetter("")}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm font-semibold ${!letter ? "bg-brand-500/15 text-white" : "bg-white/[.04] text-white hover:bg-white/5"}`}
          >
            {bn ? "সব" : "All"}
          </button>
          {letters.map((L) => (
            <button
              key={L}
              onClick={() => setLetter(L === letter ? "" : L)}
              className={`grid size-9 shrink-0 place-items-center rounded-full text-sm font-semibold ${letter === L ? "bg-brand-500 text-white" : "bg-white/[.04] text-white hover:bg-white/5"}`}
            >
              {L}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <p className="text-soft">
          <span className="font-display text-2xl font-bold text-white">{num(list.length, lang)}</span> {bn ? `জন সদস্য (মোট ${num(members.length, lang)})` : `members (of ${members.length})`}
        </p>
        {(active > 0 || q) && (
          <button
            onClick={() => {
              setF(EMPTY);
              setQ("");
              setLetter("");
            }}
            className="flex items-center gap-1 text-sm font-semibold text-brand-300 hover:text-white"
          >
            <X className="size-4" /> {bn ? "ফিল্টার মুছুন" : "Clear filters"}
          </button>
        )}
      </div>

      {list.length ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {list.map((m) => (
            <MemberCard key={m.id} m={m} lang={lang} />
          ))}
        </div>
      ) : (
        <p className="mt-10 rounded-3xl bg-white/[.04] p-10 text-center text-soft">{bn ? "কোনো সদস্য পাওয়া যায়নি। অন্যভাবে খুঁজে দেখুন।" : "No members found. Try a different search."}</p>
      )}
    </div>
  );
}
