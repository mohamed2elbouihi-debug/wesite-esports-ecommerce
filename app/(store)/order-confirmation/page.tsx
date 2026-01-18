import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function OrderConfirmationPage() {
  return (
    <div className="mx-auto max-w-3xl py-16 text-center container-padding">
      <h1 className="text-2xl font-semibold">Commande confirmée</h1>
      <p className="mt-4 text-sm text-white/60">
        Merci pour votre achat ! Notre équipe vous contactera rapidement pour la
        livraison au Maroc.
      </p>
      <Link href="/shop">
        <Button className="mt-6">Continuer vos achats</Button>
      </Link>
    </div>
  );
}
