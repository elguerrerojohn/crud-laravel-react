import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Package, AlertCircle } from "lucide-react";
import { useAuth } from "../shared/auth/useAuth";
import Button from "../shared/ui/Button";
import Input from "../shared/ui/Input";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@demo.com");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      navigate("/productos");
    } catch (err: any) {
      const msg = err?.response?.data?.message ?? "No fue posible iniciar sesión.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-sm animate-pop-in">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/20">
            <Package size={22} strokeWidth={2.25} />
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-zinc-900">
            Bienvenido de nuevo
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Ingresá para gestionar tu inventario.
          </p>
        </div>

        <div className="rounded-2xl border border-subtle bg-surface p-6 shadow-card">
          {error ? (
            <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">
              <AlertCircle size={16} />
              {error}
            </div>
          ) : null}

          <form onSubmit={onSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Ingresando…" : "Ingresar"}
            </Button>
          </form>
        </div>

        <p className="mt-5 text-center text-xs text-zinc-400">
          Demo · <span className="text-zinc-600">admin@demo.com</span> /{" "}
          <span className="text-zinc-600">password</span>
        </p>
      </div>
    </div>
  );
}
