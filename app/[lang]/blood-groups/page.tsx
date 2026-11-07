import { HeartPulse, ShieldCheck } from "lucide-react";
import { members, membersAreSample } from "@/lib/data";
import { site } from "@/content/site";
import { num, t, ui } from "@/lib/i18n";
import { getLang, pageMeta, type LangParams } from "@/lib/page";
import { PageHero, SampleNotice, Section, SoonPanel } from "@/components/ui";
import BloodDirectory from "@/components/BloodDirectory";

export async function generateMetadata({ params }: LangParams) {
  return pageMeta(await getLang(params), ui.nav.blood, "/blood-groups");
}

export default async function BloodPage({ params }: LangParams) {
  const lang = await getLang(params);
  const bn = lang === "bn";
  return (
    <>
      <PageHero
        eyebrow={bn ? "মানবতার সেবায়" : "In service of humanity"}
        title={bn ? "রক্তদাতা তালিকা" : "Blood group directory"}
        subtitle={
          bn ? "জরুরি প্রয়োজনে বন্ধুর পাশে। শুধুমাত্র যাঁরা সম্মতি দিয়েছেন তাঁদের রক্তের গ্রুপ দেখানো হয়।" : "Standing by friends in an emergency. Only members who have consented are listed."
        }
      />
      <Section className="!pt-10">
        {membersAreSample && <SampleNotice>{t(ui.sampleData, lang)}</SampleNotice>}
        <div className="mb-8 flex flex-col gap-4 rounded-3xl bg-brand-500/15 p-6 text-white sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 size-6 shrink-0 text-brand-200" />
            {bn ? "গোপনীয়তার স্বার্থে ফোন নম্বর প্রকাশ করা হয় না। রক্তের প্রয়োজনে কমিটির সাথে যোগাযোগ করুন।" : "Phone numbers are kept private. For blood requests, contact the committee."}
          </p>
          <a
            href={`tel:${site.contact.phones[0].replace(/[^+\d]/g, "")}`}
            className="flex shrink-0 items-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 font-semibold text-white hover:bg-brand-400"
          >
            <HeartPulse className="size-5" /> {num(site.contact.phones[0], lang)}
          </a>
        </div>
        {members.length ? <BloodDirectory members={members} lang={lang} /> : <SoonPanel lang={lang} title={bn ? "রক্তদাতা তালিকা শীঘ্রই যুক্ত হবে" : "The donor list will be added soon"} />}
      </Section>
    </>
  );
}
