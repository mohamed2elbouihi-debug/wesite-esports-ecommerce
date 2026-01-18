import type { Product } from "@/types";

export const sampleProducts: Product[] = [
  {
    id: "sample-1",
    name: "Mousepad Pro Titan",
    slug: "mousepad-pro-titan",
    category: "Mousepads",
    priceMAD: 299,
    oldPriceMAD: 349,
    description:
      "Surface ultra-lisse avec base antidérapante pour un contrôle précis en esports.",
    specs: ["XL 900x400mm", "Surface micro-texturée", "Base antiglisse"],
    tags: ["esports", "precision"],
    featured: true,
    inStock: true,
    stockQty: 20,
    images: ["/placeholder.svg"],
  },
  {
    id: "sample-2",
    name: "Clavier Storm MK88",
    slug: "clavier-storm-mk88",
    category: "Keyboards",
    priceMAD: 899,
    description:
      "Switches mécaniques premium, RGB discret et châssis aluminium.",
    specs: ["Switches linéaires", "RGB programmable", "USB-C"],
    tags: ["keyboard", "rgb"],
    featured: true,
    inStock: true,
    stockQty: 12,
    images: ["/placeholder.svg"],
  },
  {
    id: "sample-3",
    name: "Souris Phantom X",
    slug: "souris-phantom-x",
    category: "Mice",
    priceMAD: 649,
    oldPriceMAD: 749,
    description:
      "Capteur optique 26K DPI et poids plume pour les FPS compétitifs.",
    specs: ["26K DPI", "65g", "PTFE skates"],
    tags: ["fps", "lightweight"],
    featured: false,
    inStock: true,
    stockQty: 18,
    images: ["/placeholder.svg"],
  },
];
