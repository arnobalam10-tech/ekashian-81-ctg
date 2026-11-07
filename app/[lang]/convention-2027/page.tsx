import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, CalendarDays, Clock, Crown, Download, Mail, MapPin, Phone, Star, Ticket, Users, Wallet, Megaphone, Camera } from "lucide-react";
import { convention } from "@/content/convention";
import { formatDate, href, num, t, ui } from "@/lib/i18n";
import { getLang, pageMeta, type LangParams } from "@/lib/page";
import Countdown from "@/components/Countdown";
import InvitationCard from "@/components/InvitationCard";
import { ButtonLink, EmptyState, Pill, Ring, Section, SectionHead } from "@/components/ui";

export const revalidate = 3600;

export async function generateMetadata({ params }: LangParams) {
  const lang = await getLang(params);
  return { ...pageMeta(lang, convention.title, "/convention-2027", convention.intro), openGraph: { images: [convention.emblem] } };
}

export default async function ConventionPage({ params }: LangParams) {
  const lang = await getLang(params);
  const bn = lang === "bn";
  const today = new Date().toISOString().slice(0, 10);
  const regOpen = today >= convention.registration.opens && today <= convention.registration.closes;
  const regClosed = today > convention.registration.closes;
  const isOver = today > convention.date;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(convention.mapQuery)}&output=embed`;

  return (
    <>
      {/* ===== FESTIVE HERO ===== */}
      <section className="relative overflow-hidden bg-ink-950 pb-20 pt-36 text-white sm:pt-40">
        <div aria-hidden className="mesh-hero" />
        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6">
          <div className="mx-auto w-40 sm:w-52">
            <div className="animate-float rounded-full bg-white p-2 shadow-[0_30px_80px_-20px_rgba(4,10,40,.7)] ring-4 ring-white/40">
              <Image src={convention.emblem} alt={t(convention.title, lang)} width={400} height={400} priority className="rounded-full" />
            </div>
          </div>
          <div className="mt-8">
            <Pill dark>{t(convention.subtitle, lang)}</Pill>
          </div>
          <h1 className="mt-5 text-balance text-4xl font-bold leading-tight sm:text-6xl">{t(convention.title, lang)}</h1>
          <p className="mt-4 font-display text-xl italic text-brand-200 sm:text-2xl">“{t(convention.tagline, lang)}”</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm sm:text-base">
            <span className="glass flex items-center gap-2 rounded-full px-4 py-2">
              <CalendarDays className="size-5 text-brand-200" />
              {formatDate(convention.date, lang)}, {t(convention.day, lang)}
            </span>
            <span className="glass flex items-center gap-2 rounded-full px-4 py-2">
              <Clock className="size-5 text-brand-200" />
              {t(convention.time, lang)}
            </span>
            <span className="glass flex items-center gap-2 rounded-full px-4 py-2">
              <MapPin className="size-5 text-brand-200" />
              {t(convention.venue, lang)}
            </span>
          </div>
          <div className="mx-auto mt-10 max-w-2xl">
            <Countdown to={convention.startsAt} lang={lang} />
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {!regClosed && (
              <ButtonLink href={convention.links.register} external variant="gold">
                {t(ui.register, lang)}
              </ButtonLink>
            )}
            <ButtonLink href={convention.links.verify} external variant="ghost-light">
              {bn ? "রেজিস্ট্রেশন যাচাই ও রিসিপ্ট" : "Verify registration & receipt"}
            </ButtonLink>
            <ButtonLink href={href(lang, "/convention-2027/invitation")} variant="ghost-light">
              {bn ? "আমন্ত্রণপত্র" : "Invitation card"}
            </ButtonLink>
          </div>
          <p className="mt-5 text-sm text-white/70">
            {regOpen
              ? bn
                ? `রেজিস্ট্রেশন চলছে — শেষ তারিখ ${formatDate(convention.registration.closes, lang)}`
                : `Registration open — closes ${formatDate(convention.registration.closes, lang)}`
              : regClosed
                ? bn
                  ? "রেজিস্ট্রেশন বন্ধ হয়েছে"
                  : "Registration closed"
                : bn
                  ? `রেজিস্ট্রেশন শুরু ${formatDate(convention.registration.opens, lang)}`
                  : `Registration opens ${formatDate(convention.registration.opens, lang)}`}
          </p>
        </div>
      </section>

      {/* ===== STATS STRIP ===== */}
      <section className="relative z-10 -mt-10 px-4 sm:px-6">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 rounded-[2rem] card p-4 sm:grid-cols-4 sm:p-6">
          {[
            convention.registeredCount
              ? { icon: BadgeCheck, n: num(convention.registeredCount, lang), l: bn ? "নিবন্ধিত সদস্য" : "Registered members" }
              : { icon: CalendarDays, n: formatDate(convention.date, lang, { year: false }), l: bn ? "মিলনমেলা ২০২৭" : "Milonmela 2027" },
            convention.expectedParticipants
              ? { icon: Users, n: `${num(convention.expectedParticipants, lang)}+`, l: bn ? "প্রত্যাশিত অংশগ্রহণকারী" : "Expected participants" }
              : { icon: Clock, n: bn ? "৪:৩০" : "4:30 PM", l: bn ? "বিকাল থেকে শুরু" : "Starts" },
            { icon: Ticket, n: formatDate(convention.registration.closes, lang, { year: false }), l: bn ? "রেজিস্ট্রেশনের শেষ দিন" : "Registration closes" },
            { icon: Wallet, n: bn ? "৳১,৫০০" : "৳1,500", l: bn ? "রেজিস্ট্রেশন ফি (ব্যাচ '৮১)" : "Fee (Batch '81)" },
          ].map((s) => (
            <div key={s.l} className="flex items-center gap-3 rounded-2xl p-2 sm:p-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-500/15 text-brand-200">
                <s.icon className="size-5" />
              </span>
              <div>
                <div className="font-display text-xl font-bold text-white">{s.n}</div>
                <div className="text-xs text-soft">{s.l}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== INTRO ===== */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Pill>{bn ? "অনুষ্ঠান পরিচিতি" : "About the event"}</Pill>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">{bn ? "চার দশকের বন্ধুত্বের উৎসব" : "A celebration of four decades of friendship"}</h2>
            <p className="mt-5 text-lg leading-relaxed text-soft">{t(convention.intro, lang)}</p>
            <p className="mt-6 text-sm text-soft">
              {bn ? "আয়োজনে:" : "Organised by:"} <span className="font-semibold text-white">{t(convention.organizer, lang)}</span>
            </p>
          </div>
          {convention.objectives.length ? (
            <div className="card p-8 text-white sm:p-10">
              <h3 className="text-2xl font-semibold text-brand-200">{bn ? "উদ্দেশ্য" : "Objectives"}</h3>
              <ul className="mt-6 space-y-4">
                {convention.objectives.map((o) => (
                  <li key={o.en} className="flex gap-3">
                    <Star className="mt-1 size-5 shrink-0 fill-brand-400 text-brand-300" />
                    <span className="text-white/85">{t(o, lang)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="card grain p-8 text-white sm:p-10">
              <h3 className="text-2xl font-semibold text-brand-100">{bn ? "এক নজরে" : "At a glance"}</h3>
              <dl className="mt-6 space-y-4">
                {[
                  { i: CalendarDays, k: bn ? "তারিখ ও বার" : "Date", v: `${formatDate(convention.date, lang)}, ${t(convention.day, lang)}` },
                  { i: Clock, k: bn ? "সময়" : "Time", v: t(convention.time, lang) },
                  { i: MapPin, k: bn ? "ভেন্যু" : "Venue", v: t(convention.venue, lang) },
                  { i: MapPin, k: bn ? "ঠিকানা" : "Address", v: t(convention.address, lang) },
                ].map((x) => (
                  <div key={x.k} className="flex gap-3">
                    <x.i className="mt-1 size-5 shrink-0 text-brand-300" />
                    <div>
                      <dt className="text-xs text-dim">{x.k}</dt>
                      <dd className="text-white/90">{x.v}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </Section>

      {/* ===== SCHEDULE ===== */}
      <section className="bg-ink-900/50 py-16 sm:py-24" id="schedule">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <SectionHead
            align="center"
            eyebrow={bn ? "অনুষ্ঠানসূচি" : "Programme"}
            title={bn ? "মিলনমেলার দিনের সময়পরিক্রমা" : "The day's programme"}
            intro={`${t(convention.time, lang)} · ${t(convention.venue, lang)}`}
          />
          <ol className="mt-12 grid gap-3 sm:grid-cols-2">
            {convention.schedule.map((s, i) => (
              <li key={s.en} className="flex items-center gap-4 rounded-2xl card p-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-violet-500 font-display text-lg font-bold text-white">
                  {num(i + 1, lang)}
                </span>
                <span className="font-medium text-white">{t(s, lang)}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== REGISTRATION & FEES ===== */}
      <Section id="registration">
        <SectionHead
          eyebrow={bn ? "রেজিস্ট্রেশন" : "Registration"}
          title={bn ? "রেজিস্ট্রেশন ও ফি" : "Registration & fees"}
          intro={
            bn
              ? `রেজিস্ট্রেশন: ${formatDate(convention.registration.opens, lang)} – ${formatDate(convention.registration.closes, lang)} · শুধুমাত্র যাচাইকৃত সদস্যরা নিবন্ধন করতে পারবেন।`
              : `Registration: ${formatDate(convention.registration.opens, lang)} – ${formatDate(convention.registration.closes, lang)} · Only verified members may register.`
          }
        />
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="overflow-hidden rounded-3xl card">
            {convention.registration.fees.map((f) => (
              <div key={f.category.en} className="flex items-center justify-between gap-4 border-b border-white/10 p-5 last:border-0 sm:p-6">
                <div>
                  <p className="font-display text-lg font-semibold text-white">{t(f.category, lang)}</p>
                  <p className="text-sm text-soft">{t(f.note, lang)}</p>
                </div>
                <p className="text-right font-semibold text-brand-300">{t(f.fee, lang)}</p>
              </div>
            ))}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-brand-500/15 p-5 text-white sm:p-6">
              <span className="flex items-center gap-2 text-sm">
                <Wallet className="size-5 text-brand-200" />
                {t(convention.registration.payment, lang)}
              </span>
              {!regClosed && (
                <ButtonLink href={convention.links.register} external variant="gold">
                  {t(ui.register, lang)}
                </ButtonLink>
              )}
            </div>
          </div>
          <div className="rounded-3xl bg-brand-500/10 p-6 ring-1 ring-brand-400/30 sm:p-8">
            <h3 className="flex items-center gap-2 text-xl font-semibold text-white">
              <Megaphone className="size-5 text-brand-300" />
              {bn ? "গুরুত্বপূর্ণ নির্দেশনা" : "Important guidelines"}
            </h3>
            <ol className="mt-4 space-y-2.5 text-[15px]">
              {convention.guidelines.map((g, i) => (
                <li key={g.en} className="flex gap-3">
                  <span className="font-semibold text-brand-300">{num(i + 1, lang)}.</span>
                  <span className="text-white/90">{t(g, lang)}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {/* ===== GUESTS & ORGANISERS ===== */}
      <section className="relative overflow-hidden bg-ink-950 py-16 text-white sm:py-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Pill dark>{bn ? "অতিথি" : "Guests"}</Pill>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{bn ? "অতিথিবৃন্দ ও আয়োজক" : "Guests & organisers"}</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              ...(convention.guests.chief.length ? convention.guests.chief : [{ name: { bn: "শীঘ্রই ঘোষণা করা হবে", en: "To be announced" }, title: { bn: "", en: "" }, photo: "" }]).map((g) => ({ ...g, kind: bn ? "প্রধান অতিথি" : "Chief Guest", chief: true })),
              ...(convention.guests.special.length ? convention.guests.special : [{ name: { bn: "শীঘ্রই ঘোষণা করা হবে", en: "To be announced" }, title: { bn: "", en: "" }, photo: "" }]).map((g) => ({ ...g, kind: bn ? "বিশেষ অতিথি" : "Special Guests", chief: false })),
              ...[{ name: convention.guests.invited.length ? { bn: convention.guests.invited.map((g) => g.bn).join(" · "), en: convention.guests.invited.map((g) => g.en).join(" · ") } : { bn: "শীঘ্রই ঘোষণা করা হবে", en: "To be announced" }, title: { bn: "", en: "" }, photo: "", kind: bn ? "আমন্ত্রিত অতিথি" : "Invited Guests", chief: false }],
            ].map((g, i) => (
              <div key={i} className={`rounded-3xl p-6 text-center ${g.chief ? "bg-gradient-to-br from-brand-500 to-violet-500 text-white" : "glass"}`}>
                <span className={`mx-auto grid size-20 place-items-center rounded-full ${g.chief ? "bg-ink-950 text-brand-200" : "bg-white/10 text-brand-200"}`}>
                  <Crown className="size-8" />
                </span>
                <p className={`mt-4 text-xs font-bold uppercase tracking-wider ${g.chief ? "text-white" : "text-brand-200"}`}>{g.kind}</p>
                <p className="mt-1 font-display text-lg font-semibold">{t(g.name, lang)}</p>
                {t(g.title, lang) && <p className="text-sm opacity-80">{t(g.title, lang)}</p>}
              </div>
            ))}
          </div>

          <h3 className="mt-16 text-center text-2xl font-semibold text-brand-200">{bn ? "ইভেন্ট অ্যাডমিন ও যোগাযোগ" : "Event admins & contacts"}</h3>
          <div className="mx-auto mt-8 grid max-w-5xl gap-6 sm:grid-cols-3">
            {convention.admins.map((a) => (
              <div key={a.email} className="glass rounded-3xl p-6 text-center">
                <div className="mx-auto size-28 overflow-hidden rounded-full ring-4 ring-brand-400/50">
                  <Image src={a.photo} alt={t(a.name, lang)} width={224} height={224} className="size-full object-cover object-top" />
                </div>
                <p className="mt-4 text-xs font-bold uppercase tracking-wider text-brand-200">{t(a.role, lang)}</p>
                <p className="mt-1 font-display text-lg font-semibold">{t(a.name, lang)}</p>
                <a href={`tel:${a.phone.replace(/[^+\d]/g, "")}`} className="mt-3 flex items-center justify-center gap-2 text-sm text-white/85 hover:text-white">
                  <Phone className="size-4" />
                  {num(a.phone, lang)}
                </a>
                <a href={`mailto:${a.email}`} className="mt-1 flex items-center justify-center gap-2 break-all text-sm text-white/70 hover:text-white">
                  <Mail className="size-4 shrink-0" />
                  {a.email}
                </a>
              </div>
            ))}
          </div>
          {convention.organizingCommittee.length > 0 && (
            <div className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-2">
              {convention.organizingCommittee.map((o) => (
                <div key={o.role.en} className="flex justify-between rounded-2xl bg-white/5 px-5 py-3">
                  <span className="text-brand-200">{t(o.role, lang)}</span>
                  <span>{t(o.name, lang)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== INVITATION ===== */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Pill>{bn ? "আমন্ত্রণপত্র" : "Invitation"}</Pill>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">{bn ? "অনলাইন আমন্ত্রণপত্র" : "Online invitation card"}</h2>
            <p className="mt-4 text-lg text-soft">
              {bn
                ? "আমন্ত্রণপত্রটি প্রিন্ট বা PDF হিসেবে সংরক্ষণ করুন, বন্ধুদের সাথে শেয়ার করুন। রেজিস্ট্রেশন ও পেমেন্টের পর ব্যক্তিগত ইনভাইটেশন কার্ড রেজিস্ট্রেশন সাইট থেকে ডাউনলোড করা যাবে — অনুষ্ঠানে প্রবেশের সময় সেটি সঙ্গে আনতে হবে।"
                : "Print or save this invitation as a PDF and share it with friends. Your personal invitation card can be downloaded from the registration site after payment — bring it with you for entry."}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={href(lang, "/convention-2027/invitation")} className="inline-flex items-center gap-2 rounded-full bg-brand-500/15 px-6 py-3 font-semibold text-white hover:bg-brand-500">
                <Download className="size-5" />
                {bn ? "আমন্ত্রণপত্র ডাউনলোড" : "Download invitation"}
              </Link>
              <ButtonLink href={convention.links.verify} external variant="outline">
                {bn ? "আমার ইনভাইটেশন কার্ড" : "My invitation card"}
              </ButtonLink>
            </div>
          </div>
          <div className="lg:rotate-2">
            <InvitationCard lang={lang} />
          </div>
        </div>
      </Section>

      {/* ===== VENUE ===== */}
      <section className="bg-ink-900/50 py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:px-8">
          <div>
            <SectionHead eyebrow={bn ? "ভেন্যু" : "Venue"} title={t(convention.venue, lang)} intro={t(convention.address, lang)} />
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(convention.mapQuery)}`}
              target="_blank"
              rel="noopener"
              className="mt-6 inline-flex items-center gap-2 font-semibold text-brand-300 hover:text-white"
            >
              <MapPin className="size-5" />
              {bn ? "গুগল ম্যাপে দেখুন" : "Open in Google Maps"}
            </a>
          </div>
          <div className="overflow-hidden rounded-3xl shadow-xl ring-1 ring-white/10">
            <iframe src={mapSrc} title="Venue map" className="h-80 w-full sm:h-[26rem]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </section>

      {/* ===== MEMORIES (after event) ===== */}
      <Section id="memories">
        <SectionHead
          eyebrow={bn ? "স্মৃতির পাতা" : "Memories"}
          title={bn ? "মিলনমেলার ছবি ও স্মৃতি" : "Photos & memories"}
          intro={bn ? "অনুষ্ঠান শেষে এখানে ছবি, ভিডিও ও স্মৃতিকথা স্থায়ীভাবে সংরক্ষিত থাকবে।" : "After the event, photos, videos and stories will be preserved here permanently."}
        />
        <div className="mt-10">
          {convention.photos.length ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {convention.photos.map((p) => (
                <div key={p} className="relative aspect-square overflow-hidden rounded-2xl">
                  <Image src={p} alt="" fill sizes="25vw" className="object-cover" />
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title={isOver ? (bn ? "ছবি শীঘ্রই যুক্ত হবে" : "Photos coming soon") : bn ? "৩০ জানুয়ারির পর ছবি ও ভিডিও প্রকাশিত হবে" : "Photos and videos will be published after 30 January"}
            />
          )}
          {convention.videos.length > 0 && (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {convention.videos.map((v) => (
                <div key={v} className="aspect-video overflow-hidden rounded-2xl">
                  <iframe className="size-full" src={`https://www.youtube-nocookie.com/embed/${v}`} title="Video" allowFullScreen loading="lazy" />
                </div>
              ))}
            </div>
          )}
          {t(convention.memories, lang) && <p className="mt-8 text-lg text-soft">{t(convention.memories, lang)}</p>}
          <div className="mt-6 text-center">
            <Link href={href(lang, "/gallery")} className="inline-flex items-center gap-2 font-semibold text-brand-300 hover:text-white">
              <Camera className="size-5" />
              {t(ui.nav.gallery, lang)} →
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
