"use client";

import Link from "next/link";
import { useState } from "react";
import { Droplet } from "lucide-react";
import type { Member } from "@/lib/types";
import { href, num, t, type Lang } from "@/lib/i18n";

const GROUPS = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

export default function BloodDirectory({ members, lang }: { members: Member[]; lang: Lang }) {
  const bn = lang === "bn";
  const donors = members.filter((m) => m.bloodGroup && m.showBloodGroup);
  const [g, setG] = useState("");
  const [d, setD] = useState("");
  const districts = Array.from(new Set(donors.map((m) => t(m.district, lang)))).sort((a, b) => a.localeCompare(b, lang));
  const list = donors.filter((m) => (!g || m.bloodGroup === g) && (!d || t(m.district, lang) === d));
  const count = (x: string) => donors.filter((m) => m.bloodGroup === x).length;

  return (
    <div>
      <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
        {GROUPS.map((x) => (
          <button
            key={x}
            onClick={() => setG(g === x ? "" : x)}
            className={`rounded-2xl p-3 text-center transition ${g === x ? "bg-red-600 text-white shadow-lg shadow-black/30 shadow-red-600/30" : "bg-white/[.04] text-white ring-1 ring-white/10 hover:ring-rose-400/50"}`}
          >
            <Droplet className={`mx-auto size-5 ${g === x ? "fill-white" : "fill-rose-500/20 text-rose-400"}`} />
            <div className="mt-1 font-display text-xl font-bold">{x}</div>
            <div className={`text-xs ${g === x ? "text-white/80" : "text-soft"}`}>
              {num(count(x), lang)} {bn ? "জন" : ""}
            </div>
          </button>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <select
          value={d}
          onChange={(e) => setD(e.target.value)}
          className="rounded-xl border-0 bg-white/[.04] px-4 py-3 ring-1 ring-white/10 focus:ring-2 focus:ring-brand-400"
          aria-label={bn ? "জেলা" : "District"}
        >
          <option value="">{bn ? "সব জেলা" : "All districts"}</option>
          {districts.map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
        <p className="text-soft">
          {num(list.length, lang)} {bn ? "জন রক্তদাতা" : "donors"}
        </p>
      </div>
      <div className="mt-6 overflow-hidden rounded-3xl card">
        <table className="w-full text-left">
          <thead className="bg-brand-500/15 text-sm text-white">
            <tr>
              <th className="px-4 py-3 font-semibold sm:px-6">{bn ? "নাম" : "Name"}</th>
              <th className="px-4 py-3 font-semibold">{bn ? "গ্রুপ" : "Group"}</th>
              <th className="hidden px-4 py-3 font-semibold sm:table-cell">{bn ? "এলাকা" : "Area"}</th>
            </tr>
          </thead>
          <tbody>
            {list.map((m) => (
              <tr key={m.id} className="border-b border-white/10 last:border-0 hover:bg-cream">
                <td className="px-4 py-3 sm:px-6">
                  <Link href={href(lang, `/members/${m.id}`)} className="font-semibold text-white hover:text-white">
                    {t(m.name, lang)}
                  </Link>
                  <span className="block text-xs text-soft sm:hidden">
                    {t(m.upazila, lang)}, {t(m.district, lang)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-rose-500/15 px-2.5 py-1 text-sm font-bold text-rose-300">{m.bloodGroup}</span>
                </td>
                <td className="hidden px-4 py-3 text-soft sm:table-cell">
                  {t(m.upazila, lang)}, {t(m.district, lang)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!list.length && <p className="p-8 text-center text-soft">{bn ? "কোনো রক্তদাতা পাওয়া যায়নি।" : "No donors found."}</p>}
      </div>
    </div>
  );
}
