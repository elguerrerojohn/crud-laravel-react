import React, { createContext, useEffect, useMemo, useState } from "react";
import { api } from "../http/api";

/**
 * Contexto de autenticación (token Bearer).
 */
type Usuario = { id: number; name: string; email: string };

type AuthState = {
  token: string | null;
  usuario: Usuario | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthState | null>(null);

const STORAGE_TOKEN = "crud_token";
const STORAGE_USER = "crud_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(STORAGE_TOKEN));
  const [usuario, setUsuario] = useState<Usuario | null>(() => {
    const raw = localStorage.getItem(STORAGE_USER);
    return raw ? (JSON.parse(raw) as Usuario) : null;
  });

  useEffect(() => {
    api.setToken(token);
  }, [token]);

  const login = async (email: string, password: string) => {
    const res = await api.post("/api/v1/auth/login", { email, password, device_name: "web" });
    const t = res.data?.data?.token as string;
    const u = res.data?.data?.usuario as Usuario;

    setToken(t);
    setUsuario(u);

    localStorage.setItem(STORAGE_TOKEN, t);
    localStorage.setItem(STORAGE_USER, JSON.stringify(u));
  };

  const logout = async () => {
    try {
      await api.post("/api/v1/auth/logout");
    } finally {
      setToken(null);
      setUsuario(null);
      localStorage.removeItem(STORAGE_TOKEN);
      localStorage.removeItem(STORAGE_USER);
    }
  };

  const value = useMemo(() => ({ token, usuario, login, logout }), [token, usuario]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
