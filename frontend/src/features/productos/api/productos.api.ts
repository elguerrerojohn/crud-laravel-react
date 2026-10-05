import { api } from "../../../shared/http/api";
import { Producto, ProductosResponse } from "../types";

export async function listarProductos(params: { q: string; page: number; per_page: number }) {
  const res = await api.get("/api/v1/productos", params);
  return res.data as ProductosResponse;
}

export async function crearProducto(payload: {
  nombre: string;
  descripcion?: string | null;
  precio: number;
  cantidad: number;
}) {
  const res = await api.post("/api/v1/productos", payload);
  return res.data?.data as Producto;
}

export async function actualizarProducto(
  id: number,
  payload: Partial<{ nombre: string; descripcion: string | null; precio: number; cantidad: number }>
) {
  const res = await api.put(`/api/v1/productos/${id}`, payload);
  return res.data?.data as Producto;
}

export async function eliminarProducto(id: number) {
  const res = await api.delete(`/api/v1/productos/${id}`);
  return res.data;
}
