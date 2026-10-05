import React from "react";
import { Package, LogOut } from "lucide-react";
import Button from "./Button";
import { useAuth } from "../auth/useAuth";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-subtle bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-accent/10 text-accent ring-1 ring-accent/20">
              <Package size={16} strokeWidth={2.25} />
            </div>
            <span className="text-sm font-semibold tracking-tight text-zinc-900">
              Inventario
            </span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => logout()}>
            <LogOut size={15} />
            Salir
          </Button>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-8">{children}</main>
    </div>
  );
}
