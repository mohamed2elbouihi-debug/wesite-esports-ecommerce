import { z } from "zod";

export const settingsSchema = z.object({
  storeName: z.string().min(2),
  whatsappNumber: z.string().min(6),
  shippingPriceMAD: z.number().min(0),
  freeShippingThresholdMAD: z.number().min(0),
  homepageBanner: z.string().min(4),
});
