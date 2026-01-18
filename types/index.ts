import { Timestamp } from "firebase/firestore";

export type ProductCategory = "Mousepads" | "Mice" | "Keyboards" | "Accessories";

export type Product = {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  priceMAD: number;
  oldPriceMAD?: number | null;
  description: string;
  specs: string[];
  tags: string[];
  featured: boolean;
  inStock: boolean;
  stockQty: number;
  images: string[];
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

export type OrderItem = {
  productId: string;
  name: string;
  priceMAD: number;
  quantity: number;
  image?: string;
};

export type Order = {
  id: string;
  customerName: string;
  phone: string;
  city: string;
  address: string;
  notes?: string;
  paymentMethod: "COD" | "Stripe";
  status: "pending" | "confirmed" | "shipped" | "delivered" | "canceled";
  items: OrderItem[];
  totalMAD: number;
  adminNotes?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

export type StoreSettings = {
  storeName: string;
  whatsappNumber: string;
  shippingPriceMAD: number;
  freeShippingThresholdMAD: number;
  homepageBanner: string;
};
