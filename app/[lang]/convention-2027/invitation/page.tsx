import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { convention } from "@/content/convention";
import { href, t } from "@/lib/i18n";
import { getLang, pageMeta, type LangParams } from "@/lib/page";
import InvitationCard from "@/components/InvitationCard";
import PrintButton from "@/components/PrintButton";

export async function generateMetadata({ params }: LangParams) {
  const lang = await getLang(params);
  return pageMeta(lang, { bn: "আমন্ত্রণপত্র — মিলনমেলা ২০২৭", en: "Invitation — Milonmela 2027" }, "/convention-2027/invitation");
}

export default async function InvitationPage({ params }: LangParams) {
  const lang = await getLang(params);
  const bn = lang === "bn";
  return (
    <section className="relative min-h-screen overflow-hidden bg-brand-500/15 px-4 pb-20 pt-40">
      <div className="relative mx-auto max-w-xl">
        <Link href={href(lang, "/convention-2027")} className="no-print inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
          <ArrowLeft className="size-4" />
          {t(convention.title, lang)}
        </Link>
        <div className="mt-6">
          <InvitationCard lang={lang} />
        </div>
        <div className="no-print mt-8 flex flex-wrap items-center justify-center gap-4">
          <PrintButton label={bn ? "প্রিন্ট / PDF ডাউনলোড" : "Print / Download PDF"} className="" />
          <p className="text-sm text-white/60">{bn ? "প্রিন্ট ডায়ালগে 'Save as PDF' বেছে নিন।" : "Choose “Save as PDF” in the print dialog."}</p>
        </div>
      </div>
    </section>
  );
}
