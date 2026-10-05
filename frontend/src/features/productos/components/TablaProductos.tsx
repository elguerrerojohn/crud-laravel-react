import { Eye, Pencil, Trash2, PackageOpen } from "lucide-react";
import Button from "../../../shared/ui/Button";
import { Producto } from "../types";

const LOW_STOCK = 20;

const money = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

function StockBadge({ cantidad }: { cantidad: number }) {
  const low = cantidad <= LOW_STOCK;
  const empty = cantidad === 0;
  const tone = empty
    ? "bg-red-50 text-red-700 ring-red-600/20"
    : low
    ? "bg-amber-50 text-amber-700 ring-amber-600/20"
    : "bg-emerald-50 text-emerald-700 ring-emerald-600/20";
  const label = empty ? "Sin stock" : low ? "Stock bajo" : "Disponible";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${tone}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}

function RowSkeleton() {
  return (
    <tr className="border-t border-subtle">
      {[40, 24, 16, 20].map((w, i) => (
        <td key={i} className="px-4 py-3.5">
          <div
            className="h-3.5 animate-pulse rounded bg-zinc-100"
            style={{ width: `${w}%` }}
          />
        </td>
      ))}
      <td className="px-4 py-3.5" />
    </tr>
  );
}

export default function TablaProductos({
  productos,
  loading,
  onEditar,
  onEliminar,
  onVer,
}: {
  productos: Producto[];
  loading: boolean;
  onVer: (p: Producto) => void;
  onEditar: (p: Producto) => void;
  onEliminar: (p: Producto) => void;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-subtle bg-surface shadow-card">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-subtle bg-zinc-50/60 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
              <th className="px-4 py-3 font-medium">Producto</th>
              <th className="px-4 py-3 text-right font-medium">Precio</th>
              <th className="px-4 py-3 text-right font-medium">Cantidad</th>
              <th className="px-4 py-3 font-medium">Estado</th>
              <th className="w-px px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => <RowSkeleton key={i} />)
            ) : productos.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-16">
                  <div className="flex flex-col items-center justify-center gap-3 text-center">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-50 text-zinc-400 ring-1 ring-subtle">
                      <PackageOpen size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-zinc-700">
                        No hay productos
                      </p>
                      <p className="text-xs text-zinc-500">
                        Probá con otra búsqueda o creá uno nuevo.
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              productos.map((p) => (
                <tr
                  key={p.id}
                  className="group border-t border-subtle transition-colors hover:bg-zinc-50/70"
                >
                  <td className="px-4 py-3.5">
                    <div className="font-medium text-zinc-900">{p.nombre}</div>
                    {p.descripcion ? (
                      <div className="mt-0.5 max-w-sm truncate text-xs text-zinc-500">
                        {p.descripcion}
                      </div>
                    ) : null}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5 text-right font-medium tabular-nums text-zinc-900">
                    {money.format(Number(p.precio))}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5 text-right tabular-nums text-zinc-600">
                    {p.cantidad.toLocaleString("es-AR")}
                  </td>
                  <td className="px-4 py-3.5">
                    <StockBadge cantidad={p.cantidad} />
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center justify-end gap-0.5 opacity-60 transition-opacity group-hover:opacity-100">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onVer(p)}
                        title="Ver detalle"
                        aria-label="Ver detalle"
                      >
                        <Eye size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEditar(p)}
                        title="Editar"
                        aria-label="Editar"
                      >
                        <Pencil size={16} />
                      </Button>
                      <Button
                        variant="danger"
                        size="icon"
                        onClick={() => onEliminar(p)}
                        title="Eliminar"
                        aria-label="Eliminar"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
