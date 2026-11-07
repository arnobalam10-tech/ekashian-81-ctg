# Build Plan

## Stack
- Next.js 15 (App Router, TypeScript), Tailwind CSS v4, `next/font`, `next/image`
- Statically generated pages (SSG) with no runtime backend
- Hosting: GitHub → Vercel (auto deploy on push)
- Bilingual routes: `app/[lang]/...` with `lang ∈ {bn, en}`; dictionary in `lib/i18n.ts`

## Folder layout
```
app/[lang]/(pages)…      route pages
components/               UI building blocks
content/                  ALL editable data (members, committee, events, news…)
public/images/            site photography (Chattogram, colleges)
public/members/           member photos (filename = membership ID)
public/committee/         committee photos
lib/                      i18n, helpers, data loaders
```

## Phases
1. **Docs & scaffold**: PRD, plan, STATE; Next.js + Tailwind; fonts; design tokens; i18n.
2. **Imagery**: download Chattogram and college photos into `/public/images`, with credits.
3. **Layout shell**: header (sticky, glass, language toggle, mobile drawer), footer, Convention banner strip.
4. **Home page**: every section from the PRD.
5. **Inner pages**: About, Committee (hierarchy), Members (search / filter / A–Z) and profile and card, Events and detail, Convention 2027 (countdown, invitation), Gallery (lightbox, videos), News and detail, Notices, Birthdays, Blood groups, Membership, Contact.
6. **SEO**: metadata, sitemap, robots, hreflang.
7. **QA**: build, browser check desktop and mobile, both languages.
8. **Deploy**: git init, GitHub repo, Vercel project (when the owner is ready).

## Phase 2 (future, optional backend)
Supabase (Postgres + Auth + Storage + RLS) for member login, self-edit, admin dashboard, approvals, auto IDs, private contact fields, exports, and email/SMS notifications. The content model in `/content` maps 1:1 to tables, so the migration is a data-source swap.

## How to update content
1. Edit the file in `/content` (or drop photos in `/public/members` named `<ID>.jpg`).
2. `git add . && git commit -m "update members" && git push`
3. Vercel redeploys in about a minute.
