import type { Metadata } from "next";
import { isLang, t, type L10n, type Lang } from "./i18n";

export type LangParams = { params: Promise<{ lang: string }> };

export async function getLang(params: Promise<{ lang: string }>): Promise<Lang> {
  const { lang } = await params;
  return isLang(lang) ? lang : "bn";
}

export function pageMeta(lang: Lang, title: L10n, path: string, description?: L10n): Metadata {
  return {
    title: t(title, lang),
    description: description ? t(description, lang) : undefined,
    alternates: { canonical: `/${lang}${path}`, languages: { bn: `/bn${path}`, en: `/en${path}` } },
  };
}
