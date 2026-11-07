import { albums, videos } from "@/content/gallery";
import { t, ui } from "@/lib/i18n";
import { getLang, pageMeta, type LangParams } from "@/lib/page";
import { EmptyState, PageHero, Section, SectionHead } from "@/components/ui";
import Gallery from "@/components/Gallery";

export async function generateMetadata({ params }: LangParams) {
  return pageMeta(await getLang(params), ui.nav.gallery, "/gallery");
}

export default async function GalleryPage({ params }: LangParams) {
  const lang = await getLang(params);
  const bn = lang === "bn";
  return (
    <>
      <PageHero
        eyebrow={bn ? "ছবি ও ভিডিও" : "Photos & videos"}
        title={bn ? "স্মৃতির অ্যালবাম" : "Albums of memories"}
        subtitle={bn ? "অনুষ্ঠান, পুনর্মিলনী আর পুরোনো স্কুল জীবনের ছবি — এক জায়গায়।" : "Events, reunions and old school days — all in one place."}
      />
      <Section className="!pt-10">
        <Gallery albums={albums} lang={lang} />
        <div className="mt-20">
          <SectionHead eyebrow={bn ? "ভিডিও" : "Videos"} title={bn ? "ভিডিও গ্যালারি" : "Video gallery"} />
          <div className="mt-8">
            {videos.length ? (
              <div className="grid gap-6 md:grid-cols-2">
                {videos.map((v) => (
                  <figure key={v.youtubeId}>
                    <div className="aspect-video overflow-hidden rounded-3xl shadow-lg shadow-black/30">
                      <iframe className="size-full" src={`https://www.youtube-nocookie.com/embed/${v.youtubeId}`} title={t(v.title, lang)} allowFullScreen loading="lazy" />
                    </div>
                    <figcaption className="mt-3 font-display text-lg text-white">{t(v.title, lang)}</figcaption>
                  </figure>
                ))}
              </div>
            ) : (
              <EmptyState title={bn ? "ভিডিও শীঘ্রই যুক্ত হবে" : "Videos coming soon"} />
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
