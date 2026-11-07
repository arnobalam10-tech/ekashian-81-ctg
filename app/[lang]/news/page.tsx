import { news } from "@/content/news";
import { ui } from "@/lib/i18n";
import { getLang, pageMeta, type LangParams } from "@/lib/page";
import { PageHero, Section } from "@/components/ui";
import { NewsCard } from "@/components/cards";

export async function generateMetadata({ params }: LangParams) {
  return pageMeta(await getLang(params), ui.nav.news, "/news");
}

export default async function NewsPage({ params }: LangParams) {
  const lang = await getLang(params);
  const bn = lang === "bn";
  const list = news.slice().sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <PageHero
        eyebrow={bn ? "সংবাদ" : "News"}
        title={bn ? "সংবাদ ও ঘোষণা" : "News & announcements"}
        subtitle={bn ? "সাংগঠনিক সংবাদ, গুরুত্বপূর্ণ ঘোষণা, সভার নোটিশ ও অফিসিয়াল বিজ্ঞপ্তি।" : "Organisational news, announcements, meeting notices and official circulars."}
      />
      <Section className="!pt-10">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((n) => (
            <NewsCard key={n.slug} n={n} lang={lang} />
          ))}
        </div>
      </Section>
    </>
  );
}
