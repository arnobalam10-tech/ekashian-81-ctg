import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { convention } from "@/content/convention";
import { formatDate, href, t, type Lang } from "@/lib/i18n";

export default function ConventionStrip({ lang }: { lang: Lang }) {
  const regOpen = new Date().toISOString().slice(0, 10) <= convention.registration.closes;
  const bn = lang === "bn";
  return (
    <Link
      href={href(lang, "/convention-2027")}
      className="no-print relative z-[60] flex h-9 items-center justify-center gap-2 overflow-hidden border-b border-white/10 bg-gradient-to-r from-brand-700 via-brand-500 to-violet-500 px-4 text-center text-[13px] font-medium text-white"
    >
      <span className="relative hidden rounded-full bg-white/20 px-2 py-0.5 text-[11px] font-semibold sm:inline">{bn ? "নতুন" : "NEW"}</span>
      <span className="relative truncate">
        {t(convention.title, lang)} · {formatDate(convention.date, lang)}
        {regOpen && <span className="hidden sm:inline"> · {bn ? "রেজিস্ট্রেশন চলছে" : "Registration open"}</span>}
      </span>
      <ArrowRight className="relative size-4 shrink-0" />
    </Link>
  );
}
