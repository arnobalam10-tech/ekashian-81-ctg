import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

/** Smooth grainy gradient backdrop — the brand atmosphere (film grain comes from the global overlay). */
export function Atmosphere({ variant = "hero" }: { variant?: "hero" | "soft" | "violet"; fluted?: boolean }) {
  return <div aria-hidden className={variant === "hero" ? "mesh-hero" : variant === "violet" ? "mesh-violet" : "mesh-soft"} />;
}

/** Inner-page hero */
export function PageHero({ eyebrow, title, subtitle, children }: { eyebrow?: string; title: string; subtitle?: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden pb-16 pt-40 sm:pb-24 sm:pt-48">
      <Atmosphere variant="hero" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl animate-fade-up">
          {eyebrow && <Pill dark>{eyebrow}</Pill>}
          <h1 className="text-grad mt-5 text-balance text-4xl font-bold sm:text-6xl lg:text-7xl">{title}</h1>
          {subtitle && <p className="mt-6 max-w-2xl text-lg text-soft">{subtitle}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}

export function Pill({ children }: { children: ReactNode; dark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[.04] px-3.5 py-1.5 backdrop-blur">
      <span className="size-1.5 rounded-full bg-brand-400 shadow-[0_0_10px_2px_rgba(77,139,255,.9)]" />
      <span className="label !text-brand-200">{children}</span>
    </span>
  );
}

export function SectionHead({ eyebrow, title, intro, align = "left", action }: { eyebrow?: string; title: string; intro?: string; align?: "left" | "center"; action?: ReactNode }) {
  return (
    <div className={`flex flex-col gap-6 ${align === "center" ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"}`}>
      <div className="max-w-3xl">
        {eyebrow && <Pill>{eyebrow}</Pill>}
        <h2 className="mt-5 text-balance text-3xl font-bold text-white sm:text-5xl">{title}</h2>
        {intro && <p className={`mt-4 text-lg text-soft ${align === "center" ? "mx-auto max-w-2xl" : ""}`}>{intro}</p>}
      </div>
      {action}
    </div>
  );
}

export function Section({ children, className = "", id, glow = false }: { children: ReactNode; className?: string; id?: string; glow?: boolean }) {
  return (
    <section id={id} className={`relative py-20 sm:py-28 ${className}`}>
      {glow && <div aria-hidden className="mesh-soft" />}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "gold" | "outline" | "ghost-light" | "light";
  external?: boolean;
  className?: string;
}) {
  const v = variant === "primary" ? "btn-primary" : variant === "light" || variant === "gold" ? "btn-light" : "btn-ghost";
  const cls = `btn ${v} ${className}`;
  const inner = (
    <>
      {children}
      <ArrowUpRight className="size-4" />
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener" className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

/** Portrait or initials avatar */
export function Avatar({ src, name, initials, size = 96, className = "" }: { src?: string; name: string; initials: string; size?: number; className?: string }) {
  return src ? (
    <Image src={src} alt={name} width={size * 2} height={size * 2} style={{ width: size, height: size }} className={`shrink-0 rounded-full object-cover object-top ${className}`} />
  ) : (
    <div
      aria-label={name}
      style={{ width: size, height: size, fontSize: size * 0.34 }}
      className={`relative grid shrink-0 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-brand-500 via-brand-700 to-ink-800 font-display font-bold text-white ring-1 ring-white/15 ${className}`}
    >
      <span className="relative">{initials}</span>
    </div>
  );
}

/** Decorative orbit ring */
export function Ring({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" stroke="currentColor" aria-hidden>
      <circle cx="100" cy="100" r="98" strokeWidth=".6" />
      <circle cx="100" cy="100" r="76" strokeWidth=".6" strokeDasharray="1 5" />
      <circle cx="100" cy="100" r="54" strokeWidth=".6" />
    </svg>
  );
}

/** "Information coming soon" badge used wherever real data is not yet available */
export function ComingSoon({ lang, className = "" }: { lang: "bn" | "en"; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border border-dashed border-brand-300/50 bg-brand-500/10 px-3.5 py-1.5 text-sm text-brand-100 ${className}`}>
      <span className="size-1.5 animate-pulse rounded-full bg-brand-300" />
      {lang === "bn" ? "তথ্য শীঘ্রই আসছে" : "Information coming soon"}
    </span>
  );
}

/** Full-width "no data yet" panel */
export function SoonPanel({ lang, title, text, children }: { lang: "bn" | "en"; title?: string; text?: string; children?: ReactNode }) {
  return (
    <div className="card grain relative overflow-hidden px-6 py-16 text-center sm:px-12">
      <div aria-hidden className="mesh-soft" />
      <div className="relative mx-auto max-w-xl">
        <ComingSoon lang={lang} />
        <p className="mt-6 font-display text-2xl font-semibold text-white sm:text-3xl">{title ?? (lang === "bn" ? "সদস্যদের তথ্য শীঘ্রই যুক্ত হবে" : "Member information will be added soon")}</p>
        {text && <p className="mt-3 text-soft">{text}</p>}
        {children && <div className="mt-8 flex flex-wrap justify-center gap-3">{children}</div>}
      </div>
    </div>
  );
}

export function SampleNotice({ children }: { children: ReactNode }) {
  return <div className="mb-8 rounded-2xl border border-dashed border-brand-400/40 bg-brand-500/[.07] px-5 py-3 text-sm text-brand-200">{children}</div>;
}

export function EmptyState({ title, text }: { title: string; text?: string }) {
  return (
    <div className="card relative overflow-hidden px-6 py-16 text-center">
      <p className="relative font-display text-xl text-white">{title}</p>
      {text && <p className="relative mt-2 text-soft">{text}</p>}
    </div>
  );
}

/** Big stat number */
export function Stat({ value, label }: { value: ReactNode; label: string }) {
  return (
    <div>
      <div className="text-grad font-display text-4xl font-bold sm:text-5xl">{value}</div>
      <div className="mt-1 text-sm text-soft">{label}</div>
    </div>
  );
}

export function IconBox({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`relative grid size-12 shrink-0 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-brand-500/30 to-violet-500/10 text-brand-200 ring-1 ring-white/10 ${className}`}
    >
      {children}
    </span>
  );
}
