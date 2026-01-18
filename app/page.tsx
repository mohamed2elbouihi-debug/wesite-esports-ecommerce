"use client";

import { useProducts } from "@/hooks/use-products";
import { sampleProducts } from "@/data/sample-products";
import { Hero } from "@/components/hero";
import { TrustBadges } from "@/components/trust-badges";
import { CategoryGrid } from "@/components/category-grid";
import { ProductCard } from "@/components/product-card";

export default function HomePage() {
  const { data: products } = useProducts({ featured: true });
  const featured = products && products.length > 0 ? products : sampleProducts;

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-12 py-10 container-padding">
      <Hero />
      <TrustBadges />
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Catégories</h2>
        <CategoryGrid />
      </section>
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Produits vedettes</h2>
          <span className="text-sm text-white/50">Sélection esports</span>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
