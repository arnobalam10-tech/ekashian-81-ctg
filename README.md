# Ekashian SSC Batch 1981 — Chattogram Division website

Bilingual (বাংলা / English) static website built with Next.js and Tailwind. Every piece of content lives in `/content`; edit it, then `git push`, and Vercel redeploys.

## Run locally
```bash
npm install
npm run dev        # http://localhost:3000  (redirects to /bn)
npm run build      # production build check
```

## Where to edit content

| What | File |
|---|---|
| Contacts, phone, email, social links, apply link, intro/vision/mission | `content/site.ts` |
| About page (history, achievements, plans) | `content/about.ts` |
| **Members** | `content/members.json` |
| **Executive Committee** | `content/committee.ts` (set `COMMITTEE_IS_SAMPLE = false` when real) |
| Events | `content/events.ts` |
| News + Notice board | `content/news.ts` |
| Gallery albums + videos | `content/gallery.ts` |
| Convention 2027 / Milonmela | `content/convention.ts` |

Every text field is bilingual: `{ "bn": "...", "en": "..." }`.

### Adding members
One object per member in `content/members.json`:
```json
{
  "id": "EK81-CTG-0001",
  "name": { "bn": "মোহাম্মদ আবদুল করিম", "en": "Mohammad Abdul Karim" },
  "photo": "/members/EK81-CTG-0001.jpg",
  "school": { "bn": "চট্টগ্রাম কলেজিয়েট স্কুল", "en": "Chittagong Collegiate School" },
  "district": { "bn": "চট্টগ্রাম", "en": "Chattogram" },
  "upazila": { "bn": "কোতোয়ালী", "en": "Kotwali" },
  "profession": { "bn": "চিকিৎসক", "en": "Physician" },
  "bloodGroup": "B+",
  "showBloodGroup": true,
  "birthday": "03-15"
}
```
- Put photos in `public/members/` (square-ish JPG, about 600px).
- **Never add phone numbers, addresses or emails to member records.** The site is public.
- Remove `"sample": true` from records. Once none are left, the "sample data" banners disappear.

### Photos
- Hero collage: `public/images/` (credits in `content/image-credits.json`)
- Committee: `public/committee/`
- Event/gallery photos: `public/gallery/<album>/`, then list them in `content/gallery.ts`

## Deploy
GitHub → Vercel (framework preset: Next.js, no settings needed). Each push to `main` deploys.
