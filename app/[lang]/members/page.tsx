import { ShieldCheck } from "lucide-react";
import { members, membersAreSample } from "@/lib/data";
import { t, ui } from "@/lib/i18n";
import { site } from "@/content/site";
import { getLang, pageMeta, type LangParams } from "@/lib/page";
import { ButtonLink, PageHero, SampleNotice, Section, SoonPanel } from "@/components/ui";
import MemberDirectory from "@/components/MemberDirectory";

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
        {members.length ? (
          <MemberDirectory members={members} lang={lang} />
        ) : (
          <SoonPanel lang={lang} text={bn ? "যাচাই শেষে সদস্যদের নাম, ছবি, স্কুল ও জেলা এখানে প্রকাশ করা হবে।" : "Once verified, members' names, photos, schools and districts will be published here."}>
            <ButtonLink href={site.links.apply} external variant="primary">
              {t(ui.applyNow, lang)}
            </ButtonLink>
          </SoonPanel>
        )}
      </Section>
    </>
  );
}
