import { School } from "lucide-react";
import { formatDate, href, num, type Lang } from "@/lib/i18n";
import { registeredAsOf, registeredBySchool, registeredCount, registeredSchoolCount } from "@/content/registered";
import { ButtonLink, Section, SectionHead } from "./ui";
import { site } from "@/content/site";

/** Home page: the full registered-friends list, grouped by school. */
export default function RegisteredShowcase({ lang }: { lang: Lang }) {
  const bn = lang === "bn";
  return (
    <Section glow id="registered">
      <SectionHead
        eyebrow={bn ? "নিবন্ধিত বন্ধুরা" : "Registered friends"}
        title={bn ? `${num(registeredCount, lang)} জন একাশিয়ান ইতিমধ্যে নিবন্ধিত` : `${registeredCount} Ekashians have already registered`}
        intro={
          bn
            ? `${num(registeredSchoolCount, lang)}টি স্কুলের বন্ধুরা · ${formatDate(registeredAsOf, lang)} রাত ৯টা পর্যন্ত। প্রতি সপ্তাহে তালিকা হালনাগাদ হয়।`
            : `Friends from ${registeredSchoolCount} schools · as of 9 PM, ${formatDate(registeredAsOf, lang)}. Updated every week. Names are shown as published, in Bengali.`
        }
        action={
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={site.links.apply} external variant="gold">
              {bn ? "আপনিও নিবন্ধন করুন" : "Register yours"}
            </ButtonLink>
            <ButtonLink href={href(lang, "/members")} variant="outline">
              {bn ? "খুঁজুন ও বিস্তারিত" : "Search & details"}
            </ButtonLink>
          </div>
        }
      />
      <div className="mt-12 gap-5 [column-fill:_balance] md:columns-2 xl:columns-3">
        {registeredBySchool.map((g) => (
          <section key={g.school} className="card mb-5 break-inside-avoid p-5">
            <header className="flex items-start gap-3">
              <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl bg-brand-500/15 text-brand-200 ring-1 ring-brand-400/30">
                <School className="size-4" />
              </span>
              <h3 className="min-w-0 flex-1 text-base font-semibold leading-snug text-white">{g.school}</h3>
              <span className="shrink-0 rounded-full bg-brand-500/15 px-2.5 py-0.5 text-sm font-semibold text-brand-200 ring-1 ring-brand-400/30">{num(g.names.length, lang)}</span>
            </header>
            <ul className="mt-3 space-y-1 border-t border-white/10 pt-3">
              {g.names.map((n) => (
                <li key={n} className="flex items-center gap-2.5 text-[16px] text-white/90">
                  <span className="size-1.5 shrink-0 rounded-full bg-brand-400" />
                  {n}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Section>
  );
}
