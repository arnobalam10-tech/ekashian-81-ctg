import type { Member } from "@/lib/types";
import { t, type Lang } from "@/lib/i18n";
import { site } from "@/content/site";
import { initials } from "@/lib/data";
import { Avatar, Ring } from "./ui";

/** Credit-card-ratio digital membership card. */
export default function MemberCardVisual({ m, lang }: { m: Member; lang: Lang }) {
  const bn = lang === "bn";
  return (
    <div className="print-area relative mx-auto aspect-[1.586/1] w-full max-w-[520px] overflow-hidden rounded-[1.75rem] bg-[radial-gradient(120%_120%_at_10%_0%,#6fd2ff,#1f6bff_40%,#3b3fc4_75%,#0a1020)] p-5 text-white shadow-2xl shadow-black/50 sm:p-7 [print-color-adjust:exact] [-webkit-print-color-adjust:exact]">
      <Ring className="absolute -right-16 -top-16 size-64 text-brand-400/20" />
      <div className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-cyan-400 via-brand-500 to-violet-500" />
      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-display text-lg font-bold tracking-wide text-brand-200 sm:text-xl">{bn ? "একাশিয়ান" : "EKASHIAN"}</p>
            <p className="text-[10px] text-white/70 sm:text-xs">{t(site.chapterName, lang)} · SSC 1981</p>
          </div>
          <span className="rounded-full bg-brand-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white sm:text-xs">{bn ? "সদস্য কার্ড" : "Member card"}</span>
        </div>
        <div className="mt-auto flex items-end gap-4">
          <div className="rounded-2xl bg-gradient-to-br from-brand-300 to-violet-500 p-[3px]">
            <div className="overflow-hidden rounded-[0.85rem]">
              <Avatar src={m.photo} name={t(m.name, lang)} initials={initials(m.name.en)} size={92} className="!rounded-none" />
            </div>
          </div>
          <div className="min-w-0 flex-1 pb-1">
            <p className="truncate font-display text-lg font-semibold leading-tight sm:text-2xl">{t(m.name, lang)}</p>
            <p className="mt-1 truncate text-[11px] text-white/75 sm:text-sm">{t(m.school, lang)}</p>
            <div className="mt-2 flex items-center gap-3 text-[11px] sm:text-sm">
              <span className="font-mono font-semibold tracking-wider text-brand-200">{m.id}</span>
              {m.bloodGroup && m.showBloodGroup && <span className="rounded bg-red-600/90 px-1.5 font-bold">{m.bloodGroup}</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
