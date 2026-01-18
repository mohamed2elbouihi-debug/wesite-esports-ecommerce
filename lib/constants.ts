export const SITE_NAME = "Wesite Esports";
export const SITE_DESCRIPTION =
  "Boutique premium d'accessoires gaming au Maroc : tapis, souris, claviers et équipements esports.";

export const CATEGORIES = [
  "Mousepads",
  "Mice",
  "Keyboards",
  "Accessories",
] as const;

export const UI_TEXT = {
  heroTitle: "Dominez chaque match",
  heroSubtitle:
    "Accessoires esports premium livrés partout au Maroc. Paiement à la livraison (COD) et support WhatsApp.",
  ctaShop: "Explorer la boutique",
  trustBadges: ["Livraison Maroc", "COD", "Support WhatsApp"],
  cod: "Paiement à la livraison",
};

export const ADMIN_EMAIL_ALLOWLIST =
  process.env.NEXT_PUBLIC_ADMIN_ALLOWLIST?.split(",").map((email) => email.trim()) ?? [];
