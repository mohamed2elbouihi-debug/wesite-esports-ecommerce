import Link from "next/link";
import { CATEGORIES } from "@/lib/constants";

export const CategoryGrid = () => (
  <div className="grid gap-4 md:grid-cols-4">
    {CATEGORIES.map((category) => (
      <Link
        key={category}
        href={`/shop?category=${encodeURIComponent(category)}`}
        className="rounded-2xl border border-border bg-card px-6 py-4 text-sm font-semibold transition hover:border-primary"
      >
        {category}
      </Link>
    ))}
  </div>
);
