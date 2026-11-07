import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Anek_Bangla, Hind_Siliguri, Inter, JetBrains_Mono, Syne } from "next/font/google";
import "../globals.css";
import { LANGS, isLang, t, type Lang } from "@/lib/i18n";
import { site } from "@/content/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConventionStrip from "@/components/ConventionStrip";

const syne = Syne({ subsets: ["latin"], weight: ["500", "600", "700", "800"], variable: "--font-syne", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const anek = Anek_Bangla({ subsets: ["bengali", "latin"], weight: ["500", "600", "700"], variable: "--font-anek", display: "swap" });
const hind = Hind_Siliguri({ subsets: ["bengali", "latin"], weight: ["400", "500", "600", "700"], variable: "--font-hind", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export const viewport: Viewport = { themeColor: "#04060d", colorScheme: "dark" };

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = (isLang(lang) ? lang : "bn") as Lang;
  const name = `${t(site.name, l)} | ${t(site.chapterName, l)}`;
  return {
    metadataBase: new URL(site.url),
    title: { default: name, template: `%s | ${t(site.name, l)}` },
    description: t(site.intro, l).slice(0, 160),
    icons: { icon: "/brand/icon.svg" },
    alternates: { languages: { bn: "/bn", en: "/en" } },
    openGraph: { type: "website", siteName: name, images: ["/images/hero-karnaphuli.jpg"] },
  };
}

export default async function LangLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return (
    <html lang={lang} className={`${syne.variable} ${inter.variable} ${anek.variable} ${hind.variable} ${mono.variable}`}>
      <body className="font-sans antialiased">
        <ConventionStrip lang={lang} />
        <Header lang={lang} />
        <main className="relative overflow-x-clip">{children}</main>
        <Footer lang={lang} />
      </body>
    </html>
  );
}
