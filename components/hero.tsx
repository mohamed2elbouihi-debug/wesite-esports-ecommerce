import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UI_TEXT } from "@/lib/constants";

export const Hero = () => (
  <section className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-black via-slate-950 to-slate-900 p-10 shadow-glow">
    <div className="max-w-2xl space-y-4">
      <p className="text-xs uppercase tracking-[0.3em] text-primary">
        Esports Edition
      </p>
      <h1 className="text-3xl font-semibold leading-tight md:text-5xl">
        {UI_TEXT.heroTitle}
      </h1>
      <p className="text-sm text-white/70 md:text-base">{UI_TEXT.heroSubtitle}</p>
      <Link href="/shop">
        <Button>{UI_TEXT.ctaShop}</Button>
      </Link>
    </div>
  </section>
);
