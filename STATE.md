# STATE

_Last updated: 2026-11-07_

## Decisions
- Frontend only (no backend, no forms). Apply/register buttons go to **https://81an.agamievent.org** (the registration form; `content/site.ts → links`).
- Next.js 15 + Tailwind v4, deployed GitHub → Vercel.
- Bengali default (`/bn`), English toggle (`/en`); the toggle keeps you on the same page.
- **Brand (redesign 2026-11-08):** modern SaaS look from the owner's references, with bright electric-blue grainy gradient heroes (`.mesh-hero`), a royal-navy base (`#0a1a4f`), glass cards, animated film grain and a vignette over the whole site, and a grainy gradient "81" logo mark. **No stripes, grid lines or arcs** (owner disliked them). Colours: electric blue `#1F6BFF`, periwinkle `#5B5FE3`, cyan `#22B4FF`, white. Fonts: Syne headings + Inter body (Latin), with Anek Bangla headings + Hind Siliguri body (Bengali).
- Home also has: registration CTA in the hero and header, school marquee, stats, Milonmela feature with countdown and registration timeline, fee "pricing" cards, a 5-step how-to-register guide, the **three event admins with photos**, a feature grid, welcome/vision/mission, events, notices, news, FAQ and a final CTA.
- Committee page shows the 3 event admins (real photos); the executive committee shows "coming soon" with position chips until the real list arrives (`content/committee.ts`).
- Photos only in the **home hero collage** (7 Chattogram landmark photos from Wikimedia Commons, credits in `content/image-credits.json`). Every other page is typographic.
- Member directory: public-safe fields only (no phone/address/email in data).
- Convention data comes from the registration site: Milonmela 2027, 30 Jan 2027, 4:30–11:30 PM, Banquet Hall, Chittagong Club Ltd; registration 1 Nov – 10 Dec 2026; fee ৳1,500 (+2%). The three event admins' photos and contacts are included.

## Progress
- [x] PRD.md, plan.md, STATE.md, README.md (content guide)
- [x] Scaffold, design system, i18n
- [x] Layout shell (convention strip, header with "More" menu + mobile drawer, footer)
- [x] Home (hero collage, about/welcome, vision/mission/objectives, convention band + countdown, committee highlights, events, notices, news, directory CTA)
- [x] About, Committee (hierarchy), Members (search / filters / A–Z), member profile, digital member card (print → PDF)
- [x] Events + detail, Convention 2027 (countdown, schedule, fees, guidelines, guests, admins, invitation card + printable page, map, memories)
- [x] Gallery (albums + lightbox + videos), News + detail, Notice board, Birthdays, Blood directory, Membership, Contact (map + contact persons)
- [x] SEO: metadata, hreflang, sitemap.xml, robots.txt
- [x] QA: type-check clean, production build passes, desktop + mobile (390px) screenshots, no horizontal overflow
- [ ] git init + push to GitHub, connect Vercel

## No dummy data policy (2026-11-08)
The owner asked for **no dummy info**. All invented content was removed: sample members, invented events/news/notices, achievements, office hours, school counts, expected participants, invented perks. Wherever data is missing the site shows "তথ্য শীঘ্রই আসছে / Information coming soon". Only real data remains: the Milonmela 2027 details, fees, schedule, guidelines and admins (from 81an.agamievent.org), plus the organisation intro/vision/mission/future plans taken from the client's brief.

## Deployment
- GitHub: https://github.com/arnobalam10-tech/ekashian-81-ctg (branch `main`)
- Vercel: project linked to that repo, so every push to `main` deploys

## Old notes (superseded)
- `content/members.json`: 24 **sample** members (flagged `sample: true`)
- `content/committee.ts`: empty, waiting for the real executive committee list + photos
- Events/news before Nov 2026 (reunion 2026, iftar, etc.) are illustrative
- Office address, office hours, official email, Facebook/YouTube links
- Chief/special guests, registered count, gallery photos, videos
- Domain (`site.url` = ekashian81ctg.org placeholder)

## Notes
- Admin 01's phone on the registration site is `+88-01819-64692` (10 digits, probably missing a digit). It's copied as published; please confirm.
