import { Suspense } from "react";
import { Routes, Route, useRoutes } from "react-router-dom";
import Login from "./components/auth/Login";
import { AuthProvider } from "./components/auth/AuthProvider";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import MainLayout from "./components/layout/MainLayout";
import Home from "./components/home";
import ProductManagement from "./components/inventory/ProductManagement";
import RecipeManagement from "./components/inventory/RecipeManagement";
import Reports from "./components/inventory/Reports";
import SupplierManagement from "./components/suppliers/SupplierManagement";
import SalesAuditing from "./components/sales/SalesAuditing";
import routes from "tempo-routes";
import { LocaleProvider } from "./contexts/LocaleContext";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <LocaleProvider>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route element={<ProtectedRoute />}>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<ProductManagement />} />
                <Route path="/recipes" element={<RecipeManagement />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/suppliers" element={<SupplierManagement />} />
                <Route path="/sales" element={<SalesAuditing />} />
              </Route>
            </Route>

            {import.meta.env.VITE_TEMPO === "true" && (
              <Route path="/tempobook/*" />
            )}
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </AuthProvider>
      </LocaleProvider>
    </Suspense>
  );
}

export default App;
