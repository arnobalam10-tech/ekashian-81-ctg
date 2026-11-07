"use client";

import { useState } from "react";
import type { EventCategory, EventItem } from "@/lib/types";
import { t, type Lang } from "@/lib/i18n";
import { CATEGORY_LABEL } from "@/content/events";
import { EventCard } from "./cards";

export default function EventsBrowser({ upcoming, past, lang }: { upcoming: EventItem[]; past: EventItem[]; lang: Lang }) {
  const bn = lang === "bn";
  const [cat, setCat] = useState<EventCategory | "">("");
  const cats = Array.from(new Set([...upcoming, ...past].map((e) => e.category)));
  const f = (l: EventItem[]) => (cat ? l.filter((e) => e.category === cat) : l);
  const U = f(upcoming),
    P = f(past);
  return (
    <div>
      <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setCat("")}
          className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold ${!cat ? "bg-brand-500/15 text-white" : "bg-white/[.04] text-white ring-1 ring-white/10"}`}
        >
          {bn ? "সব" : "All"}
        </button>
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold ${cat === c ? "bg-brand-500 text-white" : "bg-white/[.04] text-white ring-1 ring-white/10"}`}
          >
            {t(CATEGORY_LABEL[c], lang)}
          </button>
        ))}
      </div>
      <h2 className="mt-10 text-2xl font-bold text-white">{bn ? "আসন্ন অনুষ্ঠান" : "Upcoming"}</h2>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {U.length ? U.map((e) => <EventCard key={e.slug} e={e} lang={lang} />) : <p className="text-soft">{bn ? "এই বিভাগে কোনো আসন্ন অনুষ্ঠান নেই।" : "No upcoming events in this category."}</p>}
      </div>
      <h2 className="mt-14 text-2xl font-bold text-white">{bn ? "সম্পন্ন অনুষ্ঠান" : "Past events"}</h2>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {P.length ? P.map((e) => <EventCard key={e.slug} e={e} lang={lang} />) : <p className="text-soft">{bn ? "কোনো তথ্য নেই।" : "Nothing here yet."}</p>}
      </div>
    </div>
  );
}
