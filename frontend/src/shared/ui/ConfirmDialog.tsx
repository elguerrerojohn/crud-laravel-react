import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import Button from "./Button";

type Props = {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  loading = false,
  onConfirm,
  onCancel,
}: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !loading) onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, loading, onCancel]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm animate-fade-in"
        onClick={() => !loading && onCancel()}
      />

      <div
        role="alertdialog"
        aria-modal="true"
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-subtle bg-white shadow-pop animate-pop-in"
      >
        <div className="flex gap-4 px-6 py-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600 ring-1 ring-red-600/15">
            <AlertTriangle size={20} />
          </div>
          <div className="min-w-0">
            <h2 className="text-base font-semibold text-zinc-900">{title}</h2>
            {description ? (
              <p className="mt-1 text-sm text-zinc-500">{description}</p>
            ) : null}
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-subtle bg-zinc-50/60 px-6 py-4">
          <Button variant="secondary" onClick={onCancel} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button variant="danger-solid" onClick={onConfirm} disabled={loading}>
            {loading ? "Eliminando…" : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
