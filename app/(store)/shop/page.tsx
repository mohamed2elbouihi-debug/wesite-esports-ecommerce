"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useProducts } from "@/hooks/use-products";
import { CATEGORIES } from "@/lib/constants";
import { ProductCard } from "@/components/product-card";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function ShopPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") ?? "";
  const featured = searchParams.get("featured") === "true";
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState("newest");
  const [inStock, setInStock] = useState(false);

  const { data: products = [], isLoading } = useProducts({
    featured,
    category: category || undefined,
    search: search || undefined,
  });

  const filtered = useMemo(() => {
    let list = [...products];
    if (inStock) {
      list = list.filter((product) => product.inStock);
    }
    if (sort === "price-low") {
      list.sort((a, b) => a.priceMAD - b.priceMAD);
    }
    if (sort === "price-high") {
      list.sort((a, b) => b.priceMAD - a.priceMAD);
    }
    return list;
  }, [products, inStock, sort]);

  return (
    <div className="mx-auto max-w-6xl py-10 container-padding">
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <Card className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm font-semibold">Recherche</p>
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Clavier, souris, mousepad..."
            />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold">Catégorie</p>
            <select
              className="w-full rounded-xl border border-border bg-card px-4 py-2 text-sm"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="">Toutes</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold">Tri</p>
            <select
              className="w-full rounded-xl border border-border bg-card px-4 py-2 text-sm"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
            >
              <option value="newest">Nouveautés</option>
              <option value="price-low">Prix croissant</option>
              <option value="price-high">Prix décroissant</option>
            </select>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={inStock}
              onChange={(event) => setInStock(event.target.checked)}
              className="h-4 w-4 rounded border-border bg-card"
            />
            En stock uniquement
          </label>
        </Card>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Boutique</h1>
            <span className="text-sm text-white/60">
              {filtered.length} produits
            </span>
          </div>
          {isLoading ? (
            <p className="text-sm text-white/60">Chargement...</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
