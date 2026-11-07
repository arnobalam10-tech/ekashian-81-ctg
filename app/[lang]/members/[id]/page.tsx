import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Briefcase, Cake, CreditCard, Droplet, GraduationCap, IdCard, MapPin, MessageCircle } from "lucide-react";
import { getMember, initials, members } from "@/lib/data";
import { LANGS, href, isLang, monthName, num, t, ui, type Lang } from "@/lib/i18n";
import { site } from "@/content/site";
import { Avatar } from "@/components/ui";

type P = { params: Promise<{ lang: string; id: string }> };

export function generateStaticParams() {
  return LANGS.flatMap((lang) => members.map((m) => ({ lang, id: m.id })));
}

export async function generateMetadata({ params }: P) {
  const { lang, id } = await params;
  const m = getMember(id);
  const l = (isLang(lang) ? lang : "bn") as Lang;
  return { title: m ? t(m.name, l) : "Member" };
}

export default async function MemberProfile({ params }: P) {
  const { lang: l, id } = await params;
  const lang = (isLang(l) ? l : "bn") as Lang;
  const m = getMember(id);
  if (!m) notFound();
  const bn = lang === "bn";
  const bday = m.birthday ? m.birthday.split("-").map(Number) : null;

  const rows = [
    { icon: IdCard, label: bn ? "সদস্য আইডি" : "Membership ID", value: m.id },
    { icon: GraduationCap, label: bn ? "স্কুল" : "School", value: t(m.school, lang) },
    { icon: GraduationCap, label: bn ? "এসএসসি" : "SSC", value: num(1981, lang) },
    { icon: MapPin, label: bn ? "জেলা / উপজেলা" : "District / Upazila", value: `${t(m.upazila, lang)}, ${t(m.district, lang)}` },
    { icon: Briefcase, label: bn ? "পেশা" : "Profession", value: t(m.profession, lang) },
    ...(m.bloodGroup && m.showBloodGroup ? [{ icon: Droplet, label: bn ? "রক্তের গ্রুপ" : "Blood group", value: m.bloodGroup }] : []),
    ...(bday ? [{ icon: Cake, label: bn ? "জন্মদিন" : "Birthday", value: `${num(bday[1], lang)} ${monthName(bday[0] - 1, lang)}` }] : []),
  ];

  return (
    <>
      <section className="relative overflow-hidden pb-32 pt-40 text-white">
        <div aria-hidden className="mesh-hero" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
          <Link href={href(lang, "/members")} className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white">
            <ArrowLeft className="size-4" />
            {t(ui.nav.members, lang)}
          </Link>
        </div>
      </section>
      <section className="relative -mt-24 px-4 pb-24 sm:px-6">
        <div className="card grain mx-auto max-w-5xl p-6 shadow-2xl shadow-black/30 sm:p-10">
          <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-end sm:text-left">
            <div className="-mt-20 rounded-full bg-gradient-to-br from-brand-200 via-brand-500 to-violet-500 p-1.5 shadow-xl sm:-mt-24">
              <Avatar src={m.photo} name={t(m.name, lang)} initials={initials(m.name.en)} size={160} className="ring-4 ring-ink-900" />
            </div>
            <div className="flex-1">
              <p className="label">{t(m.profession, lang)}</p>
              <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">{t(m.name, lang)}</h1>
              <p className="mt-1 text-soft">{t(m.name, bn ? "en" : "bn")}</p>
            </div>
          </div>
          {m.bio && <p className="mt-8 text-lg text-soft">{t(m.bio, lang)}</p>}
          <dl className="mt-8 grid gap-3 sm:grid-cols-2">
            {rows.map((r) => (
              <div key={r.label} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[.05] p-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-500/25 text-brand-100">
                  <r.icon className="size-5" />
                </span>
                <div className="min-w-0">
                  <dt className="text-xs text-dim">{r.label}</dt>
                  <dd className="truncate font-semibold text-white">{r.value}</dd>
                </div>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={href(lang, `/members/${m.id}/card`)} className="btn btn-primary">
              <CreditCard className="size-5" /> {bn ? "ডিজিটাল সদস্য কার্ড" : "Digital member card"}
            </Link>
            <Link href={href(lang, "/contact")} className="btn btn-ghost">
              <MessageCircle className="size-5" /> {t(ui.contactViaCommittee, lang)}
            </Link>
          </div>
          <p className="mt-6 text-sm text-dim">
            {bn ? `তথ্য সংশোধনের জন্য ছবি ও সঠিক তথ্য পাঠান: ${site.contact.email}` : `To correct your information, send your photo and details to ${site.contact.email}`}
          </p>
        </div>
      </section>
    </>
  );
}
