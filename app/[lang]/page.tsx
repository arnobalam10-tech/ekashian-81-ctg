import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  Bell,
  Cake,
  CalendarDays,
  Camera,
  Check,
  Clock,
  CreditCard,
  Droplet,
  FileText,
  MapPin,
  Quote,
  Search,
  Shirt,
  Smartphone,
  Sparkles,
  Ticket,
  Users,
  Wallet,
} from "lucide-react";
import { site } from "@/content/site";
import { convention } from "@/content/convention";
import { news, notices } from "@/content/news";
import { formatDate, href, isLang, num, t, ui, type Lang } from "@/lib/i18n";
import { members, upcomingEvents, pastEvents, initials } from "@/lib/data";
import HeroCollage from "@/components/HeroCollage";
import Countdown from "@/components/Countdown";
import RegTimeline from "@/components/RegTimeline";
import Faq from "@/components/Faq";
import { LogoMark } from "@/components/Logo";
import { Atmosphere, Avatar, ButtonLink, IconBox, Pill, Section, SectionHead } from "@/components/ui";
import { AdminCard, EventCard, NewsCard } from "@/components/cards";

export const revalidate = 3600;


export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: l } = await params;
  const lang = (isLang(l) ? l : "bn") as Lang;
  const bn = lang === "bn";
  const memberCount = site.stats.members ?? members.length;
  const upcoming = upcomingEvents()
    .filter((e) => e.category !== "convention")
    .slice(0, 3);
  const recent = pastEvents().slice(0, 2);
  const today = new Date().toISOString().slice(0, 10);
  const regOpen = today >= convention.registration.opens && today <= convention.registration.closes;
  const reg = convention.links.register;
  const sample = members[0];

  const steps = [
    { icon: FileText, t: bn ? "অনলাইন ফরম পূরণ" : "Fill the online form", d: bn ? "নাম, পেশা, ঠিকানা, মোবাইল ও স্কুলের নাম।" : "Name, profession, address, mobile and school." },
    { icon: Camera, t: bn ? "ছবি আপলোড" : "Upload your photo", d: bn ? "পাসপোর্ট সাইজ ছবি — বাধ্যতামূলক।" : "Passport-size photo — required." },
    { icon: Shirt, t: bn ? "টি-শার্ট সাইজ" : "Pick T-shirt size", d: bn ? "পুরুষ S–XXXL, মহিলা S–XXL।" : "Men S–XXXL, Women S–XXL." },
    { icon: Wallet, t: bn ? "bKash-এ পেমেন্ট" : "Pay with bKash", d: bn ? "OTP ও পিন দিয়ে নিরাপদ পেমেন্ট।" : "Secure payment with OTP and PIN." },
    { icon: Ticket, t: bn ? "কার্ড ডাউনলোড" : "Download your card", d: bn ? "ইনভাইটেশন কার্ড ও মানি রিসিপ্ট সাথে সাথে।" : "Invitation card and receipt instantly." },
  ];

  const faqs = bn
    ? [
        { q: "কারা মিলনমেলায় রেজিস্ট্রেশন করতে পারবেন?", a: "১৯৮১ সালে এসএসসি পাস করা চট্টগ্রাম বিভাগের সকল বন্ধু। পরিবারের সদস্য ও ড্রাইভারদের জন্য আলাদা ক্যাটাগরি রয়েছে।" },
        { q: "রেজিস্ট্রেশন ফি কত এবং কীভাবে দেব?", a: "ব্যাচ '৮১-এর বন্ধুদের জন্য ৳১,৫০০ (+২% চার্জ, মোট ৳১,৫৩০)। ড্রাইভার ৳৪০০ (+২%)। পেমেন্ট শুধুমাত্র bKash-এ অনলাইনে।" },
        { q: "রেজিস্ট্রেশনের শেষ তারিখ কবে?", a: `${formatDate(convention.registration.closes, lang)}। দেরি না করে আজই রেজিস্ট্রেশন করুন।` },
        {
          q: "ইনভাইটেশন কার্ড কোথায় পাব?",
          a: "পেমেন্ট সম্পন্ন হলে সাথে সাথে ইনভাইটেশন কার্ড ও মানি রিসিপ্ট ডাউনলোড করা যাবে। পরে 'রেজিস্ট্রেশন যাচাই' পাতা থেকেও পাওয়া যাবে। অনুষ্ঠানে প্রবেশের সময় কার্ড সঙ্গে আনতে হবে।",
        },
        { q: "স্ত্রী/স্বামী ও সন্তানদের ফি কত?", a: "পরিবারের সদস্যদের ফি আয়োজক কমিটি পরবর্তীতে নির্ধারণ করে জানিয়ে দেবে।" },
        { q: "সমস্যা হলে কার সাথে যোগাযোগ করব?", a: "নিচে দেওয়া তিনজন ইভেন্ট অ্যাডমিনের যেকোনো একজনকে কল বা ইমেইল করুন।" },
      ]
    : [
        { q: "Who can register for the Milonmela?", a: "Every friend from Chattogram Division who passed SSC in 1981. Family members and drivers have separate categories." },
        { q: "How much is the fee and how do I pay?", a: "৳1,500 for Batch '81 friends (+2% charge, total ৳1,530). Drivers ৳400 (+2%). Payment is online via bKash only." },
        { q: "When does registration close?", a: `${formatDate(convention.registration.closes, lang)}. Register today so you don't miss out.` },
        {
          q: "Where do I get my invitation card?",
          a: "Right after payment you can download your invitation card and receipt. You can also get it later from the 'Verify registration' page. Bring it for entry.",
        },
        { q: "What about spouses and children?", a: "The organising committee will announce the family-member fee later." },
        { q: "Who do I contact if something goes wrong?", a: "Call or email any of the three event admins listed below." },
      ];

  return (
    <>
      {/* ═════════════ HERO ═════════════ */}
      <section className="relative overflow-hidden pb-24 pt-36 sm:pt-44 lg:pb-36">
        <Atmosphere variant="hero" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:px-8">
          <div className="animate-fade-up">
            <a
              href={reg}
              target="_blank"
              rel="noopener"
              className="group inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[.05] py-1 pl-1 pr-3 text-[13px] text-soft backdrop-blur transition hover:border-brand-400/60"
            >
              <span className="rounded-full bg-brand-500 px-2.5 py-0.5 text-[11px] font-semibold text-white">{regOpen ? (bn ? "চলছে" : "LIVE") : "2027"}</span>
              {bn ? "মিলনমেলা ২০২৭ — রেজিস্ট্রেশন চলছে" : "Milonmela 2027 — registration is open"}
              <ArrowUpRight className="size-3.5 transition group-hover:rotate-45" />
            </a>
            <h1 className="mt-7 text-balance text-[2.75rem] font-bold leading-[1.02] sm:text-6xl xl:text-[5.2rem]">
              <span className="text-grad">{bn ? "স্মৃতির টানে," : "Drawn by memories,"}</span>
              <br />
              <span className="text-shine">{bn ? "আবার একসাথে।" : "together again."}</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg text-soft">{t(site.intro, lang)}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href={reg} target="_blank" rel="noopener" className="btn btn-light !px-6 !py-3.5 !text-base shadow-[0_14px_40px_-10px_rgba(6,20,70,.6)]">
                <Sparkles className="size-4" /> {bn ? "মিলনমেলায় রেজিস্ট্রেশন করুন" : "Register for Milonmela 2027"}
              </a>
              <Link href={href(lang, "/members")} className="btn btn-ghost !px-6 !py-3.5 !text-base">
                <Search className="size-4" /> {bn ? "বন্ধু খুঁজুন" : "Find a friend"}
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-3">
                {convention.admins.map((a) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={a.email} src={a.photo} alt="" className="size-10 rounded-full object-cover object-top ring-2 ring-ink-950" />
                ))}
              </div>
              <p className="text-sm text-soft">
                <span className="font-semibold text-white">{bn ? "ইভেন্ট অ্যাডমিন" : "Event admins"}</span> {bn ? "· যেকোনো প্রশ্নে যোগাযোগ করুন" : "· here to help with registration"}
              </p>
            </div>
          </div>

          <div className="relative animate-fade-up [animation-delay:.15s]">
            <HeroCollage lang={lang} />
            {/* floating countdown widget */}
            <Link href={href(lang, "/convention-2027")} className="glass grain absolute -bottom-12 -left-3 hidden w-[330px] rounded-3xl p-4 shadow-2xl shadow-black/60 sm:block lg:-left-12">
              <div className="flex items-center gap-3">
                <Image src={convention.emblem} alt="" width={44} height={44} className="rounded-full bg-white p-0.5" />
                <div className="min-w-0">
                  <p className="label !text-[10px]">{bn ? "কাউন্টডাউন" : "Countdown"}</p>
                  <p className="truncate text-sm font-semibold text-white">{t(convention.title, lang)}</p>
                </div>
              </div>
              <div className="mt-3">
                <Countdown to={convention.startsAt} lang={lang} size="sm" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ═════════════ SCHOOL MARQUEE ═════════════ */}
      <section className="relative border-y border-white/[.07] bg-ink-900/60 py-7">
        <p className="label mb-5 text-center !text-dim">{bn ? "মিলনমেলা ২০২৭-এ যা থাকছে" : "What's on at Milonmela 2027"}</p>
        <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
          <div className="flex w-max animate-marquee gap-10">
            {[...convention.schedule, ...convention.schedule].map((s, i) => (
              <span key={i} className="flex items-center gap-3 whitespace-nowrap font-display text-lg font-semibold text-white/40">
                <span className="size-1.5 rounded-full bg-brand-400/70" />
                {t(s, lang)}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════ STATS ═════════════ */}
      <Section className="!py-16">
        <div className="card grain grid grid-cols-2 divide-white/10 overflow-hidden lg:grid-cols-4 lg:divide-x">
          {[
            memberCount > 0
              ? { n: num(memberCount, lang), l: bn ? "নিবন্ধিত সদস্য" : "Registered members" }
              : { n: num(1981, lang), l: bn ? "এসএসসি ব্যাচ" : "SSC batch" },
            { n: num(site.stats.districts, lang), l: bn ? "জেলা · চট্টগ্রাম বিভাগ" : "Districts · Chattogram Division" },
            { n: formatDate(convention.registration.closes, lang, { year: false }), l: bn ? "রেজিস্ট্রেশনের শেষ দিন" : "Registration closes" },
            { n: formatDate(convention.date, lang, { year: false }), l: bn ? "মিলনমেলা ২০২৭" : "Milonmela 2027" },
          ].map((s) => (
            <div key={s.l} className="p-6 sm:p-8">
              <div className="text-grad font-display text-4xl font-bold sm:text-6xl">{s.n}</div>
              <div className="mt-2 text-sm text-soft">{s.l}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* ═════════════ MILONMELA 2027 FEATURE ═════════════ */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <Atmosphere variant="violet" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_1.15fr] lg:px-8">
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute inset-0 animate-pulse rounded-full bg-brand-500/40 blur-3xl" />
            <div className="relative aspect-square rounded-full border border-white/15 p-6">
              <div className="absolute inset-3 rounded-full border border-dashed border-white/10" />
              <div className="relative animate-float overflow-hidden rounded-full bg-white p-3 shadow-[0_0_120px_-10px_rgba(31,107,255,.9)]">
                <Image src={convention.emblem} alt={t(convention.title, lang)} width={500} height={500} className="rounded-full" />
              </div>
            </div>
          </div>
          <div>
            <Pill>{t(convention.subtitle, lang)}</Pill>
            <h2 className="text-grad mt-5 text-balance text-4xl font-bold sm:text-6xl">{t(convention.title, lang)}</h2>
            <p className="mt-4 font-display text-xl text-brand-200">“{t(convention.tagline, lang)}”</p>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {[
                { i: CalendarDays, v: `${formatDate(convention.date, lang)}`, s: t(convention.day, lang) },
                { i: Clock, v: t(convention.time, lang), s: bn ? "সময়" : "Time" },
                { i: MapPin, v: bn ? "চিটাগাং ক্লাব" : "Chittagong Club", s: bn ? "ব্যাংকুয়েট হল" : "Banquet Hall" },
              ].map((x) => (
                <div key={x.s} className="card p-4">
                  <x.i className="size-5 text-brand-300" />
                  <p className="mt-3 text-[15px] font-semibold leading-snug text-white">{x.v}</p>
                  <p className="text-xs text-dim">{x.s}</p>
                </div>
              ))}
            </div>
            <div className="mt-7">
              <Countdown to={convention.startsAt} lang={lang} />
            </div>
            <div className="card mt-6 p-5 pb-3">
              <p className="label mb-5">{bn ? "রেজিস্ট্রেশন টাইমলাইন" : "Registration timeline"}</p>
              <RegTimeline opens={convention.registration.opens} closes={convention.registration.closes} event={convention.date} lang={lang} />
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={reg} target="_blank" rel="noopener" className="btn btn-primary">
                {t(ui.register, lang)} <ArrowUpRight className="size-4" />
              </a>
              <a href={convention.links.verify} target="_blank" rel="noopener" className="btn btn-ghost">
                <BadgeCheck className="size-4" />
                {bn ? "রেজিস্ট্রেশন যাচাই" : "Verify registration"}
              </a>
              <Link href={href(lang, "/convention-2027")} className="btn btn-ghost">
                {t(ui.learnMore, lang)}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════ PRICING ═════════════ */}
      <Section>
        <SectionHead
          align="center"
          eyebrow={bn ? "রেজিস্ট্রেশন ফি" : "Registration fees"}
          title={bn ? "সহজ, স্বচ্ছ ফি" : "Simple, transparent fees"}
          intro={
            bn
              ? `রেজিস্ট্রেশন চলবে ${formatDate(convention.registration.closes, lang)} পর্যন্ত · bKash-এ অনলাইন পেমেন্ট`
              : `Registration open until ${formatDate(convention.registration.closes, lang)} · online payment via bKash`
          }
        />
        <div className="mx-auto mt-14 grid max-w-5xl gap-5 md:grid-cols-3">
          {[
            {
              name: bn ? "প্রাক্তন শিক্ষার্থী / বন্ধু" : "Alumni / Friend",
              note: bn ? "মূল অংশগ্রহণকারী · ব্যাচ '৮১" : "Main participant · Batch '81",
              price: bn ? "৳১,৫০০" : "৳1,500",
              sub: bn ? "+ ২% চার্জ · মোট ৳১,৫৩০" : "+ 2% charge · total ৳1,530",
              hot: true,
              perks: bn ? ["ব্যাজ ও টি-শার্ট", "বৈকালিক নাশতা ও নৈশভোজ", "সাংস্কৃতিক সন্ধ্যা", "র‍্যাফেল ড্র"] : ["Badge & T-shirt", "Snacks & dinner", "Cultural evening", "Raffle draw"],
            },
            {
              name: bn ? "স্ত্রী / স্বামী / সন্তান" : "Spouse / Children",
              note: bn ? "পরিবারের সদস্য" : "Family members",
              price: bn ? "শীঘ্রই" : "Soon",
              sub: bn ? "আয়োজক কমিটি নির্ধারণ করবে" : "To be announced by the committee",
              hot: false,
              perks: [] as string[],
            },
            {
              name: bn ? "ড্রাইভার" : "Driver",
              note: bn ? "ব্যক্তিগত গাড়ির চালক" : "Personal car driver",
              price: bn ? "৳৪০০" : "৳400",
              sub: bn ? "+ ২% চার্জ · মোট ৳৪০৮" : "+ 2% charge · total ৳408",
              hot: false,
              perks: [] as string[],
            },
          ].map((p) => (
            <div key={p.name} className={`card grain relative flex flex-col p-7 ${p.hot ? "ring-grad bg-gradient-to-b from-brand-500/20 to-transparent md:-translate-y-4" : ""}`}>
              {p.hot && (
                <span className="absolute -top-3 left-7 rounded-full bg-brand-500 px-3 py-1 text-[11px] font-semibold text-white shadow-lg shadow-brand-500/40">
                  {bn ? "মূল ক্যাটাগরি" : "Main category"}
                </span>
              )}
              <p className="text-lg font-semibold text-white">{p.name}</p>
              <p className="text-sm text-dim">{p.note}</p>
              <p className="mt-6 font-display text-5xl font-bold text-white">{p.price}</p>
              <p className="mt-1 text-sm text-soft">{p.sub}</p>
              <ul className="mt-6 flex-1 space-y-2.5 text-[15px]">
                {p.perks.map((x) => (
                  <li key={x} className="flex gap-2.5 text-soft">
                    <Check className="mt-1 size-4 shrink-0 text-brand-300" />
                    {x}
                  </li>
                ))}
              </ul>
              <a href={reg} target="_blank" rel="noopener" className={`btn mt-7 w-full ${p.hot ? "btn-primary" : "btn-ghost"}`}>
                {t(ui.register, lang)} <ArrowUpRight className="size-4" />
              </a>
            </div>
          ))}
        </div>
      </Section>

      {/* ═════════════ HOW TO REGISTER ═════════════ */}
      <Section className="!pt-0">
        <SectionHead
          eyebrow={bn ? "৫টি সহজ ধাপ" : "5 easy steps"}
          title={bn ? "কীভাবে রেজিস্ট্রেশন করবেন" : "How to register"}
          action={
            <ButtonLink href={reg} external>
              {bn ? "ফরম খুলুন" : "Open the form"}
            </ButtonLink>
          }
        />
        <ol className="relative mt-12 grid gap-4 md:grid-cols-5">
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-brand-400/50 to-transparent md:block" />
          {steps.map((s, i) => (
            <li key={s.t} className="relative">
              <span className="relative z-10 grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-400 to-violet-500 font-display text-lg font-bold text-white shadow-[0_10px_30px_-8px_rgba(31,107,255,.9)]">
                {num(i + 1, lang)}
              </span>
              <div className="card mt-4 p-5">
                <s.icon className="size-5 text-brand-300" />
                <p className="mt-3 font-semibold text-white">{s.t}</p>
                <p className="mt-1 text-sm text-soft">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* ═════════════ EVENT ADMINS ═════════════ */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <Atmosphere variant="soft" fluted={false} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHead
            eyebrow={bn ? "টিম" : "The team"}
            title={bn ? "ইভেন্ট অ্যাডমিন ও যোগাযোগ" : "Event admins & contacts"}
            intro={
              bn
                ? "অনলাইন রেজিস্ট্রেশন ও অনুষ্ঠান ব্যবস্থাপনার দায়িত্বে যাঁরা — যেকোনো প্রশ্নে সরাসরি যোগাযোগ করুন।"
                : "The people running online registration and the event — reach out directly with any question."
            }
            action={
              <ButtonLink href={href(lang, "/committee")} variant="outline">
                {t(ui.nav.committee, lang)}
              </ButtonLink>
            }
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {convention.admins.map((a) => (
              <AdminCard key={a.email} a={a} lang={lang} />
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════ BENTO: PLATFORM ═════════════ */}
      <Section glow>
        <SectionHead
          align="center"
          eyebrow={bn ? "এক প্ল্যাটফর্মে সব" : "One platform"}
          title={bn ? "একাশিয়ান পরিবারের ডিজিটাল ঠিকানা" : "The digital home of the Ekashian family"}
          intro={bn ? "পুরোনো বন্ধু খোঁজা থেকে জন্মদিনের শুভেচ্ছা — সবকিছু এক জায়গায়।" : "From finding old friends to birthday wishes — everything in one place."}
        />
        <div className="mt-14 grid auto-rows-[minmax(200px,auto)] gap-4 md:grid-cols-6">
          {/* Directory — big */}
          <Link href={href(lang, "/members")} className="card card-hover grain group relative overflow-hidden p-7 md:col-span-4 md:row-span-2">
            <div className="absolute -right-24 -top-24 size-72 rounded-full bg-brand-500/30 blur-3xl" />
            <IconBox>
              <Search className="size-5" />
            </IconBox>
            <h3 className="mt-5 text-2xl font-semibold text-white sm:text-3xl">{bn ? "স্মার্ট সদস্য ডিরেক্টরি" : "Smart member directory"}</h3>
            <p className="mt-2 max-w-md text-soft">
              {bn ? "নাম, স্কুল, জেলা-উপজেলা, পেশা বা সদস্য আইডি — লিখলেই খুঁজে পাবেন।" : "Name, school, district, profession or member ID — just start typing."}
            </p>
            <div className="relative mt-7 rounded-2xl border border-white/10 bg-ink-950/70 p-3">
              <div className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-3 text-soft">
                <Search className="size-4" />
                <span className="text-sm">{bn ? "কলেজিয়েট স্কুল" : "Collegiate School"}</span>
                <span className="ml-0.5 h-4 w-px animate-pulse bg-brand-300" />
              </div>
              <div className="mt-2 space-y-1.5">
                {members.length
                  ? members.slice(0, 3).map((m) => (
                      <div key={m.id} className="flex items-center gap-3 rounded-xl px-3 py-2 transition group-hover:bg-white/[.03]">
                        <Avatar src={m.photo} name={t(m.name, lang)} initials={initials(m.name.en)} size={34} />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-white">{t(m.name, lang)}</p>
                          <p className="truncate text-xs text-dim">{t(m.school, lang)}</p>
                        </div>
                        <span className="font-mono text-[11px] text-brand-300">{m.id}</span>
                      </div>
                    ))
                  : [0, 1, 2].map((i) => (
                      <div key={i} className="flex items-center gap-3 rounded-xl px-3 py-2">
                        <span className="size-[34px] shrink-0 animate-pulse rounded-full bg-white/10" />
                        <div className="flex-1 space-y-1.5">
                          <span className="block h-2.5 w-2/5 animate-pulse rounded-full bg-white/10" />
                          <span className="block h-2 w-3/5 animate-pulse rounded-full bg-white/[.06]" />
                        </div>
                      </div>
                    ))}
                {!members.length && <p className="px-3 pb-1 pt-2 text-sm text-brand-200">{bn ? "সদস্যদের তথ্য শীঘ্রই আসছে" : "Member information coming soon"}</p>}
              </div>
            </div>
          </Link>
          {/* Digital card */}
          <Link href={sample ? href(lang, `/members/${sample.id}/card`) : href(lang, "/members")} className="card card-hover grain group relative overflow-hidden p-7 md:col-span-2 md:row-span-2">
            <IconBox>
              <CreditCard className="size-5" />
            </IconBox>
            <h3 className="mt-5 text-xl font-semibold text-white">{bn ? "ডিজিটাল সদস্য কার্ড" : "Digital member card"}</h3>
            <p className="mt-2 text-sm text-soft">{bn ? "ছবি, নাম ও ইউনিক আইডিসহ — প্রিন্ট বা PDF।" : "Photo, name and unique ID — print or PDF."}</p>
            <div className="relative mt-7 aspect-[1.586/1] rotate-[-4deg] overflow-hidden rounded-2xl bg-[radial-gradient(120%_120%_at_10%_0%,#6fd2ff,#1f6bff_40%,#3b3fc4_75%,#0a1020)] p-4 shadow-2xl shadow-brand-500/30 transition group-hover:rotate-0">
              <div className="relative flex h-full flex-col justify-between">
                <div className="flex justify-between">
                  <LogoMark lang={lang} className="size-7" />
                  <span className="font-mono text-[10px] text-white/80">SSC 1981</span>
                </div>
                <div>
                  <p className="font-semibold text-white">{sample ? t(sample.name, lang) : bn ? "আপনার নাম" : "Your name"}</p>
                  <p className="font-mono text-[11px] text-white/80">{sample ? sample.id : "EK81-CTG-····"}</p>
                </div>
              </div>
            </div>
          </Link>
          {[
            { i: Cake, h: "/birthdays", t: bn ? "জন্মদিন" : "Birthdays", d: bn ? "আজ ও এই মাসে যাঁদের জন্মদিন।" : "Who's celebrating today and this month." },
            { i: Droplet, h: "/blood-groups", t: bn ? "রক্তদাতা নেটওয়ার্ক" : "Blood donor network", d: bn ? "জরুরি প্রয়োজনে বন্ধুর পাশে।" : "Standing by friends in emergencies." },
            { i: Bell, h: "/notices", t: bn ? "ডিজিটাল নোটিশ বোর্ড" : "Digital notice board", d: bn ? "সভা, ঘোষণা ও বিজ্ঞপ্তি।" : "Meetings, announcements and circulars." },
          ].map((f) => (
            <Link key={f.h} href={href(lang, f.h)} className="card card-hover grain group p-7 md:col-span-2">
              <IconBox>
                <f.i className="size-5" />
              </IconBox>
              <h3 className="mt-5 flex items-center justify-between text-xl font-semibold text-white">
                {f.t}
                <ArrowUpRight className="size-4 text-white/30 transition group-hover:rotate-45 group-hover:text-brand-300" />
              </h3>
              <p className="mt-2 text-sm text-soft">{f.d}</p>
            </Link>
          ))}
        </div>
      </Section>

      {/* ═════════════ WELCOME + MISSION ═════════════ */}
      <Section className="!pt-0">
        <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
          <figure className="card grain relative overflow-hidden p-8 sm:p-12">
            <Quote className="relative size-10 text-brand-400" />
            <h3 className="relative mt-6 text-2xl font-semibold text-white sm:text-3xl">{t(site.welcome.title, lang) || (bn ? "আমাদের পরিচয়" : "Who we are")}</h3>
            <blockquote className="relative mt-5 text-[17px] leading-relaxed text-soft">{t(site.welcome.body, lang) || t(site.intro, lang)}</blockquote>
            <figcaption className="relative mt-8 flex items-center gap-3 border-t border-white/10 pt-6">
              <LogoMark lang={lang} className="size-10" />
              <span>
                <span className="block font-semibold text-white">{t(site.chapterName, lang)}</span>
                <span className="text-sm text-dim">{t(site.name, lang)}</span>
              </span>
            </figcaption>
          </figure>
          <div className="grid gap-5">
            {[
              { k: bn ? "রূপকল্প" : "Vision", v: t(site.vision, lang) },
              { k: bn ? "মিশন" : "Mission", v: t(site.mission, lang) },
            ].map((x) => (
              <div key={x.k} className="card p-7">
                <p className="label">{x.k}</p>
                <p className="mt-3 text-white/90">{x.v}</p>
              </div>
            ))}
            <Link href={href(lang, "/about")} className="card card-hover flex items-center justify-between p-7">
              <span className="font-semibold text-white">{bn ? "আমাদের গল্প পড়ুন" : "Read our story"}</span>
              <ArrowUpRight className="size-5 text-brand-300" />
            </Link>
          </div>
        </div>
      </Section>

      {/* ═════════════ EVENTS + NOTICES ═════════════ */}
      <Section glow className="!pt-0">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <SectionHead
              eyebrow={bn ? "অনুষ্ঠান" : "Events"}
              title={bn ? "আসন্ন অনুষ্ঠান" : "Upcoming events"}
              action={
                <Link href={href(lang, "/events")} className="text-sm font-semibold text-brand-300 hover:text-white">
                  {t(ui.viewAll, lang)} →
                </Link>
              }
            />
            <div className="mt-8 space-y-3">
              {upcoming.map((e) => (
                <EventCard key={e.slug} e={e} lang={lang} />
              ))}
              {recent.map((e) => (
                <EventCard key={e.slug} e={e} lang={lang} />
              ))}
              {!upcoming.length && !recent.length && (
                <>
                  {upcomingEvents().map((e) => (
                    <EventCard key={e.slug} e={e} lang={lang} />
                  ))}
                  <p className="card p-5 text-soft">{bn ? "অন্যান্য অনুষ্ঠানের তথ্য শীঘ্রই আসছে।" : "More events coming soon."}</p>
                </>
              )}
            </div>
          </div>
          <div>
            <SectionHead eyebrow={bn ? "নোটিশ" : "Notices"} title={t(ui.nav.notices, lang)} />
            <div className="card mt-8 overflow-hidden">
              {notices.slice(0, 4).map((n) => (
                <div key={n.id} className="border-b border-white/[.07] p-5 last:border-0">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-mono text-dim">{formatDate(n.date, lang)}</span>
                    {n.important && <span className="rounded-full bg-rose-500/15 px-2 py-0.5 font-semibold text-rose-300 ring-1 ring-rose-400/30">{bn ? "জরুরি" : "Important"}</span>}
                  </div>
                  <p className="mt-1.5 font-semibold text-white">{t(n.title, lang)}</p>
                  <p className="mt-1 text-sm text-soft">{t(n.body, lang)}</p>
                </div>
              ))}
              <Link href={href(lang, "/notices")} className="block border-t border-white/[.07] bg-white/[.02] px-5 py-3.5 text-center text-sm font-semibold text-brand-300 hover:text-white">
                {t(ui.viewAll, lang)} →
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* ═════════════ NEWS ═════════════ */}
      <Section glow className="!pt-0">
        <SectionHead
          eyebrow={bn ? "সংবাদ" : "News"}
          title={bn ? "সর্বশেষ সংবাদ" : "Latest news"}
          action={
            <ButtonLink href={href(lang, "/news")} variant="outline">
              {t(ui.viewAll, lang)}
            </ButtonLink>
          }
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {news.slice(0, 3).map((n) => (
            <NewsCard key={n.slug} n={n} lang={lang} />
          ))}
        </div>
      </Section>

      {/* ═════════════ FAQ ═════════════ */}
      <Section glow className="!pt-0">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionHead
              eyebrow="FAQ"
              title={bn ? "সাধারণ জিজ্ঞাসা" : "Frequently asked"}
              intro={bn ? "রেজিস্ট্রেশন ও মিলনমেলা নিয়ে আপনার প্রশ্নের উত্তর।" : "Answers about registration and the Milonmela."}
            />
            <div className="card mt-8 p-6">
              <Smartphone className="size-6 text-brand-300" />
              <p className="mt-3 font-semibold text-white">{bn ? "গুগল ক্রোমে রেজিস্ট্রেশন করুন" : "Use Google Chrome to register"}</p>
              <p className="mt-1 text-sm text-soft">{bn ? "রেজিস্ট্রেশন সাইট ক্রোম বা ফায়ারফক্সে সবচেয়ে ভালো কাজ করে।" : "The registration site works best in Chrome or Firefox."}</p>
            </div>
          </div>
          <Faq items={faqs} />
        </div>
      </Section>

      {/* ═════════════ FINAL CTA ═════════════ */}
      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grain relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-white/10 px-6 py-20 text-center sm:px-14 sm:py-28">
          <Atmosphere variant="hero" />
          <div className="relative">
            <Users className="mx-auto size-10 text-brand-200" />
            <h2 className="text-grad mx-auto mt-6 max-w-3xl text-balance text-4xl font-bold sm:text-6xl">{bn ? "৩০ জানুয়ারি, আবার দেখা হবে।" : "See you again on 30 January."}</h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-soft">
              {bn
                ? `রেজিস্ট্রেশনের শেষ তারিখ ${formatDate(convention.registration.closes, lang)}। আসন সীমিত — আজই নিশ্চিত করুন।`
                : `Registration closes ${formatDate(convention.registration.closes, lang)}. Seats are limited — secure yours today.`}
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <a href={reg} target="_blank" rel="noopener" className="btn btn-primary !px-7 !py-4 !text-base">
                <Sparkles className="size-4" />
                {bn ? "এখনই রেজিস্ট্রেশন করুন" : "Register now"}
              </a>
              <a href={site.links.apply} target="_blank" rel="noopener" className="btn btn-light !px-7 !py-4 !text-base">
                {t(ui.applyNow, lang)}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
