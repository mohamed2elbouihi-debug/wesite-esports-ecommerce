"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/hooks/use-cart";
import { formatMAD } from "@/lib/utils";
import { orderSchema } from "@/schemas/order";

type OrderFormValues = z.infer<typeof orderSchema>;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clear } = useCart();

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      customerName: "",
      phone: "",
      city: "",
      address: "",
      notes: "",
      paymentMethod: "COD",
      items: items,
      totalMAD: total,
    },
  });

  const onSubmit = async (values: OrderFormValues) => {
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...values,
        items,
        totalMAD: total,
      }),
    });

    if (!response.ok) {
      return;
    }

    clear();
    router.push("/order-confirmation");
  };

  return (
    <div className="mx-auto max-w-4xl py-10 container-padding">
      <h1 className="text-2xl font-semibold">Paiement</h1>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]"
      >
        <div className="space-y-4 rounded-2xl border border-border bg-card p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Input placeholder="Nom complet" {...form.register("customerName")} />
            <Input placeholder="Téléphone" {...form.register("phone")} />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Input placeholder="Ville" {...form.register("city")} />
            <Input placeholder="Adresse" {...form.register("address")} />
          </div>
          <Textarea placeholder="Notes (optionnel)" {...form.register("notes")} />
          <div className="space-y-2">
            <p className="text-sm font-semibold">Méthode de paiement</p>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                value="COD"
                defaultChecked
                {...form.register("paymentMethod")}
              />
              Paiement à la livraison (COD)
            </label>
            <label className="flex items-center gap-2 text-sm text-white/60">
              <input type="radio" value="Stripe" {...form.register("paymentMethod")} />
              Carte bancaire (Stripe - optionnel)
            </label>
          </div>
        </div>
        <div className="space-y-4 rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-semibold">Résumé</h2>
          <div className="space-y-2 text-sm text-white/60">
            {items.map((item) => (
              <div key={item.productId} className="flex justify-between">
                <span>
                  {item.name} x{item.quantity}
                </span>
                <span>{formatMAD(item.priceMAD * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-base font-semibold">
            <span>Total</span>
            <span>{formatMAD(total)}</span>
          </div>
          <Button type="submit" className="w-full">
            Confirmer la commande
          </Button>
        </div>
      </form>
    </div>
  );
}
