import Image from "next/image";
import { convention } from "@/content/convention";
import { formatDate, t, type Lang } from "@/lib/i18n";

/** Festive invitation card (printable). */
export default function InvitationCard({ lang }: { lang: Lang }) {
  const bn = lang === "bn";
  return (
    <div className="print-area relative mx-auto w-full max-w-[560px] overflow-hidden rounded-[2rem] bg-ink-950 p-2 shadow-2xl shadow-black/40 [print-color-adjust:exact] [-webkit-print-color-adjust:exact]">
      <div className="relative overflow-hidden rounded-[1.6rem] border-2 border-brand-400/50 bg-[radial-gradient(120%_80%_at_50%_0%,#1f6bff_0%,#0d1428_55%,#04060d_100%)] px-6 py-10 text-center text-white sm:px-10">
        {/* corner ornaments */}
        {["left-3 top-3", "right-3 top-3 rotate-90", "right-3 bottom-3 rotate-180", "left-3 bottom-3 -rotate-90"].map((p) => (
          <svg key={p} viewBox="0 0 40 40" className={`absolute size-10 text-brand-300 ${p}`} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            <path d="M2 20V2h18M8 14V8h6" />
            <circle cx="2" cy="2" r="1.5" fill="currentColor" />
          </svg>
        ))}
        <div className="relative">
          <p className={`text-brand-200 ${bn ? "text-base font-semibold" : "text-sm tracking-[0.3em]"}`}>{bn ? "সাদর আমন্ত্রণ" : "YOU ARE INVITED"}</p>
          <div className="mx-auto mt-5 w-28 rounded-full bg-white/[.04] p-1.5 ring-2 ring-brand-400 sm:w-32">
            <Image src={convention.emblem} alt="" width={200} height={200} className="rounded-full" />
          </div>
          <h2 className="mt-5 font-display text-2xl font-bold leading-snug text-brand-200 sm:text-3xl">{t(convention.title, lang)}</h2>
          <p className="mt-2 font-display italic text-white/80">“{t(convention.tagline, lang)}”</p>
          <div className="hairline mx-auto my-6 w-2/3" />
          <p className="text-[15px] leading-relaxed text-white/85">
            {bn
              ? "প্রিয় বন্ধু, এসএসসি ১৯৮১ ব্যাচের বন্ধুদের এই মহামিলনমেলায় আপনাকে ও আপনার পরিবারকে সাদর আমন্ত্রণ।"
              : "Dear friend, you and your family are warmly invited to this grand reunion of the SSC Batch of 1981."}
          </p>
          <div className="mt-6 grid gap-2 text-sm">
            <p className="font-display text-xl font-semibold text-white">
              {formatDate(convention.date, lang)}, {t(convention.day, lang)}
            </p>
            <p className="text-brand-200">{t(convention.time, lang)}</p>
            <p className="text-white/85">{t(convention.venue, lang)}</p>
            <p className="text-xs text-white/60">{t(convention.address, lang)}</p>
          </div>
          <div className="hairline mx-auto my-6 w-2/3" />
          <p className="text-xs text-white/60">{bn ? "আয়োজনে" : "Organised by"}</p>
          <p className="mt-1 text-sm font-semibold text-brand-200">{t(convention.organizer, lang)}</p>
        </div>
      </div>
    </div>
  );
}
