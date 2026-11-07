import { ExternalLink, Pin } from "lucide-react";
import { notices } from "@/content/news";
import { formatDate, t, ui } from "@/lib/i18n";
import { getLang, pageMeta, type LangParams } from "@/lib/page";
import { PageHero, Section } from "@/components/ui";

export async function generateMetadata({ params }: LangParams) {
  return pageMeta(await getLang(params), ui.nav.notices, "/notices");
}

export default async function NoticesPage({ params }: LangParams) {
  const lang = await getLang(params);
  const bn = lang === "bn";
  const list = notices.slice().sort((a, b) => Number(!!b.pinned) - Number(!!a.pinned) || b.date.localeCompare(a.date));
  return (
    <>
      <PageHero
        eyebrow={bn ? "ডিজিটাল নোটিশ বোর্ড" : "Digital notice board"}
        title={t(ui.nav.notices, lang)}
        subtitle={bn ? "গুরুত্বপূর্ণ ঘোষণা, কমিটির সভার নোটিশ এবং সদস্যদের জন্য বার্তা।" : "Important announcements, committee meeting notices and messages for members."}
      />
      <Section className="!pt-10">
        <div className="mx-auto max-w-4xl space-y-4">
          {list.map((n) => (
            <article key={n.id} className={`relative rounded-3xl p-6 ring-1 sm:p-8 ${n.pinned ? "bg-brand-500/15 text-white ring-brand-400/40" : "bg-white/[.04] ring-white/10"}`}>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                {n.pinned && (
                  <span className="flex items-center gap-1 font-semibold text-brand-200">
                    <Pin className="size-4" />
                    {bn ? "পিন করা" : "Pinned"}
                  </span>
                )}
                <span className={n.pinned ? "text-white/70" : "text-soft"}>{formatDate(n.date, lang)}</span>
                {n.important && <span className="rounded-full bg-red-600 px-2.5 py-0.5 text-xs font-semibold text-white">{bn ? "জরুরি" : "Important"}</span>}
              </div>
              <h2 className={`mt-3 font-display text-xl font-semibold sm:text-2xl ${n.pinned ? "text-brand-200" : "text-white"}`}>{t(n.title, lang)}</h2>
              <p className={`mt-2 text-[17px] ${n.pinned ? "text-white/85" : "text-soft"}`}>{t(n.body, lang)}</p>
              {n.link && (
                <a href={n.link} target="_blank" rel="noopener" className={`mt-4 inline-flex items-center gap-1.5 font-semibold ${n.pinned ? "text-brand-200" : "text-brand-300"}`}>
                  {bn ? "বিস্তারিত" : "Details"} <ExternalLink className="size-4" />
                </a>
              )}
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
