# PRD — EKASHIAN SSC Batch 1981, Chattogram Division Chapter Website

## 1. Summary
A bilingual (বাংলা default / English toggle), image-heavy, premium website for **EKASHIAN – SSC Batch 1981, Chattogram Division Chapter**. It is a **frontend-only** site: all content (members, committee, events, news, notices, gallery) lives in data files inside the repo. The owner edits those files (or sends data to the developer), commits, and `git push` deploys to Vercel.

No backend, no login, no form submission in this phase. Every "Apply / Register" action links to an **external application site** (URL supplied later, kept in one config value).

## 2. Goals
- Represent friendship, unity, dignity and the spirit of the Ekashian family.
- Make it easy to find old classmates (directory search by name, school, district/upazila, profession, membership ID, A–Z).
- Showcase Chattogram: its colleges, schools, river, hills, port and sea, through large photography.
- Give **Convention 2027** a prominent, festive, permanent page.
- Make content updates a matter of editing data files, never code.
- Be ready for other divisional chapters (Dhaka, Rajshahi, Khulna, Sylhet…) later without a rebuild.

## 3. Non-goals (this phase)
- Member login, password recovery, self-service profile edits.
- Admin dashboard, approvals, automatic membership IDs.
- On-site form submissions, SMS/email notifications, payments.
- These are documented as **Phase 2** (Supabase backend) in plan.md.

## 4. Users
| User | Need |
|---|---|
| Members (≈60 yrs old, mostly on mobile) | Large readable text, Bengali first, find friends, see events |
| Public / families | Learn about the organisation, see photos, find contacts |
| Committee / site owner | Update content by editing data files and pushing |

## 5. Design
- Layout language follows the reference: full-bleed photo hero with dark gradient, a centred headline, glass cards over the photo, rounded image tiles with a corner arrow button, soft pill labels and big stat numbers.
- **Brand (from the owner's references, 2026-11-08):** modern, premium SaaS feel with bright electric-blue grainy gradients, a royal-navy base, glass cards and a film-grain overlay. No stripes or grid textures.
- **Palette:** electric blue `#1F6BFF`, periwinkle `#5B5FE3`, cyan `#22B4FF`, navy base `#0A1A4F`, white.
- **Type:** Syne (headings) + Inter (body) for Latin; Anek Bangla (headings) + Hind Siliguri (body) for Bengali.
- Mobile-first, with big tap targets, base font ≥ 17px and high contrast.
- Imagery is **restrained**: a single **photo collage in the home hero** (Chittagong College, Collegiate School, CRB, Karnaphuli / Shah Amanat Bridge, Patenga, Court Building). Every other page uses typography, green and gold colour fields, subtle patterns and cards. The only other photos are member and committee portraits and event photos supplied by the owner. Stored locally in `/public/images`, with credits in `content/image-credits.json`.

## 6. Pages & features
1. **Home**: hero with banner and Convention 2027 strip; introduction to Ekashian 1981; welcome message; vision / mission / objectives; stats (registered members, schools, districts, years of friendship); executive committee highlights; latest news, notices and upcoming events; recent photos; membership CTA (external link); contact and social links.
2. **About**: history and background, formation and objectives, vision and mission, activities and achievements, Chattogram chapter intro, organisational structure, future plans.
3. **Members Directory**: card grid with live search (name / school / profession / ID), filters (district, upazila, school, profession, blood group), A–Z jump bar, count. **Public fields only:** name, photo, SSC 1981, school, district/upazila, profession, membership ID, blood group (if the member opts in), short bio. Phone, address and email are **never** stored in the public data. Each profile has a "Contact via committee" button.
4. **Member profile page** `/members/[id]` plus a printable **Digital Membership Card**.
5. **Executive Committee**: visual hierarchy (President → Sr. VP → VPs → GS → Joint GS → secretaries → executive members), each with photo, name, designation, short intro, and phone only when `showPhone: true`.
6. **Events & Activities**: categories (reunion, annual get-together, family gathering, picnic/tour, Iftar Mahfil, social/charity), upcoming vs past, event detail with photos and an external registration link.
7. **Convention 2027** `/convention-2027`: festive banner (30 Jan 2027, Chattogram Club Auditorium), introduction and objectives, live countdown (days/hours/minutes/seconds), registration CTA (external link), expected participants and registered count (from data), chief, special and invited guests, organising committee, schedule and agenda, online invitation card (downloadable as PNG/PDF via print), notices, Google Map, contact, and a post-event gallery/memories section that switches on automatically after the date.
8. **Gallery**: albums by event, reunion photos, "old memories" (historic / school photos), video gallery (YouTube embeds), lightbox.
9. **News & Announcements**: news, announcements, meeting notices, circulars; detail pages.
10. **Notice Board**: pinned and dated notices, with an "important" badge.
11. **Birthdays**: this month's and today's birthdays, from the day and month only (no birth year).
12. **Blood Group Directory**: filter by group and district; contact via committee.
13. **Membership**: who can join, benefits, process, and an "Apply now" link to the external URL.
14. **Contact**: office address, phones, email, Google Map, social links. No form.
15. **Donation / welfare info** (optional section on About or its own page, from data).

## 7. Content model (`/content/*.ts|json`)
- `site.ts`: names, contacts, socials, external apply / registration URLs, stats overrides, chapter key.
- `members.json`: `{ id, name{bn,en}, photo, school, district, upazila, profession, bloodGroup?, showBloodGroup, birthday? "MM-DD", bio? }`
- `committee.json`: `{ id, name{bn,en}, designation key, rank, photo, phone?, showPhone, intro{bn,en} }`
- `events.json`, `news.json`, `notices.json`, `gallery.json`, `convention-2027.ts`
- All bilingual text uses `{ bn, en }`.

## 8. Non-functional
- Lighthouse ≥ 90 on mobile for performance, SEO and accessibility. `next/image`, lazy loading, AVIF/WebP.
- SEO: per-page metadata in both languages, `hreflang`, sitemap.xml, robots.txt, Open Graph images.
- Routing `/bn/...` and `/en/...`; `/` redirects to `/bn`.
- Multi-chapter ready: chapter-scoped content folder and config so `/dhaka` etc. can be added later.
- HTTPS and hosting via Vercel; the repo is the backup.

## 9. Open items (from owner)
- External application / registration URL(s)
- Real member data and photos; committee list and photos
- Office address, phones, email, social links, logo (if any)
- Convention 2027 guests, schedule and expected count
- Real event and gallery photos
