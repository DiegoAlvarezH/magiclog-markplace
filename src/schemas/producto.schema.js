import { z } from "zod";

export const createProductoSchema = z.object({
  title: z.string({
    required_error: "Titulo es requerido",
  }),
  sku: z.string({
    required_error: "SKU es requerida",
  }),
  quantity: z.number({
    required_error: "La cantidad es requerida"
  }),
  price: z.number({
    required_error: "El precio es requerido"
  }),
});
