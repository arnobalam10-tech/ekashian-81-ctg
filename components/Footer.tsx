import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/content/site";
import { convention } from "@/content/convention";
import { href, num, t, ui, type Lang } from "@/lib/i18n";
import Logo from "./Logo";

function Facebook({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M14 8h3V4h-3c-2.8 0-5 2.2-5 5v2H7v4h2v9h4v-9h3l1-4h-4V9c0-.6.4-1 1-1z" />
    </svg>
  );
}
function Youtube({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.7 15.1V8.9l5.8 3.1-5.8 3.1z" />
    </svg>
  );
}

export default function Footer({ lang }: { lang: Lang }) {
  const bn = lang === "bn";
  const cols = [
    {
      title: bn ? "সংগঠন" : "Organisation",
      links: [
        ["about", "/about"],
        ["committee", "/committee"],
        ["membership", "/membership"],
        ["contact", "/contact"],
      ],
    },
    {
      title: bn ? "সদস্য" : "Members",
      links: [
        ["members", "/members"],
        ["birthdays", "/birthdays"],
        ["blood", "/blood-groups"],
        ["notices", "/notices"],
      ],
    },
    {
      title: bn ? "অনুষ্ঠান" : "Events",
      links: [
        ["convention", "/convention-2027"],
        ["events", "/events"],
        ["gallery", "/gallery"],
        ["news", "/news"],
      ],
    },
  ] as const;
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink-950">
      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Logo lang={lang} />
            <p className="mt-5 max-w-sm text-[15px] text-soft">
              {bn
                ? "বন্ধুত্ব, ঐক্য ও মর্যাদার চার দশক — এসএসসি ১৯৮১ ব্যাচের চট্টগ্রাম বিভাগীয় পরিবার।"
                : "Four decades of friendship, unity and dignity — the Chattogram family of the SSC Batch of 1981."}
            </p>
            <div className="mt-6 flex gap-2">
              {[
                [site.socials.facebook, Facebook, "Facebook"],
                [site.socials.youtube, Youtube, "YouTube"],
              ].map(([u, I, n]) =>
                u ? (
                  <a
                    key={n as string}
                    href={u as string}
                    target="_blank"
                    rel="noopener"
                    aria-label={n as string}
                    className="grid size-10 place-items-center rounded-full border border-white/10 text-soft transition hover:border-brand-400 hover:text-white"
                  >
                    {(() => {
                      const C = I as typeof Facebook;
                      return <C className="size-4" />;
                    })()}
                  </a>
                ) : null,
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {cols.map((c) => (
              <div key={c.title}>
                <p className="label">{c.title}</p>
                <ul className="mt-4 space-y-2.5 text-[15px]">
                  {c.links.map(([k, p]) => (
                    <li key={k}>
                      <Link href={href(lang, p)} className="text-soft transition hover:text-white">
                        {t(ui.nav[k], lang)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="col-span-2 sm:col-span-1">
              <p className="label">{t(ui.nav.contact, lang)}</p>
              <ul className="mt-4 space-y-2.5 text-[14px] text-soft">
                <li className="flex gap-2">
                  <MapPin className="mt-1 size-4 shrink-0 text-brand-400" />
                  {t(site.contact.address, lang) || (lang === "bn" ? "ঠিকানা শীঘ্রই আসছে" : "Address coming soon")}
                </li>
                {site.contact.phones.slice(0, 2).map((p) => (
                  <li key={p}>
                    <a href={`tel:${p.replace(/[^+\d]/g, "")}`} className="flex gap-2 hover:text-white">
                      <Phone className="mt-1 size-4 shrink-0 text-brand-400" />
                      {num(p, lang)}
                    </a>
                  </li>
                ))}
                <li>
                  <a href={`mailto:${site.contact.email}`} className="flex gap-2 break-all hover:text-white">
                    <Mail className="mt-1 size-4 shrink-0 text-brand-400" />
                    {site.contact.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 overflow-hidden">
          <p className="select-none whitespace-nowrap text-center font-display text-[17vw] font-extrabold leading-none tracking-tighter text-white/[.04] lg:text-[13rem]">EKASHIAN</p>
        </div>

        <div className="hairline" />
        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-center text-[13px] text-dim sm:flex-row sm:text-left">
          <p>
            © {num(new Date().getFullYear(), lang)} {t(site.name, lang)} · {t(site.chapterName, lang)}
          </p>
          <a href={convention.links.register} target="_blank" rel="noopener" className="inline-flex items-center gap-1 text-brand-300 hover:text-white">
            {bn ? "মিলনমেলা ২০২৭ রেজিস্ট্রেশন" : "Milonmela 2027 registration"} <ArrowUpRight className="size-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
