import { z } from "zod";

export const createProductoSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }),
  sku: z.string({
    required_error: "SKU is required",
  }),
  credits: z.string().optional(),
  date: z.string().datetime().optional(),
  isPublic: z.boolean().optional(),
  quantity: z.number().optional(),
  price: z.number().optional(), 
});
