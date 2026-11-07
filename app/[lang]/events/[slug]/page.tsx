import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, MapPin, Users } from "lucide-react";
import { events, CATEGORY_LABEL } from "@/content/events";
import { LANGS, formatDate, href, isLang, num, t, ui, type Lang } from "@/lib/i18n";
import { ButtonLink, EmptyState, Pill, Ring } from "@/components/ui";

type P = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
  return LANGS.flatMap((lang) => events.filter((e) => e.category !== "convention").map((e) => ({ lang, slug: e.slug })));
}

export async function generateMetadata({ params }: P) {
  const { lang, slug } = await params;
  const e = events.find((x) => x.slug === slug);
  return { title: e ? t(e.title, isLang(lang) ? lang : "bn") : "Event" };
}

export default async function EventPage({ params }: P) {
  const { lang: l, slug } = await params;
  const lang = (isLang(l) ? l : "bn") as Lang;
  const e = events.find((x) => x.slug === slug);
  if (!e) notFound();
  if (e.category === "convention") redirect(href(lang, "/convention-2027"));
  const bn = lang === "bn";
  const isPast = e.date < new Date().toISOString().slice(0, 10);

  return (
    <>
      <section className="relative overflow-hidden pb-20 pt-40 text-white">
        <div aria-hidden className="mesh-hero" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
          <Link href={href(lang, "/events")} className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white">
            <ArrowLeft className="size-4" />
            {t(ui.nav.events, lang)}
          </Link>
          <div className="mt-6">
            <Pill>{t(CATEGORY_LABEL[e.category], lang)}</Pill>
          </div>
          <h1 className="mt-5 text-balance text-4xl font-bold sm:text-6xl">{t(e.title, lang)}</h1>
          <div className="mt-7 flex flex-wrap gap-2.5 text-sm">
            <span className="glass flex items-center gap-2 rounded-full px-4 py-2"><CalendarDays className="size-4" />{formatDate(e.date, lang)}</span>
            {e.time && <span className="glass flex items-center gap-2 rounded-full px-4 py-2"><Clock className="size-4" />{t(e.time, lang)}</span>}
            <span className="glass flex items-center gap-2 rounded-full px-4 py-2"><MapPin className="size-4" />{t(e.venue, lang)}</span>
            {e.participants && <span className="glass flex items-center gap-2 rounded-full px-4 py-2"><Users className="size-4" />{num(e.participants, lang)} {bn ? "জন অংশগ্রহণকারী" : "participants"}</span>}
          </div>
        </div>
      </section>
      <section className="px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <p className="text-xl leading-relaxed text-white">{t(e.summary, lang)}</p>
          {e.body && <p className="mt-5 text-lg leading-relaxed text-soft">{t(e.body, lang)}</p>}
          {!isPast && e.registrationUrl && (
            <div className="mt-8">
              <ButtonLink href={e.registrationUrl} external variant="gold">
                {t(ui.register, lang)}
              </ButtonLink>
            </div>
          )}
          <h2 className="mt-14 text-2xl font-bold text-white">{bn ? "ছবি" : "Photos"}</h2>
          {e.photos?.length ? (
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {e.photos.map((p) => (
                <div key={p} className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image src={p} alt="" fill sizes="33vw" className="object-cover" />
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6">
              <EmptyState title={bn ? "ছবি শীঘ্রই যুক্ত হবে" : "Photos coming soon"} />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
