import { ShieldCheck } from "lucide-react";
import { members, membersAreSample } from "@/lib/data";
import { formatDate, num, t, ui } from "@/lib/i18n";
import { site } from "@/content/site";
import { registeredAsOf, registeredBySchool, registeredCount } from "@/content/registered";
import { getLang, pageMeta, type LangParams } from "@/lib/page";
import { ButtonLink, PageHero, SampleNotice, Section } from "@/components/ui";
import MemberDirectory from "@/components/MemberDirectory";
import RegisteredList from "@/components/RegisteredList";

export async function generateMetadata({ params }: LangParams) {
  return pageMeta(await getLang(params), ui.nav.members, "/members");
}

export default async function MembersPage({ params }: LangParams) {
  const lang = await getLang(params);
  const bn = lang === "bn";
  return (
    <>
      <PageHero
        eyebrow={bn ? "সদস্য ডিরেক্টরি" : "Member directory"}
        title={bn ? "পুরোনো বন্ধুকে খুঁজে নিন" : "Find your old classmates"}
        subtitle={bn ? "নাম, স্কুল, জেলা-উপজেলা, পেশা বা সদস্য আইডি দিয়ে খুঁজুন।" : "Search by name, school, district/upazila, profession or membership ID."}
      >
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <ButtonLink href={site.links.apply} external variant="gold">
            {t(ui.applyNow, lang)}
          </ButtonLink>
          <span className="flex items-center gap-2 text-sm text-white/70">
            <ShieldCheck className="size-5 text-brand-200" />
            {bn ? "গোপনীয়তা রক্ষায় মোবাইল নম্বর ও ঠিকানা প্রকাশ করা হয় না।" : "Phone numbers and addresses are never published, to protect privacy."}
          </span>
        </div>
      </PageHero>
      <Section className="!pt-10">
        {membersAreSample && <SampleNotice>{t(ui.sampleData, lang)}</SampleNotice>}
        <div className="mb-10 rounded-3xl card p-5 sm:p-6">
          <p className="font-display text-xl font-semibold text-white sm:text-2xl">
            {bn
              ? `মিলনমেলা ২০২৭-এ নিবন্ধিত ${num(registeredCount, lang)} জন একাশিয়ান বন্ধু`
              : `${registeredCount} Ekashian friends registered for Milonmela 2027`}
          </p>
          <p className="mt-2 text-soft">
            {bn
              ? `${formatDate(registeredAsOf, lang)} রাত ৯টা পর্যন্ত অনলাইনে নিবন্ধিত বন্ধুদের নাম স্কুল অনুযায়ী সাজানো হয়েছে। রেজিস্ট্রেশন চলবে ১০ ডিসেম্বর ২০২৬ পর্যন্ত; প্রতি সপ্তাহ শেষে তালিকা হালনাগাদ হবে। টাইপে কোনো ভুল থাকলে পরবর্তী তালিকায় সংশোধন করা হবে।`
              : `Friends registered online up to 9 PM on ${formatDate(registeredAsOf, lang)}, grouped by school. Registration stays open until 10 December 2026 and the list is updated at the end of every week. Any typing errors will be corrected in the next list. Names and schools are shown as published, in Bengali.`}
          </p>
        </div>
        <RegisteredList groups={registeredBySchool} lang={lang} />
        {members.length > 0 && (
          <div className="mt-20">
            <MemberDirectory members={members} lang={lang} />
          </div>
        )}
      </Section>
    </>
  );
}
