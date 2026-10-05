import { z } from "zod";

export const productoSchema = z.object({
  nombre: z.string().min(2, "El nombre es requerido."),
  descripcion: z.string().optional().nullable(),
  precio: z.coerce.number().gt(0, "El precio debe ser mayor a 0."),
  cantidad: z.coerce.number().int("La cantidad debe ser un entero.").min(0, "Cantidad inválida."),
});

export type ProductoForm = z.infer<typeof productoSchema>;
