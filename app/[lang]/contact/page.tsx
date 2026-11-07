import Image from "next/image";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/content/site";
import { convention } from "@/content/convention";
import { num, t, ui } from "@/lib/i18n";
import { getLang, pageMeta, type LangParams } from "@/lib/page";
import { PageHero, Section } from "@/components/ui";

export async function generateMetadata({ params }: LangParams) {
  return pageMeta(await getLang(params), ui.nav.contact, "/contact");
}

export default async function ContactPage({ params }: LangParams) {
  const lang = await getLang(params);
  const bn = lang === "bn";
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(site.contact.mapQuery)}&output=embed`;
  return (
    <>
      <PageHero eyebrow={t(ui.nav.contact, lang)} title={bn ? "আমাদের সাথে যোগাযোগ করুন" : "Get in touch"} subtitle={t(site.chapterName, lang)} />
      <Section className="!pt-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
          <div className="space-y-4">
            {[
              { icon: MapPin, label: bn ? "কার্যালয়" : "Office", body: t(site.contact.address, lang) || (bn ? "তথ্য শীঘ্রই আসছে" : "Information coming soon") },
              { icon: Clock, label: bn ? "অফিস সময়" : "Office hours", body: t(site.contact.officeHours, lang) || (bn ? "তথ্য শীঘ্রই আসছে" : "Information coming soon") },
            ].map((c) => (
              <div key={c.label} className="flex gap-4 rounded-3xl card p-6">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-500/15 text-brand-200">
                  <c.icon className="size-6" />
                </span>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-soft">{c.label}</p>
                  <p className="mt-1 text-lg text-white">{c.body}</p>
                </div>
              </div>
            ))}
            <div className="flex gap-4 rounded-3xl card p-6">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-500/15 text-brand-200">
                <Phone className="size-6" />
              </span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-soft">{bn ? "ফোন" : "Phone"}</p>
                {site.contact.phones.map((p) => (
                  <a key={p} href={`tel:${p.replace(/[^+\d]/g, "")}`} className="mt-1 block text-lg text-white hover:text-white">
                    {num(p, lang)}
                  </a>
                ))}
              </div>
            </div>
            <div className="flex gap-4 rounded-3xl card p-6">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-500/15 text-brand-200">
                <Mail className="size-6" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold uppercase tracking-wider text-soft">{bn ? "ইমেইল" : "Email"}</p>
                <a href={`mailto:${site.contact.email}`} className="mt-1 block break-all text-lg text-white hover:text-white">
                  {site.contact.email}
                </a>
              </div>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl shadow-xl ring-1 ring-white/10">
            <iframe src={mapSrc} title="Map" className="h-full min-h-96 w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>

        <h2 className="mt-20 text-center text-3xl font-bold text-white">{bn ? "যোগাযোগ ব্যক্তিবর্গ" : "Contact persons"}</h2>
        <div className="mx-auto mt-10 grid max-w-5xl gap-6 sm:grid-cols-3">
          {convention.admins.map((a) => (
            <div key={a.email} className="rounded-3xl card p-6 text-center">
              <div className="mx-auto size-28 overflow-hidden rounded-full ring-4 ring-brand-400/50">
                <Image src={a.photo} alt={t(a.name, lang)} width={224} height={224} className="size-full object-cover object-top" />
              </div>
              <p className="mt-4 font-display text-lg font-semibold text-white">{t(a.name, lang)}</p>
              <a href={`tel:${a.phone.replace(/[^+\d]/g, "")}`} className="mt-2 flex items-center justify-center gap-2 text-brand-300 hover:text-white">
                <Phone className="size-4" />
                {num(a.phone, lang)}
              </a>
              <a href={`mailto:${a.email}`} className="mt-1 block break-all text-sm text-soft hover:text-white">
                {a.email}
              </a>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
