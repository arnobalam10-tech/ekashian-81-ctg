import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { news, NEWS_KIND_LABEL } from "@/content/news";
import { LANGS, formatDate, href, isLang, t, ui, type Lang } from "@/lib/i18n";
import { NewsCard } from "@/components/cards";
import { Pill } from "@/components/ui";

type P = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
  return LANGS.flatMap((lang) => news.map((n) => ({ lang, slug: n.slug })));
}

export async function generateMetadata({ params }: P) {
  const { lang, slug } = await params;
  const n = news.find((x) => x.slug === slug);
  const l = (isLang(lang) ? lang : "bn") as Lang;
  return n ? { title: t(n.title, l), description: t(n.summary, l) } : {};
}

export default async function NewsDetail({ params }: P) {
  const { lang: l, slug } = await params;
  const lang = (isLang(l) ? l : "bn") as Lang;
  const n = news.find((x) => x.slug === slug);
  if (!n) notFound();
  const more = news.filter((x) => x.slug !== slug).slice(0, 2);
  return (
    <>
      <section className="relative overflow-hidden bg-ink-950 pb-16 pt-40 text-white">
        <div aria-hidden className="mesh-hero" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
          <Link href={href(lang, "/news")} className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
            <ArrowLeft className="size-4" />
            {t(ui.nav.news, lang)}
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Pill dark>{t(NEWS_KIND_LABEL[n.kind], lang)}</Pill>
            <span className="flex items-center gap-2 text-sm text-white/70">
              <CalendarDays className="size-4" />
              {formatDate(n.date, lang)}
            </span>
          </div>
          <h1 className="mt-5 text-balance text-3xl font-bold sm:text-5xl">{t(n.title, lang)}</h1>
          {n.author && <p className="mt-4 text-lg text-white/80">— {t(n.author, lang)}</p>}
        </div>
      </section>
      <article className="px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-3xl">
          {n.cover && (
            <figure className="mb-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={n.cover} alt={t(n.title, lang)} className="mx-auto h-auto max-h-[80vh] w-auto max-w-full rounded-3xl object-contain shadow-lg shadow-black/30" />
              {n.coverCaption && <figcaption className="mt-3 text-center text-sm text-dim">{t(n.coverCaption, lang)}</figcaption>}
            </figure>
          )}
          <p className="text-xl font-medium leading-relaxed text-white">{t(n.summary, lang)}</p>
          <div className="hairline my-8" />
          {t(n.body, lang)
            .split("\n\n")
            .map((p, i) => (
              <p key={i} className="mb-5 text-lg leading-relaxed text-white/85">
                {p}
              </p>
            ))}
        </div>
      </article>
      {more.length > 0 && (
        <section className="bg-ink-900/50 px-4 py-14 sm:px-6">
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
            {more.map((m) => (
              <NewsCard key={m.slug} n={m} lang={lang} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
