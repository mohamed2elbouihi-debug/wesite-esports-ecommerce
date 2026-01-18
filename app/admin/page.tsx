"use client";

import Link from "next/link";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
  const { user, loading } = useAdminAuth();

  if (loading) {
    return <div className="mx-auto max-w-4xl py-10">Chargement...</div>;
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-3xl py-16 text-center">
        <p className="text-sm text-white/60">
          Veuillez vous connecter pour accéder à l'administration.
        </p>
        <Link href="/admin/login">
          <Button className="mt-4">Se connecter</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl py-10 container-padding">
      <h1 className="text-2xl font-semibold">Dashboard Admin</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Card>
          <p className="text-xs text-white/60">Gestion produits</p>
          <h2 className="text-lg font-semibold">Produits</h2>
          <Link href="/admin/products">
            <Button className="mt-4">Gérer</Button>
          </Link>
        </Card>
        <Card>
          <p className="text-xs text-white/60">Suivi commandes</p>
          <h2 className="text-lg font-semibold">Commandes</h2>
          <Link href="/admin/orders">
            <Button className="mt-4">Voir</Button>
          </Link>
        </Card>
        <Card>
          <p className="text-xs text-white/60">Configuration boutique</p>
          <h2 className="text-lg font-semibold">Paramètres</h2>
          <Link href="/admin/settings">
            <Button className="mt-4">Configurer</Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
