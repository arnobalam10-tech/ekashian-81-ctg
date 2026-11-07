import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getMember, members } from "@/lib/data";
import { LANGS, href, isLang, t, type Lang } from "@/lib/i18n";
import MemberCardVisual from "@/components/MemberCardVisual";
import PrintButton from "@/components/PrintButton";

type P = { params: Promise<{ lang: string; id: string }> };

export function generateStaticParams() {
  return LANGS.flatMap((lang) => members.map((m) => ({ lang, id: m.id })));
}

export async function generateMetadata({ params }: P) {
  const { lang, id } = await params;
  const m = getMember(id);
  return { title: m ? `${t(m.name, isLang(lang) ? lang : "bn")} — Card` : "Card", robots: { index: false } };
}

export default async function CardPage({ params }: P) {
  const { lang: l, id } = await params;
  const lang = (isLang(l) ? l : "bn") as Lang;
  const m = getMember(id);
  if (!m) notFound();
  const bn = lang === "bn";
  return (
    <section className="min-h-screen bg-ink-950 px-4 pb-20 pt-40">
      <div className="mx-auto max-w-xl">
        <Link href={href(lang, `/members/${m.id}`)} className="no-print inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
          <ArrowLeft className="size-4" />
          {t(m.name, lang)}
        </Link>
        <h1 className="no-print mt-4 text-3xl font-bold text-white">{bn ? "ডিজিটাল সদস্য কার্ড" : "Digital membership card"}</h1>
        <div className="mt-8">
          <MemberCardVisual m={m} lang={lang} />
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <PrintButton label={bn ? "প্রিন্ট / PDF সংরক্ষণ" : "Print / Save as PDF"} className="" />
          <p className="no-print text-sm text-white/60">{bn ? "প্রিন্ট ডায়ালগে 'Save as PDF' বেছে নিন।" : "Choose “Save as PDF” in the print dialog."}</p>
        </div>
      </div>
    </section>
  );
}
