import { ui } from "@/lib/i18n";
import { pastEvents, upcomingEvents } from "@/lib/data";
import { getLang, pageMeta, type LangParams } from "@/lib/page";
import { PageHero, Section } from "@/components/ui";
import EventsBrowser from "@/components/EventsBrowser";

export const revalidate = 3600;

export async function generateMetadata({ params }: LangParams) {
  return pageMeta(await getLang(params), ui.nav.events, "/events");
}

export default async function EventsPage({ params }: LangParams) {
  const lang = await getLang(params);
  const bn = lang === "bn";
  return (
    <>
      <PageHero
        eyebrow={bn ? "অনুষ্ঠান ও কার্যক্রম" : "Events & activities"}
        title={bn ? "একসাথে থাকার মুহূর্তগুলো" : "Moments we share together"}
        subtitle={
          bn
            ? "পুনর্মিলনী, বার্ষিক মিলনমেলা, পারিবারিক আয়োজন, বনভোজন ও ভ্রমণ, ইফতার মাহফিল এবং সমাজকল্যাণমূলক কার্যক্রম।"
            : "Reunions, annual get-togethers, family gatherings, picnics and tours, Iftar Mahfils and social welfare work."
        }
      />
      <Section className="!pt-10">
        <EventsBrowser upcoming={upcomingEvents()} past={pastEvents()} lang={lang} />
      </Section>
    </>
  );
}
