import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProductosPage from "./pages/ProductosPage";
import { useAuth } from "./shared/auth/useAuth";
import Layout from "./shared/ui/Layout";

function RutaProtegida({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/productos"
        element={
          <RutaProtegida>
            <Layout>
              <ProductosPage />
            </Layout>
          </RutaProtegida>
        }
      />

      <Route path="*" element={<Navigate to="/productos" replace />} />
    </Routes>
  );
}
