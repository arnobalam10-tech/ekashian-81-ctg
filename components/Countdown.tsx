"use client";

import { useEffect, useState } from "react";
import { num, t, ui, type Lang } from "@/lib/i18n";

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  return { d: Math.floor(ms / 86400000), h: Math.floor((ms / 3600000) % 24), m: Math.floor((ms / 60000) % 60), s: Math.floor((ms / 1000) % 60), done: ms === 0 };
}

export default function Countdown({ to, lang, size = "lg" }: { to: string; lang: Lang; size?: "sm" | "lg" }) {
  const target = new Date(to).getTime();
  const [v, setV] = useState<ReturnType<typeof diff> | null>(null);
  useEffect(() => {
    setV(diff(target));
    const id = setInterval(() => setV(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (v?.done) return <p className="font-display text-2xl text-brand-200">{lang === "bn" ? "অনুষ্ঠান সম্পন্ন হয়েছে — ধন্যবাদ সবাইকে!" : "The event has concluded — thank you all!"}</p>;
  const cells = [
    [v?.d, ui.days],
    [v?.h, ui.hours],
    [v?.m, ui.minutes],
    [v?.s, ui.seconds],
  ] as const;
  const big = size === "lg";
  return (
    <div className={`grid grid-cols-4 ${big ? "gap-2.5 sm:gap-3" : "gap-2"}`} role="timer" aria-live="off">
      {cells.map(([n, label], i) => (
        <div key={i} className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/[.04] text-center backdrop-blur ${big ? "px-1 py-4 sm:py-5" : "px-1 py-2.5"}`}>
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-300/60 to-transparent" />
          <div className={`font-display font-bold tabular-nums text-white ${big ? "text-3xl sm:text-5xl" : "text-xl sm:text-2xl"}`}>{v ? num(String(n).padStart(2, "0"), lang) : "--"}</div>
          <div className={`mt-1 text-brand-300 ${big ? "text-xs sm:text-sm" : "text-[11px]"}`}>{t(label, lang)}</div>
        </div>
      ))}
    </div>
  );
}
