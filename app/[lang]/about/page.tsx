import { Eye, Flag, HandHeart, Landmark, Rocket, Sparkles, Target } from "lucide-react";
import { about } from "@/content/about";
import { site } from "@/content/site";
import { href, num, t, ui } from "@/lib/i18n";
import { getLang, pageMeta, type LangParams } from "@/lib/page";
import { ButtonLink, ComingSoon, PageHero, Pill, Section, SectionHead } from "@/components/ui";

export async function generateMetadata({ params }: LangParams) {
  return pageMeta(await getLang(params), ui.nav.about, "/about", site.intro);
}

export default async function AboutPage({ params }: LangParams) {
  const lang = await getLang(params);
  const bn = lang === "bn";
  const text = (v: { bn: string; en: string }) => (t(v, lang) ? <p className="mt-5 text-lg leading-relaxed text-soft">{t(v, lang)}</p> : <ComingSoon lang={lang} className="mt-5" />);

  return (
    <>
      <PageHero eyebrow={bn ? "আমাদের কথা" : "About us"} title={bn ? "একাশিয়ান — বন্ধুত্বের অটুট বন্ধন" : "Ekashian — a lasting bond of friendship"} subtitle={t(site.intro, lang)} />

      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="card grain p-8 sm:p-10">
            <Pill>{bn ? "ইতিহাস ও পটভূমি" : "History & background"}</Pill>
            <h2 className="mt-5 text-3xl font-bold text-white sm:text-4xl">{bn ? "১৯৮১ থেকে আজ" : "From 1981 to today"}</h2>
            {text(about.history)}
            <h3 className="mt-10 flex items-center gap-3 text-2xl font-semibold text-white">
              <Flag className="size-6 text-brand-300" />
              {bn ? "গঠন" : "Formation"}
            </h3>
            {text(about.formation)}
          </div>
          <div className="card grain relative overflow-hidden p-8 sm:p-10">
            <div aria-hidden className="mesh-soft opacity-80" />
            <div className="relative">
              <Landmark className="size-10 text-brand-200" />
              <h3 className="mt-4 text-2xl font-semibold text-white">{t(site.chapterName, lang)}</h3>
              {text(about.chapterIntro)}
              <div className="mt-8 grid grid-cols-2 gap-3 border-t border-white/10 pt-6 text-center">
                <div>
                  <div className="font-display text-3xl font-bold text-white">{num(site.stats.districts, lang)}</div>
                  <div className="text-xs text-brand-100">{bn ? "জেলা · চট্টগ্রাম বিভাগ" : "Districts · Chattogram Division"}</div>
                </div>
                <div>
                  <div className="font-display text-3xl font-bold text-white">{num(1981, lang)}</div>
                  <div className="text-xs text-brand-100">{bn ? "এসএসসি ব্যাচ" : "SSC batch"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section glow className="!pt-0">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { icon: Eye, title: bn ? "রূপকল্প" : "Vision", body: t(site.vision, lang) },
            { icon: Target, title: bn ? "মিশন" : "Mission", body: t(site.mission, lang) },
          ].map((c) => (
            <div key={c.title} className="card p-8 sm:p-10">
              <span className="grid size-12 place-items-center rounded-2xl bg-brand-500/25 text-brand-100">
                <c.icon className="size-6" />
              </span>
              <h3 className="mt-5 text-2xl font-semibold text-white">{c.title}</h3>
              <p className="mt-3 text-lg text-soft">{c.body}</p>
            </div>
          ))}
          <div className="card p-8 sm:p-10 md:col-span-2">
            <h3 className="flex items-center gap-3 text-2xl font-semibold text-white">
              <HandHeart className="size-6 text-brand-300" />
              {bn ? "আমাদের উদ্দেশ্য" : "Our objectives"}
            </h3>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {site.objectives.map((o, i) => (
                <li key={o.en} className="flex gap-4 rounded-2xl bg-white/[.06] p-4">
                  <span className="font-display text-2xl font-bold text-brand-300">{num(String(i + 1).padStart(2, "0"), lang)}</span>
                  <span className="text-white/90">{t(o, lang)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section className="!pt-0">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="card p-8 sm:p-10">
            <SectionHead eyebrow={bn ? "কার্যক্রম ও অর্জন" : "Activities & achievements"} title={bn ? "আমাদের পথচলা" : "Our journey"} />
            {about.achievements.length ? (
              <ol className="relative mt-10 border-l border-brand-400/40 pl-8">
                {about.achievements.map((a) => (
                  <li key={a.year} className="relative pb-8 last:pb-0">
                    <span className="absolute -left-[2.6rem] grid size-8 place-items-center rounded-full bg-brand-500 ring-4 ring-ink-950">
                      <Sparkles className="size-4 text-white" />
                    </span>
                    <span className="font-display text-2xl font-bold text-brand-200">{num(a.year, lang)}</span>
                    <p className="mt-1 text-lg text-white">{t(a.text, lang)}</p>
                  </li>
                ))}
              </ol>
            ) : (
              <ComingSoon lang={lang} className="mt-8" />
            )}
          </div>
          <div className="card p-8 sm:p-10">
            <SectionHead eyebrow={bn ? "সাংগঠনিক কাঠামো" : "Structure"} title={bn ? "সংগঠনের কাঠামো" : "Organisational structure"} />
            {about.structure.length ? (
              <div className="mt-8 space-y-3">
                {about.structure.map((s, i) => (
                  <div key={s.en} className="flex items-center gap-4 rounded-2xl bg-white/[.06] p-4">
                    <span className="grid size-10 place-items-center rounded-xl bg-brand-500/25 font-display font-bold text-brand-100">{num(i + 1, lang)}</span>
                    <span className="font-semibold text-white">{t(s, lang)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <ComingSoon lang={lang} className="mt-8" />
            )}
            <div className="mt-8">
              <ButtonLink href={href(lang, "/committee")} variant="outline">
                {t(ui.nav.committee, lang)}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      <Section glow className="!pt-0">
        <SectionHead eyebrow={bn ? "ভবিষ্যৎ পরিকল্পনা" : "Future plans"} title={bn ? "সামনের দিনগুলোতে" : "In the years ahead"} />
        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {about.futurePlans.map((p) => (
            <li key={p.en} className="card flex gap-4 p-5">
              <Rocket className="mt-0.5 size-5 shrink-0 text-brand-300" />
              <span className="text-white">{t(p, lang)}</span>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
