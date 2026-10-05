import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

type ToastType = "success" | "error" | "info";
type Toast = { id: number; type: ToastType; message: string };

type ToastCtx = {
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
};

const Ctx = createContext<ToastCtx | null>(null);

const estilos: Record<
  ToastType,
  { icon: ReactNode; ring: string; text: string }
> = {
  success: {
    icon: <CheckCircle2 size={18} />,
    ring: "text-emerald-600",
    text: "text-zinc-800",
  },
  error: {
    icon: <AlertCircle size={18} />,
    ring: "text-red-600",
    text: "text-zinc-800",
  },
  info: {
    icon: <Info size={18} />,
    ring: "text-accent",
    text: "text-zinc-800",
  },
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const remove = useCallback(
    (id: number) => setToasts((t) => t.filter((x) => x.id !== id)),
    []
  );

  const push = useCallback(
    (type: ToastType, message: string) => {
      const id = Date.now() + Math.random();
      setToasts((t) => [...t, { id, type, message }]);
      window.setTimeout(() => remove(id), 4000);
    },
    [remove]
  );

  const api: ToastCtx = {
    success: (m) => push("success", m),
    error: (m) => push("error", m),
    info: (m) => push("info", m),
  };

  return (
    <Ctx.Provider value={api}>
      {children}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-full max-w-sm flex-col gap-2"
      >
        {toasts.map((t) => {
          const s = estilos[t.type];
          return (
            <div
              key={t.id}
              className="pointer-events-auto flex items-start gap-3 rounded-xl border border-subtle bg-white px-4 py-3 shadow-pop animate-pop-in"
            >
              <span className={`mt-0.5 ${s.ring}`}>{s.icon}</span>
              <p className={`flex-1 text-sm ${s.text}`}>{t.message}</p>
              <button
                onClick={() => remove(t.id)}
                className="mt-0.5 text-zinc-400 transition-colors hover:text-zinc-700"
                aria-label="Cerrar"
              >
                <X size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </Ctx.Provider>
  );
}

export function useToast() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useToast debe usarse dentro de <ToastProvider>");
  return ctx;
}
