import { z } from "zod";

export const orderItemSchema = z.object({
  productId: z.string().min(1),
  name: z.string().min(1),
  priceMAD: z.number().min(0),
  quantity: z.number().min(1),
  image: z.string().url().optional(),
});

export const orderSchema = z.object({
  customerName: z.string().min(2),
  phone: z.string().min(6),
  city: z.string().min(2),
  address: z.string().min(5),
  notes: z.string().max(500).optional(),
  paymentMethod: z.enum(["COD", "Stripe"]),
  items: z.array(orderItemSchema).min(1),
  totalMAD: z.number().min(0),
});
