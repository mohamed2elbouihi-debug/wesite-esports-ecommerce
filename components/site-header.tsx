"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { SITE_NAME } from "@/lib/constants";

export const SiteHeader = () => {
  const { items } = useCart();

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between py-4 container-padding">
        <Link href="/" className="text-lg font-semibold tracking-wide">
          {SITE_NAME}
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link href="/shop" className="hover:text-primary">
            Boutique
          </Link>
          <Link href="/shop?featured=true" className="hover:text-primary">
            Nouveautés
          </Link>
          <Link href="/admin" className="hover:text-primary">
            Admin
          </Link>
        </nav>
        <Link href="/cart">
          <Button variant="secondary" className="gap-2">
            <ShoppingCart className="h-4 w-4" />
            Panier ({items.length})
          </Button>
        </Link>
      </div>
    </header>
  );
};
