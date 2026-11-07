import { Camera, FileText, Shirt, Ticket, Wallet } from "lucide-react";
import { site } from "@/content/site";
import { convention } from "@/content/convention";
import { formatDate, num, t, ui } from "@/lib/i18n";
import { getLang, pageMeta, type LangParams } from "@/lib/page";
import { ButtonLink, PageHero, Section, SectionHead, SoonPanel } from "@/components/ui";

export async function generateMetadata({ params }: LangParams) {
  return pageMeta(await getLang(params), ui.nav.membership, "/membership");
}

export default async function MembershipPage({ params }: LangParams) {
  const lang = await getLang(params);
  const bn = lang === "bn";
  /** Steps exactly as published on the registration site */
  const steps = [
    { icon: FileText, title: bn ? "অনলাইন ফরম পূরণ" : "Fill the online form", body: bn ? "নাম (বাংলা ও ইংরেজি), পেশা, ঠিকানা, মোবাইল, স্কুলের নাম; ই-মেইল ও রক্তের গ্রুপ ঐচ্ছিক।" : "Name (Bangla & English), profession, address, mobile, school; email and blood group optional." },
    { icon: Camera, title: bn ? "ছবি আপলোড" : "Upload a photo", body: bn ? "ছবি আপলোড বাধ্যতামূলক।" : "A photo is required." },
    { icon: Shirt, title: bn ? "টি-শার্ট সাইজ" : "T-shirt size", body: bn ? "পুরুষ: S–XXXL · মহিলা: S–XXL" : "Men: S–XXXL · Women: S–XXL" },
    { icon: Wallet, title: bn ? "bKash-এ পেমেন্ট" : "Pay via bKash", body: bn ? "bKash নম্বর, OTP ও পিন দিয়ে পেমেন্ট সম্পন্ন করুন।" : "Complete payment with your bKash number, OTP and PIN." },
    { icon: Ticket, title: bn ? "কার্ড ডাউনলোড" : "Download your card", body: bn ? "পেমেন্টের পর ইনভাইটেশন কার্ড ও মানি রিসিপ্ট ডাউনলোড করুন।" : "Download your invitation card and receipt after payment." },
  ];
  return (
    <>
      <PageHero
        eyebrow={t(ui.nav.membership, lang)}
        title={bn ? "একাশিয়ান পরিবারে যুক্ত হোন" : "Join the Ekashian family"}
        subtitle={bn ? "১৯৮১ সালে এসএসসি পাস করা বন্ধুদের সংগঠন।" : "The organisation of friends who passed SSC in 1981."}
      >
        <div className="mt-8">
          <ButtonLink href={site.links.apply} external variant="gold">
            {t(ui.applyNow, lang)}
          </ButtonLink>
        </div>
      </PageHero>

      <Section className="!pt-6">
        <SoonPanel lang={lang} title={bn ? "সদস্যপদের বিস্তারিত নিয়মাবলী শীঘ্রই প্রকাশিত হবে" : "Full membership details will be published soon"} />
      </Section>

      <Section glow className="!pt-0">
        <SectionHead
          eyebrow={bn ? "মিলনমেলা ২০২৭" : "Milonmela 2027"}
          title={bn ? "অনলাইন রেজিস্ট্রেশনের ধাপ" : "Online registration steps"}
          intro={bn ? `রেজিস্ট্রেশন চলবে ${formatDate(convention.registration.closes, lang)} পর্যন্ত।` : `Registration is open until ${formatDate(convention.registration.closes, lang)}.`}
          action={
            <ButtonLink href={convention.links.register} external variant="primary">
              {t(ui.register, lang)}
            </ButtonLink>
          }
        />
        <ol className="mt-12 grid gap-4 md:grid-cols-5">
          {steps.map((s, i) => (
            <li key={s.title} className="card relative p-6">
              <span className="absolute right-5 top-4 font-display text-3xl font-bold text-white/15">{num(i + 1, lang)}</span>
              <span className="grid size-12 place-items-center rounded-2xl bg-brand-500/25 text-brand-100">
                <s.icon className="size-6" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-[15px] text-soft">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
