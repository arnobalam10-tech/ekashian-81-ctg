import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative grid min-h-[80vh] place-items-center overflow-hidden bg-ink-950 px-4 pt-32 text-center text-white">
      <div aria-hidden className="mesh-hero" />
      <div className="relative">
        <p className="font-display text-8xl font-bold text-white">৪০৪</p>
        <h1 className="mt-4 text-2xl font-semibold">পাতাটি খুঁজে পাওয়া যায়নি · Page not found</h1>
        <Link href="/bn" className="btn btn-light mt-8">
          প্রথম পাতা · Home
        </Link>
      </div>
    </section>
  );
}
