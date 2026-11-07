import Image from "next/image";
import type { Lang } from "@/lib/i18n";

const SHOTS = [
  { src: "/images/ctg-college-red.jpg", bn: "চট্টগ্রাম কলেজ", en: "Chittagong College" },
  { src: "/images/hero-karnaphuli.jpg", bn: "কর্ণফুলী নদী", en: "Karnaphuli River" },
  { src: "/images/collegiate-school.jpg", bn: "কলেজিয়েট স্কুল", en: "Collegiate School" },
  { src: "/images/crb.jpg", bn: "সিআরবি", en: "CRB" },
  { src: "/images/patenga-sunset.jpg", bn: "পতেঙ্গা", en: "Patenga" },
  { src: "/images/court-building.jpg", bn: "পরীর পাহাড়", en: "Pori Pahar" },
];

function Shot({ i, lang, className = "", sizes, priority }: { i: number; lang: Lang; className?: string; sizes: string; priority?: boolean }) {
  const s = SHOTS[i];
  return (
    <figure className={`group relative overflow-hidden rounded-2xl ring-1 ring-white/15 ${className}`}>
      <Image src={s.src} alt={s[lang]} fill sizes={sizes} priority={priority} className="object-cover saturate-[.85] transition duration-700 group-hover:scale-105 group-hover:saturate-100" />
      {/* brand duotone wash */}
      <div className="absolute inset-0 bg-gradient-to-tr from-brand-700/45 via-transparent to-violet-500/25 mix-blend-color" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent" />
      <figcaption className="absolute bottom-2.5 left-2.5 rounded-full bg-black/40 px-2.5 py-0.5 font-mono text-[10.5px] uppercase tracking-wider text-white backdrop-blur">{s[lang]}</figcaption>
    </figure>
  );
}

/** Six-photo Chattogram collage — only used in the home hero. */
export default function HeroCollage({ lang }: { lang: Lang }) {
  return (
    <div className="relative">
      <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-brand-500/40 via-violet-500/20 to-cyan-400/20 blur-2xl" />
      <div className="glass relative rounded-[2rem] p-2.5 shadow-2xl shadow-black/60">
        {/* window chrome — SaaS app frame */}
        <div className="flex items-center gap-1.5 px-2 pb-2.5 pt-1">
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="ml-3 truncate rounded-full bg-white/5 px-3 py-0.5 font-mono text-[10.5px] text-soft">{lang === "bn" ? "আমাদের চট্টগ্রাম · ১৯৮১" : "our-chattogram / 1981"}</span>
        </div>
        <div className="grid h-[340px] grid-cols-6 grid-rows-6 gap-2 sm:h-[460px] lg:h-[500px]">
          <Shot i={0} lang={lang} className="col-start-1 col-end-5 row-start-1 row-end-5" sizes="(min-width:1024px) 32vw, 66vw" priority />
          <Shot i={2} lang={lang} className="col-start-5 col-end-7 row-start-1 row-end-3" sizes="16vw" />
          <Shot i={3} lang={lang} className="col-start-5 col-end-7 row-start-3 row-end-5" sizes="16vw" />
          <Shot i={1} lang={lang} className="col-start-1 col-end-3 row-start-5 row-end-7" sizes="16vw" />
          <Shot i={5} lang={lang} className="col-start-3 col-end-5 row-start-5 row-end-7" sizes="16vw" />
          <Shot i={4} lang={lang} className="col-start-5 col-end-7 row-start-5 row-end-7" sizes="16vw" />
        </div>
      </div>
    </div>
  );
}
