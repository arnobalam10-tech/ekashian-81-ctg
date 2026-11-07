import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin, Phone } from "lucide-react";
import type { CommitteeMember, EventItem, Member, NewsItem } from "@/lib/types";
import { formatDate, href, num, t, type Lang } from "@/lib/i18n";
import { CATEGORY_LABEL } from "@/content/events";
import { NEWS_KIND_LABEL } from "@/content/news";
import { ROLE_LABEL } from "@/content/committee";
import { initials } from "@/lib/data";
import { Avatar } from "./ui";

function DateBadge({ iso, lang, hot = false }: { iso: string; lang: Lang; hot?: boolean }) {
  const [y, m, d] = iso.split("-").map(Number);
  const months =
    lang === "bn"
      ? ["জানু", "ফেব্রু", "মার্চ", "এপ্রি", "মে", "জুন", "জুলা", "আগ", "সেপ্টে", "অক্টো", "নভে", "ডিসে"]
      : ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  return (
    <div
      className={`grid w-16 shrink-0 place-items-center rounded-2xl py-2.5 text-center ring-1 ${hot ? "bg-brand-500 text-white ring-brand-300/50 shadow-[0_10px_30px_-8px_rgba(31,107,255,.9)]" : "bg-white/[.04] text-white ring-white/10"}`}
    >
      <span className="font-display text-2xl font-bold leading-none">{num(d, lang)}</span>
      <span className={`mt-1 text-[11px] font-semibold ${hot ? "text-white/85" : "text-brand-300"}`}>{months[m - 1]}</span>
      <span className="text-[10px] opacity-60">{num(y, lang)}</span>
    </div>
  );
}

export function EventCard({ e, lang }: { e: EventItem; lang: Lang }) {
  const to = e.category === "convention" ? href(lang, "/convention-2027") : href(lang, `/events/${e.slug}`);
  return (
    <Link href={to} className="card card-hover group flex gap-5 p-5">
      <DateBadge iso={e.date} lang={lang} hot={e.featured} />
      <div className="min-w-0 flex-1">
        <span className="label">{t(CATEGORY_LABEL[e.category], lang)}</span>
        <h3 className="mt-1.5 text-lg font-semibold leading-snug text-white">{t(e.title, lang)}</h3>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-soft">
          <MapPin className="size-4 shrink-0 text-brand-400" />
          {t(e.venue, lang)}
        </p>
      </div>
      <ArrowUpRight className="size-5 shrink-0 text-white/25 transition group-hover:rotate-45 group-hover:text-brand-300" />
    </Link>
  );
}

export function NewsCard({ n, lang }: { n: NewsItem; lang: Lang }) {
  return (
    <Link href={href(lang, `/news/${n.slug}`)} className="card card-hover group flex h-full flex-col p-6">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-brand-500/15 px-3 py-1 text-xs font-semibold text-brand-200 ring-1 ring-brand-400/30">{t(NEWS_KIND_LABEL[n.kind], lang)}</span>
        <span className="flex items-center gap-1.5 text-sm text-dim">
          <CalendarDays className="size-4" />
          {formatDate(n.date, lang)}
        </span>
      </div>
      <h3 className="mt-5 text-xl font-semibold leading-snug text-white">{t(n.title, lang)}</h3>
      <p className="mt-3 line-clamp-3 flex-1 text-soft">{t(n.summary, lang)}</p>
      <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand-300 group-hover:text-white">
        {lang === "bn" ? "আরও পড়ুন" : "Read more"} <ArrowUpRight className="size-4" />
      </span>
    </Link>
  );
}

export function CommitteeCard({ c, lang, featured = false }: { c: CommitteeMember; lang: Lang; featured?: boolean }) {
  const role = c.title ? t(c.title, lang) : t(ROLE_LABEL[c.role], lang);
  return (
    <div className={`card card-hover flex h-full flex-col items-center p-6 text-center ${featured ? "ring-grad" : ""}`}>
      <div className="rounded-full bg-gradient-to-br from-brand-300 via-brand-500 to-violet-500 p-[2px]">
        <Avatar src={c.photo} name={t(c.name, lang)} initials={initials(c.name.en)} size={featured ? 120 : 96} className="ring-4 ring-ink-900" />
      </div>
      <p className="label mt-5">{role}</p>
      <h3 className="mt-1.5 text-lg font-semibold text-white">{t(c.name, lang)}</h3>
      {c.intro && <p className="mt-2 text-sm text-soft">{t(c.intro, lang)}</p>}
      {c.phone && c.showPhone && (
        <a href={`tel:${c.phone.replace(/[^+\d]/g, "")}`} className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand-300 hover:text-white">
          <Phone className="size-3.5" /> {num(c.phone, lang)}
        </a>
      )}
    </div>
  );
}

export function MemberCard({ m, lang }: { m: Member; lang: Lang }) {
  return (
    <Link href={href(lang, `/members/${m.id}`)} className="card card-hover group flex items-center gap-4 p-4">
      <Avatar src={m.photo} name={t(m.name, lang)} initials={initials(m.name.en)} size={64} />
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-[17px] font-semibold text-white">{t(m.name, lang)}</h3>
        <p className="truncate text-sm text-soft">{t(m.school, lang)}</p>
        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
          <span className="font-mono text-brand-300">{m.id}</span>
          <span className="text-dim">
            {t(m.upazila, lang)}, {t(m.district, lang)}
          </span>
          {m.bloodGroup && m.showBloodGroup && <span className="rounded-full bg-rose-500/15 px-2 py-0.5 font-semibold text-rose-300 ring-1 ring-rose-400/30">{m.bloodGroup}</span>}
        </div>
      </div>
      <ArrowUpRight className="size-4 shrink-0 text-white/20 transition group-hover:text-brand-300" />
    </Link>
  );
}

/** Real event admin card with photo + call/email */
export function AdminCard({ a, lang }: { a: { name: { bn: string; en: string }; role: { bn: string; en: string }; phone: string; email: string; photo: string }; lang: Lang }) {
  return (
    <div className="card card-hover group overflow-hidden p-2">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.1rem]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={a.photo} alt={t(a.name, lang)} className="size-full object-cover object-top transition duration-700 group-hover:scale-105" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-black/40 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-white backdrop-blur">{t(a.role, lang)}</span>
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="text-xl font-semibold text-white">{t(a.name, lang)}</p>
          <p className="text-sm text-brand-200">{lang === "bn" ? "মিলনমেলা ২০২৭ · ইভেন্ট অ্যাডমিন" : "Milonmela 2027 · Event admin"}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 p-2 pt-3">
        <a href={`tel:${a.phone.replace(/[^+\d]/g, "")}`} className="btn btn-ghost !px-3 !py-2.5 !text-[13px]">
          <Phone className="size-4" />
          {lang === "bn" ? "কল" : "Call"}
        </a>
        <a href={`mailto:${a.email}`} className="btn btn-ghost !px-3 !py-2.5 !text-[13px]">
          {lang === "bn" ? "ইমেইল" : "Email"}
        </a>
      </div>
      <p className="px-3 pb-3 text-center font-mono text-[12px] text-dim">{num(a.phone, lang)}</p>
    </div>
  );
}
