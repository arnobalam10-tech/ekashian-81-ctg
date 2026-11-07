import { committee, ROLE_LABEL, TIERS } from "@/content/committee";
import { convention } from "@/content/convention";
import { t, ui } from "@/lib/i18n";
import { getLang, pageMeta, type LangParams } from "@/lib/page";
import { PageHero, Section, SectionHead } from "@/components/ui";
import { AdminCard, CommitteeCard } from "@/components/cards";

export async function generateMetadata({ params }: LangParams) {
  return pageMeta(await getLang(params), ui.nav.committee, "/committee");
}

const POSITIONS = [
  "president",
  "senior-vice-president",
  "vice-president",
  "general-secretary",
  "joint-general-secretary",
  "organizing-secretary",
  "finance-secretary",
  "office-secretary",
  "publicity-secretary",
  "cultural-secretary",
  "executive-member",
] as const;

export default async function CommitteePage({ params }: LangParams) {
  const lang = await getLang(params);
  const bn = lang === "bn";
  const tiers = TIERS.map((roles) => committee.filter((c) => roles.includes(c.role))).filter((g) => g.length);

  return (
    <>
      <PageHero
        eyebrow={bn ? "নেতৃত্ব" : "Leadership"}
        title={bn ? "যাঁরা পথ দেখাচ্ছেন" : "The people leading the way"}
        subtitle={bn ? "একাশিয়ান – এসএসসি ব্যাচ ১৯৮১, চট্টগ্রাম বিভাগীয় শাখা" : "EKASHIAN – SSC Batch 1981, Chattogram Division Chapter"}
      />

      <Section className="!pt-6">
        <SectionHead
          eyebrow={bn ? "মিলনমেলা ২০২৭" : "Milonmela 2027"}
          title={bn ? "ইভেন্ট অ্যাডমিন" : "Event admins"}
          intro={bn ? "অনলাইন রেজিস্ট্রেশন ও অনুষ্ঠান ব্যবস্থাপনার দায়িত্বে নিয়োজিত।" : "Responsible for online registration and running the event."}
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {convention.admins.map((a) => (
            <AdminCard key={a.email} a={a} lang={lang} />
          ))}
        </div>
      </Section>

      <Section className="!pt-0">
        <SectionHead eyebrow={bn ? "কার্যনির্বাহী কমিটি" : "Executive committee"} title={bn ? "চট্টগ্রাম বিভাগীয় কমিটি" : "Chattogram Division committee"} />
        {tiers.length ? (
          <div className="mt-12">
            {tiers.map((group, i) => {
              const cols =
                group.length === 1 ? "max-w-xs" : group.length === 2 ? "max-w-2xl sm:grid-cols-2" : group.length === 3 ? "max-w-4xl sm:grid-cols-3" : "max-w-6xl sm:grid-cols-2 lg:grid-cols-4";
              return (
                <div key={i} className="mb-14 last:mb-0">
                  <p className="label mb-6 text-center">{t(ROLE_LABEL[group[0].role], lang)}</p>
                  <div className={`mx-auto grid gap-5 ${cols}`}>
                    {group.map((c) => (
                      <CommitteeCard key={c.id} c={c} lang={lang} featured={c.role === "president"} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="card grain relative mt-10 overflow-hidden p-8 sm:p-12">
            <div className="relative">
              <p className="text-2xl font-semibold text-white">{bn ? "পূর্ণাঙ্গ কমিটি শীঘ্রই প্রকাশিত হবে" : "The full committee will be published soon"}</p>
              <p className="mt-2 max-w-2xl text-soft">{bn ? "নিচের পদগুলোর নাম, ছবি ও পরিচিতি যুক্ত করা হবে।" : "Names, photos and introductions for the positions below will be added."}</p>
              <div className="mt-8 flex flex-wrap gap-2">
                {POSITIONS.map((p) => (
                  <span key={p} className="rounded-full border border-white/10 bg-white/[.04] px-4 py-2 text-sm text-soft">
                    {t(ROLE_LABEL[p], lang)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </Section>
    </>
  );
}
