"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { formatMAD } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCart();

  return (
    <div className="mx-auto max-w-4xl py-10 container-padding">
      <h1 className="text-2xl font-semibold">Panier</h1>
      {items.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-border bg-card p-6 text-center">
          <p className="text-sm text-white/60">Votre panier est vide.</p>
          <Link href="/shop">
            <Button className="mt-4">Découvrir la boutique</Button>
          </Link>
        </div>
      ) : (
        <div className="mt-6 space-y-6">
          {items.map((item) => (
            <div
              key={item.productId}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 md:flex-row md:items-center"
            >
              {item.image ? (
                <div className="relative h-24 w-24 overflow-hidden rounded-xl">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
              ) : null}
              <div className="flex-1">
                <p className="text-sm font-semibold">{item.name}</p>
                <p className="text-xs text-white/60">{formatMAD(item.priceMAD)}</p>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(event) =>
                    updateQuantity(item.productId, Number(event.target.value))
                  }
                  className="w-20 rounded-xl border border-border bg-card px-3 py-2 text-sm"
                />
                <Button variant="ghost" onClick={() => removeItem(item.productId)}>
                  Retirer
                </Button>
              </div>
            </div>
          ))}
          <div className="flex flex-col items-end gap-4">
            <p className="text-lg font-semibold">Total: {formatMAD(total)}</p>
            <Link href="/checkout">
              <Button>Passer au paiement</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
