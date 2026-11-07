"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ImageIcon, X } from "lucide-react";
import type { Album } from "@/lib/types";
import { formatDate, num, t, type Lang } from "@/lib/i18n";
import { ALBUM_KIND_LABEL } from "@/content/gallery";

export default function Gallery({ albums, lang }: { albums: Album[]; lang: Lang }) {
  const bn = lang === "bn";
  const [kind, setKind] = useState<Album["kind"] | "">("");
  const [open, setOpen] = useState<{ a: Album; i: number } | null>(null);
  const shown = kind ? albums.filter((a) => a.kind === kind) : albums;

  useEffect(() => {
    if (!open) return;
    const on = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((o) => o && { ...o, i: (o.i + 1) % o.a.photos.length });
      if (e.key === "ArrowLeft") setOpen((o) => o && { ...o, i: (o.i - 1 + o.a.photos.length) % o.a.photos.length });
    };
    window.addEventListener("keydown", on);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", on);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div>
      <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2">
        {(["", "event", "reunion", "memories"] as const).map((k) => (
          <button
            key={k}
            onClick={() => setKind(k)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold ${kind === k ? "bg-brand-500/15 text-white" : "bg-white/[.04] text-white ring-1 ring-white/10"}`}
          >
            {k ? t(ALBUM_KIND_LABEL[k], lang) : bn ? "সব অ্যালবাম" : "All albums"}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((a) => {
          const cover = a.cover || a.photos[0]?.src;
          return (
            <button
              key={a.slug}
              disabled={!a.photos.length}
              onClick={() => setOpen({ a, i: 0 })}
              className="group overflow-hidden rounded-3xl card text-left transition enabled:hover:-translate-y-1 enabled:hover:shadow-xl disabled:cursor-default"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-brand-500/15">
                {cover ? (
                  <Image src={cover} alt={t(a.title, lang)} fill sizes="(min-width:1024px) 33vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105" />
                ) : (
                  <div className="grid size-full place-items-center bg-[radial-gradient(80%_80%_at_30%_20%,#4d8bff,#1a3690)]">
                    <div className="text-center text-white/70">
                      <ImageIcon className="mx-auto size-10 text-brand-300" />
                      <p className="mt-2 text-sm">{bn ? "ছবি শীঘ্রই আসছে" : "Photos coming soon"}</p>
                    </div>
                  </div>
                )}
                <span className="absolute left-3 top-3 rounded-full bg-black/40 px-3 py-1 text-xs font-semibold text-white backdrop-blur">{t(ALBUM_KIND_LABEL[a.kind], lang)}</span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold text-white">{t(a.title, lang)}</h3>
                <p className="mt-1 text-sm text-soft">
                  {a.date ? formatDate(a.date, lang) + " · " : ""}
                  {num(a.photos.length, lang)} {bn ? "টি ছবি" : "photos"}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {open && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-black/95" role="dialog" aria-modal>
          <div className="flex items-center justify-between p-4 text-white">
            <p className="text-sm">
              {t(open.a.title, lang)} · {num(open.i + 1, lang)}/{num(open.a.photos.length, lang)}
            </p>
            <button onClick={() => setOpen(null)} className="grid size-11 place-items-center rounded-full hover:bg-white/10" aria-label="Close">
              <X className="size-6" />
            </button>
          </div>
          <div className="relative flex-1">
            <Image src={open.a.photos[open.i].src} alt={t(open.a.photos[open.i].caption, lang)} fill sizes="100vw" className="object-contain" />
            {open.a.photos.length > 1 && (
              <>
                <button
                  onClick={() => setOpen({ ...open, i: (open.i - 1 + open.a.photos.length) % open.a.photos.length })}
                  className="absolute left-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
                  aria-label="Previous"
                >
                  <ChevronLeft className="size-6" />
                </button>
                <button
                  onClick={() => setOpen({ ...open, i: (open.i + 1) % open.a.photos.length })}
                  className="absolute right-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
                  aria-label="Next"
                >
                  <ChevronRight className="size-6" />
                </button>
              </>
            )}
          </div>
          {open.a.photos[open.i].caption && <p className="p-4 text-center text-white/80">{t(open.a.photos[open.i].caption, lang)}</p>}
        </div>
      )}
    </div>
  );
}
