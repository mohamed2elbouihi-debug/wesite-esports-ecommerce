import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatMAD } from "@/lib/utils";
import type { Product } from "@/types";

export const ProductCard = ({ product }: { product: Product }) => (
  <div className="group rounded-2xl border border-border bg-card p-4 transition hover:border-primary">
    <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
      <Image
        src={product.images[0]}
        alt={product.name}
        fill
        className="object-cover transition group-hover:scale-105"
      />
    </div>
    <div className="mt-4 space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">{product.name}</h3>
        {product.featured ? <Badge>Featured</Badge> : null}
      </div>
      <p className="text-sm text-white/70">{product.description}</p>
      <div className="flex items-center gap-2">
        <span className="text-base font-semibold">
          {formatMAD(product.priceMAD)}
        </span>
        {product.oldPriceMAD ? (
          <span className="text-xs text-white/50 line-through">
            {formatMAD(product.oldPriceMAD)}
          </span>
        ) : null}
      </div>
      <Link href={`/product/${product.slug}`}>
        <Button className="w-full">Voir le produit</Button>
      </Link>
    </div>
  </div>
);
