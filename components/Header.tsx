"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { href, t, ui, type Lang } from "@/lib/i18n";
import { convention } from "@/content/convention";
import Logo from "./Logo";

const PRIMARY = [
  ["home", "/"],
  ["about", "/about"],
  ["committee", "/committee"],
  ["members", "/members"],
  ["events", "/events"],
  ["convention", "/convention-2027"],
] as const;
const MORE = [
  ["gallery", "/gallery"],
  ["news", "/news"],
  ["notices", "/notices"],
  ["birthdays", "/birthdays"],
  ["blood", "/blood-groups"],
  ["membership", "/membership"],
  ["contact", "/contact"],
] as const;

export default function Header({ lang }: { lang: Lang }) {
  const pathname = usePathname() || `/${lang}`;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [more, setMore] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    setOpen(false);
    setMore(false);
  }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const other: Lang = lang === "bn" ? "en" : "bn";
  const switchHref = pathname.replace(/^\/(bn|en)(?=\/|$)/, `/${other}`);
  const rel = pathname.replace(/^\/(bn|en)/, "") || "/";
  const isActive = (p: string) => (p === "/" ? rel === "/" : rel.startsWith(p));
  const bn = lang === "bn";

  return (
    <header className={`fixed inset-x-0 z-50 transition-all duration-300 ${scrolled ? "top-2" : "top-12"}`}>
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div
          className={`flex h-16 items-center justify-between gap-3 rounded-2xl px-3 transition-all duration-300 sm:px-4 ${scrolled ? "glass shadow-2xl shadow-black/40" : "border border-transparent"}`}
        >
          <Logo lang={lang} />

          <nav className="hidden items-center gap-0.5 rounded-full border border-white/10 bg-white/[.03] p-1 backdrop-blur xl:flex" aria-label="Main">
            {PRIMARY.map(([k, p]) => (
              <Link key={k} href={href(lang, p)} className={`rounded-full px-3.5 py-1.5 text-[14px] font-medium transition ${isActive(p) ? "bg-white text-ink-950" : "text-soft hover:text-white"}`}>
                {t(ui.nav[k], lang)}
              </Link>
            ))}
            <div className="relative" onMouseLeave={() => setMore(false)}>
              <button
                onClick={() => setMore((v) => !v)}
                onMouseEnter={() => setMore(true)}
                className="flex items-center gap-1 rounded-full px-3.5 py-1.5 text-[14px] font-medium text-soft hover:text-white"
                aria-expanded={more}
              >
                {t(ui.nav.more, lang)} <ChevronDown className={`size-4 transition ${more ? "rotate-180" : ""}`} />
              </button>
              {more && (
                <div className="absolute right-0 top-full pt-3">
                  <div className="glass w-60 rounded-2xl p-1.5 shadow-2xl shadow-black/60">
                    {MORE.map(([k, p]) => (
                      <Link key={k} href={href(lang, p)} className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-[14px] text-soft hover:bg-white/5 hover:text-white">
                        {t(ui.nav[k], lang)} <ArrowUpRight className="size-3.5 opacity-40" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={switchHref}
              hrefLang={other}
              className="grid h-9 min-w-9 place-items-center rounded-full border border-white/15 px-2.5 text-[13px] font-semibold text-white transition hover:border-brand-400 hover:bg-brand-500/15"
              aria-label={other === "en" ? "Switch to English" : "বাংলায় দেখুন"}
            >
              {other === "en" ? "EN" : "বাং"}
            </Link>
            <a href={convention.links.register} target="_blank" rel="noopener" className="btn btn-light hidden !px-4 !py-2 !text-[13.5px] md:inline-flex">
              {bn ? "রেজিস্ট্রেশন" : "Register"} <ArrowUpRight className="size-4" />
            </a>
            <button onClick={() => setOpen(true)} className="grid size-10 place-items-center rounded-full text-white hover:bg-white/10 xl:hidden" aria-label="Menu">
              <Menu className="size-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-50 xl:hidden ${open ? "" : "pointer-events-none"}`}>
        <div className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity ${open ? "opacity-100" : "opacity-0"}`} onClick={() => setOpen(false)} />
        <div
          className={`absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col border-l border-white/10 bg-ink-900 shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="aurora">
            <i className="-right-20 -top-20 size-72 bg-brand-500/40" />
          </div>
          <div className="relative flex items-center justify-between border-b border-white/10 px-5 py-4">
            <Logo lang={lang} />
            <button onClick={() => setOpen(false)} className="grid size-10 place-items-center rounded-full hover:bg-white/10" aria-label="Close">
              <X className="size-6" />
            </button>
          </div>
          <nav className="relative flex-1 overflow-y-auto px-3 py-4">
            {[...PRIMARY, ...MORE].map(([k, p]) => (
              <Link
                key={k}
                href={href(lang, p)}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-[17px] ${isActive(p) ? "bg-white/10 text-white" : "text-soft hover:bg-white/5 hover:text-white"}`}
              >
                {t(ui.nav[k], lang)}
                {isActive(p) && <span className="size-1.5 rounded-full bg-brand-400 shadow-[0_0_10px_2px_rgba(77,139,255,.8)]" />}
              </Link>
            ))}
          </nav>
          <div className="relative grid gap-2 border-t border-white/10 p-4">
            <a href={convention.links.register} target="_blank" rel="noopener" className="btn btn-primary w-full">
              {bn ? "মিলনমেলা ২০২৭ — রেজিস্ট্রেশন" : "Register — Milonmela 2027"}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
