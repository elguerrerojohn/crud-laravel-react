import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { actualizarProducto, crearProducto, eliminarProducto, listarProductos } from "../api/productos.api";
import { ProductoForm } from "../schemas/producto.schema";

export function useProductos(params: { q: string; page: number; per_page: number }) {
  const qc = useQueryClient();

  const query = useQuery({
    queryKey: ["productos", params],
    queryFn: () => listarProductos(params),
  });

  const crear = useMutation({
    mutationFn: (payload: ProductoForm) => crearProducto(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["productos"] }),
  });

  const actualizar = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: Partial<ProductoForm> }) =>
      actualizarProducto(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["productos"] }),
  });

  const eliminar = useMutation({
    mutationFn: (id: number) => eliminarProducto(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["productos"] }),
  });

  return { ...query, crear, actualizar, eliminar };
}
