import { z } from "zod";
import { CATEGORIES } from "@/lib/constants";

export const productSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  category: z.enum(CATEGORIES),
  priceMAD: z.number().min(0),
  oldPriceMAD: z.number().min(0).optional().nullable(),
  description: z.string().min(10),
  specs: z.array(z.string().min(1)).min(1),
  tags: z.array(z.string().min(1)).default([]),
  featured: z.boolean().default(false),
  inStock: z.boolean().default(true),
  stockQty: z.number().min(0),
  images: z.array(z.string().url()).min(1),
});
