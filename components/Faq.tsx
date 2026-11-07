import { Plus } from "lucide-react";

export default function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-white/10 overflow-hidden rounded-3xl border border-white/10 bg-white/[.02]">
      {items.map((it, i) => (
        <details key={i} className="group px-5 py-1 sm:px-7 [&_summary::-webkit-details-marker]:hidden" open={i === 0}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[17px] font-semibold text-white">
            {it.q}
            <span className="grid size-8 shrink-0 place-items-center rounded-full border border-white/15 transition group-open:rotate-45 group-open:border-brand-400 group-open:bg-brand-500/20">
              <Plus className="size-4" />
            </span>
          </summary>
          <p className="pb-6 pr-10 text-soft">{it.a}</p>
        </details>
      ))}
    </div>
  );
}
