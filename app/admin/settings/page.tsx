"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { db } from "@/lib/firebase";
import { settingsSchema } from "@/schemas/settings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function AdminSettingsPage() {
  const { user, loading } = useAdminAuth();
  const form = useForm({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      storeName: "Wesite Esports",
      whatsappNumber: "+212",
      shippingPriceMAD: 40,
      freeShippingThresholdMAD: 800,
      homepageBanner: "Livraison rapide partout au Maroc.",
    },
  });

  useEffect(() => {
    const fetchSettings = async () => {
      const snapshot = await getDoc(doc(db, "settings", "store"));
      if (snapshot.exists()) {
        form.reset(snapshot.data());
      }
    };
    fetchSettings();
  }, [form]);

  const onSubmit = async (values: any) => {
    await setDoc(doc(db, "settings", "store"), values, { merge: true });
  };

  if (loading) {
    return <div className="mx-auto max-w-4xl py-10">Chargement...</div>;
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-3xl py-16 text-center">
        <p className="text-sm text-white/60">
          Accès admin requis pour modifier les paramètres.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl py-10 container-padding">
      <h1 className="text-2xl font-semibold">Paramètres</h1>
      <Card className="mt-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Input placeholder="Nom de la boutique" {...form.register("storeName")} />
          <Input placeholder="WhatsApp" {...form.register("whatsappNumber")} />
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              type="number"
              placeholder="Frais de livraison"
              {...form.register("shippingPriceMAD", { valueAsNumber: true })}
            />
            <Input
              type="number"
              placeholder="Livraison gratuite dès"
              {...form.register("freeShippingThresholdMAD", { valueAsNumber: true })}
            />
          </div>
          <Input placeholder="Bannière accueil" {...form.register("homepageBanner")} />
          <Button type="submit" className="w-full">
            Sauvegarder
          </Button>
        </form>
      </Card>
    </div>
  );
}
