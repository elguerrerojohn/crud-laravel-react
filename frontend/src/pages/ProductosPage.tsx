import { useMemo, useState } from "react";
import { Plus, Search, ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import Button from "../shared/ui/Button";
import Input from "../shared/ui/Input";
import ConfirmDialog from "../shared/ui/ConfirmDialog";
import { useToast } from "../shared/ui/toast";
import { useProductos } from "../features/productos/hooks/useProductos";
import TablaProductos from "../features/productos/components/TablaProductos";
import ModalProducto from "../features/productos/components/ModalProducto";
import { Producto } from "../features/productos/types";

export default function ProductosPage() {
  const toast = useToast();
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;

  const params = useMemo(() => ({ q, page, per_page: perPage }), [q, page]);
  const { data, isLoading, error, eliminar } = useProductos(params);

  const [modalOpen, setModalOpen] = useState(false);
  const [editando, setEditando] = useState<Producto | null>(null);
  const [modo, setModo] = useState<"crear" | "editar" | "ver">("crear");

  const [aEliminar, setAEliminar] = useState<Producto | null>(null);

  const confirmarEliminar = async () => {
    if (!aEliminar) return;
    try {
      await eliminar.mutateAsync(aEliminar.id);
      toast.success(`"${aEliminar.nombre}" se eliminó correctamente.`);
      setAEliminar(null);
    } catch (err: any) {
      const msg =
        err?.response?.status === 403
          ? "No tenés permiso para eliminar este producto."
          : "No se pudo eliminar el producto. Intentá de nuevo.";
      toast.error(msg);
    }
  };

  const abrirCrear = () => {
    setModo("crear");
    setEditando(null);
    setModalOpen(true);
  };

  const abrirEditar = (p: Producto) => {
    setModo("editar");
    setEditando(p);
    setModalOpen(true);
  };

  const abrirVer = (p: Producto) => {
    setModo("ver");
    setEditando(p);
    setModalOpen(true);
  };

  const currentPage = data?.meta?.current_page ?? page;
  const totalPages = data?.meta?.last_page ?? 1;
  const total = data?.meta?.total ?? 0;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Encabezado */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            Productos
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            {total.toLocaleString("es-AR")}{" "}
            {total === 1 ? "producto registrado" : "productos registrados"}
          </p>
        </div>
        <Button onClick={abrirCrear}>
          <Plus size={16} />
          Nuevo producto
        </Button>
      </div>

      {/* Búsqueda */}
      <div className="max-w-sm">
        <Input
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setPage(1);
          }}
          placeholder="Buscar por nombre…"
          leftIcon={<Search size={16} />}
          aria-label="Buscar productos"
        />
      </div>

      {error ? (
        <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">
          <AlertCircle size={16} />
          No se pudieron cargar los productos.
        </div>
      ) : null}

      <TablaProductos
        loading={isLoading}
        productos={data?.data ?? []}
        onVer={abrirVer}
        onEditar={abrirEditar}
        onEliminar={(p) => setAEliminar(p)}
      />

      {/* Paginación */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-500">
          Página <span className="font-medium text-zinc-900">{currentPage}</span>{" "}
          de <span className="font-medium text-zinc-900">{totalPages}</span>
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            disabled={currentPage <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            <ChevronLeft size={16} />
            Anterior
          </Button>
          <Button
            variant="secondary"
            size="sm"
            disabled={currentPage >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Siguiente
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>

      <ModalProducto
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        modo={modo}
        producto={editando}
      />

      <ConfirmDialog
        open={aEliminar !== null}
        title="Eliminar producto"
        description={
          aEliminar
            ? `¿Seguro que querés eliminar "${aEliminar.nombre}"? Esta acción no se puede deshacer.`
            : undefined
        }
        confirmLabel="Eliminar"
        loading={eliminar.isPending}
        onConfirm={confirmarEliminar}
        onCancel={() => !eliminar.isPending && setAEliminar(null)}
      />
    </div>
  );
}
