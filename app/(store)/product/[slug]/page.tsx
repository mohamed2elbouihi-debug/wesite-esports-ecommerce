"use client";

import { useParams } from "next/navigation";
import { ProductGallery } from "@/components/product-gallery";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import { useProduct } from "@/hooks/use-product";
import { formatMAD } from "@/lib/utils";
import { sampleProducts } from "@/data/sample-products";

export default function ProductPage() {
  const params = useParams<{ slug: string }>();
  const { data: product } = useProduct(params.slug);
  const fallback = sampleProducts.find((item) => item.slug === params.slug);
  const current = product ?? fallback;
  const { addItem } = useCart();

  if (!current) {
    return (
      <div className="mx-auto max-w-4xl py-16 text-center">
        <p className="text-sm text-white/60">Produit introuvable.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl py-10 container-padding">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <ProductGallery images={current.images} />
        <div className="space-y-6">
          <div className="space-y-2">
            <Badge>{current.category}</Badge>
            <h1 className="text-2xl font-semibold md:text-3xl">
              {current.name}
            </h1>
            <p className="text-sm text-white/60">{current.description}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-semibold">
              {formatMAD(current.priceMAD)}
            </span>
            {current.oldPriceMAD ? (
              <span className="text-sm text-white/50 line-through">
                {formatMAD(current.oldPriceMAD)}
              </span>
            ) : null}
          </div>
          <div className="space-y-3">
            <p className="text-sm font-semibold">Specs</p>
            <ul className="list-disc space-y-1 pl-5 text-sm text-white/70">
              {current.specs.map((spec) => (
                <li key={spec}>{spec}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-white/60">
              {current.inStock
                ? `En stock (${current.stockQty})`
                : "Rupture de stock"}
            </p>
            <Button
              onClick={() => addItem(current)}
              disabled={!current.inStock}
              className="w-full"
            >
              Ajouter au panier
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
