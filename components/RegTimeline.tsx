"use client";

import { useEffect, useState } from "react";
import { formatDate, type Lang } from "@/lib/i18n";

/** Registration progress: opens → closes → event day, with a live "today" marker. */
export default function RegTimeline({ opens, closes, event, lang }: { opens: string; closes: string; event: string; lang: Lang }) {
  const bn = lang === "bn";
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => setNow(Date.now()), []);
  const a = new Date(opens).getTime(),
    b = new Date(closes).getTime(),
    c = new Date(event).getTime();
  const pos = (x: number) => Math.min(100, Math.max(0, ((x - a) / (c - a)) * 100));
  const p = now ? pos(now) : 0;
  const stops = [
    { at: 0, label: bn ? "রেজিস্ট্রেশন শুরু" : "Registration opens", date: opens },
    { at: pos(b), label: bn ? "শেষ তারিখ" : "Deadline", date: closes },
    { at: 100, label: bn ? "মিলনমেলা" : "Event day", date: event },
  ];
  return (
    <div className="pt-2">
      <div className="relative h-2 rounded-full bg-white/10">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-cyan-400 via-brand-500 to-violet-500 shadow-[0_0_20px_rgba(31,107,255,.8)] transition-all duration-1000"
          style={{ width: `${p}%` }}
        />
        {now && (
          <span className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ left: `${p}%` }}>
            <span className="block size-4 rounded-full border-2 border-white bg-brand-500 shadow-[0_0_14px_4px_rgba(77,139,255,.8)]" />
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold text-ink-950">{bn ? "আজ" : "Today"}</span>
          </span>
        )}
        {stops.map((s) => (
          <span key={s.label} className="absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70" style={{ left: `${s.at}%` }} />
        ))}
      </div>
      <div className="relative mt-4 h-12 text-xs">
        {stops.map((s, i) => (
          <div key={s.label} className={`absolute ${i === 0 ? "left-0" : i === 2 ? "right-0 text-right" : "-translate-x-1/2 text-center"}`} style={i === 1 ? { left: `${s.at}%` } : undefined}>
            <p className="font-semibold text-white">{formatDate(s.date, lang, { year: false })}</p>
            <p className="text-dim">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
