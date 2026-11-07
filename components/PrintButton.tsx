"use client";

import { Printer } from "lucide-react";

export default function PrintButton({ label, className = "" }: { label: string; className?: string }) {
  return (
    <button
      onClick={() => window.print()}
      className={`no-print inline-flex items-center gap-2 rounded-full bg-brand-500/15 px-6 py-3 font-semibold text-white shadow-lg shadow-black/30 hover:bg-brand-500 ${className}`}
    >
      <Printer className="size-5" /> {label}
    </button>
  );
}
