import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import Button from "../../../shared/ui/Button";
import Input from "../../../shared/ui/Input";
import { useToast } from "../../../shared/ui/toast";
import { productoSchema, ProductoForm } from "../schemas/producto.schema";
import { Producto } from "../types";
import { useProductos } from "../hooks/useProductos";

const titulos = {
  crear: { t: "Nuevo producto", s: "Completá los datos para registrarlo." },
  editar: { t: "Editar producto", s: "Actualizá los datos y guardá los cambios." },
  ver: { t: "Detalle del producto", s: "Vista de solo lectura." },
} as const;

/**
 * Modal para Crear / Editar / Ver.
 */
export default function ModalProducto({
  open,
  onClose,
  modo,
  producto,
}: {
  open: boolean;
  onClose: () => void;
  modo: "crear" | "editar" | "ver";
  producto: Producto | null;
}) {
  const disabled = modo === "ver";
  const toast = useToast();

  // Hook de productos solo para mutaciones: no usamos query aquí
  const { crear, actualizar } = useProductos({ q: "", page: 1, per_page: 10 });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductoForm>({
    resolver: zodResolver(productoSchema),
    defaultValues: { nombre: "", descripcion: "", precio: 1, cantidad: 0 },
  });

  useEffect(() => {
    if (!open) return;
    if (!producto) {
      reset({ nombre: "", descripcion: "", precio: 1, cantidad: 0 });
      return;
    }
    reset({
      nombre: producto.nombre,
      descripcion: producto.descripcion ?? "",
      precio: Number(producto.precio),
      cantidad: producto.cantidad,
    });
  }, [open, producto, reset]);

  // Cerrar con Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const onSubmit = async (values: ProductoForm) => {
    try {
      if (modo === "crear") {
        await crear.mutateAsync(values);
        toast.success(`"${values.nombre}" se creó correctamente.`);
        onClose();
        return;
      }
      if (modo === "editar" && producto) {
        await actualizar.mutateAsync({ id: producto.id, payload: values });
        toast.success(`"${values.nombre}" se actualizó correctamente.`);
        onClose();
      }
    } catch (err: any) {
      const status = err?.response?.status;
      // Solo se muestra el mensaje del backend en errores de validación (422);
      // para el resto, un mensaje genérico para no filtrar detalles internos.
      const msg =
        status === 422
          ? err?.response?.data?.message ?? "Revisá los datos e intentá de nuevo."
          : status === 403
          ? "No tenés permiso para modificar este producto."
          : "No se pudo guardar el producto. Intentá de nuevo.";
      toast.error(msg);
    }
  };

  if (!open) return null;

  const { t, s } = titulos[modo];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-subtle bg-elevated shadow-pop animate-pop-in"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-subtle px-6 py-5">
          <div>
            <h2 className="text-base font-semibold text-zinc-900">{t}</h2>
            <p className="mt-0.5 text-sm text-zinc-500">{s}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Cerrar"
          >
            <X size={18} />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-6 py-5">
          <Input
            label="Nombre"
            disabled={disabled}
            error={errors.nombre?.message}
            {...register("nombre")}
          />

          <div className="space-y-1.5">
            <label
              htmlFor="descripcion"
              className="block text-[13px] font-medium text-zinc-600"
            >
              Descripción
            </label>
            <textarea
              id="descripcion"
              disabled={disabled}
              className="min-h-[90px] w-full rounded-lg border border-subtle bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm outline-none transition-colors hover:border-strong focus:border-accent focus:ring-2 focus:ring-accent/30 disabled:opacity-60 disabled:bg-zinc-50"
              placeholder="Opcional…"
              {...register("descripcion")}
            />
            {errors.descripcion ? (
              <p className="text-xs text-red-600">
                {errors.descripcion.message as string}
              </p>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Precio"
              disabled={disabled}
              type="number"
              step="0.01"
              error={errors.precio?.message}
              {...register("precio")}
            />
            <Input
              label="Cantidad"
              disabled={disabled}
              type="number"
              step="1"
              error={errors.cantidad?.message}
              {...register("cantidad")}
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="secondary" onClick={onClose}>
              {modo === "ver" ? "Cerrar" : "Cancelar"}
            </Button>
            {modo !== "ver" ? (
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Guardando…" : "Guardar cambios"}
              </Button>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
}
