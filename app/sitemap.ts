import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { LANGS } from "@/lib/i18n";
import { members } from "@/lib/data";
import { news } from "@/content/news";
import { events } from "@/content/events";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "", "/about", "/committee", "/members", "/events", "/convention-2027", "/gallery", "/news",
    "/notices", "/birthdays", "/blood-groups", "/membership", "/contact",
    ...members.map((m) => `/members/${m.id}`),
    ...news.map((n) => `/news/${n.slug}`),
    ...events.filter((e) => e.category !== "convention").map((e) => `/events/${e.slug}`),
  ];
  return paths.flatMap((p) =>
    LANGS.map((l) => ({
      url: `${site.url}/${l}${p}`,
      alternates: { languages: Object.fromEntries(LANGS.map((x) => [x, `${site.url}/${x}${p}`])) },
    })),
  );
}
