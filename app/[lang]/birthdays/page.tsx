import { members } from "@/lib/data";
import { ui } from "@/lib/i18n";
import { getLang, pageMeta, type LangParams } from "@/lib/page";
import { PageHero, Section, SoonPanel } from "@/components/ui";
import Birthdays from "@/components/Birthdays";

export async function generateMetadata({ params }: LangParams) {
  return pageMeta(await getLang(params), ui.nav.birthdays, "/birthdays");
}

export default async function BirthdaysPage({ params }: LangParams) {
  const lang = await getLang(params);
  const bn = lang === "bn";
  return (
    <>
      <PageHero
        eyebrow={bn ? "শুভেচ্ছা" : "Celebrations"}
        title={bn ? "বন্ধুদের জন্মদিন" : "Friends' birthdays"}
        subtitle={bn ? "একটি ফোন বা একটি বার্তা — বন্ধুর দিনটি আরও আনন্দের করে তুলুন।" : "A call or a message can make a friend's day."}
      />
      <Section className="!pt-10">
        {members.length ? <Birthdays members={members} lang={lang} /> : <SoonPanel lang={lang} title={bn ? "জন্মদিনের তালিকা শীঘ্রই যুক্ত হবে" : "The birthday list will be added soon"} />}
      </Section>
    </>
  );
}
