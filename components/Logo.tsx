import Link from "next/link";
import { href, t, ui, type Lang } from "@/lib/i18n";

const NOISE =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

/** Grainy gradient "81" mark */
export function LogoMark({ lang, className = "size-10" }: { lang: Lang; className?: string }) {
  return (
    <span className={`relative grid shrink-0 place-items-center overflow-hidden rounded-xl shadow-[0_8px_32px_-6px_rgba(31,107,255,.9),0_0_0_1px_rgba(198,215,255,.25)_inset] ${className}`}>
      {/* layered gradient: cyan glow top-left, electric blue body, violet + ink bottom-right */}
      <span className="absolute inset-0 bg-[radial-gradient(120%_90%_at_15%_10%,#6fd2ff_0%,#1f6bff_38%,#3b3fc4_68%,#0a1020_100%)]" />
      <span className="absolute -right-1/3 -top-1/3 size-full rounded-full bg-[#8a84ff] opacity-60 blur-md" />
      {/* heavy grain */}
      <span className="absolute inset-0 opacity-70 mix-blend-overlay" style={{ backgroundImage: NOISE, backgroundSize: "60px 60px" }} />
      <span className="absolute inset-0 opacity-25" style={{ backgroundImage: NOISE, backgroundSize: "40px 40px" }} />
      {/* gloss */}
      <span className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent" />
      <span className="relative font-display text-[15px] font-extrabold text-white drop-shadow-[0_1px_6px_rgba(0,0,0,.45)]">{lang === "bn" ? "৮১" : "81"}</span>
    </span>
  );
}

export default function Logo({ lang }: { lang: Lang }) {
  return (
    <Link href={href(lang)} className="group flex items-center gap-3" aria-label={t(ui.orgName, lang)}>
      <LogoMark lang={lang} className="size-10 transition group-hover:scale-105" />
      <span className="leading-tight">
        <span className="block bg-gradient-to-r from-white via-brand-100 to-brand-300 bg-clip-text font-display text-[17px] font-bold tracking-tight text-transparent">{t(ui.orgName, lang)}</span>
        <span className="hidden text-[11px] text-soft sm:block">{t(ui.orgTag, lang)}</span>
      </span>
    </Link>
  );
}
