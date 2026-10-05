export type Producto = {
  id: number;
  nombre: string;
  descripcion: string | null;
  precio: string;
  cantidad: number;
  creado_en?: string | null;
  actualizado_en?: string | null;
};

export type PaginacionMeta = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

export type ProductosResponse = {
  success: boolean;
  message: string;
  data: Producto[];
  meta: PaginacionMeta;
  links: Record<string, any>;
};
