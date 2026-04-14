import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

// Páginas Públicas
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Contact from "./pages/Contact";
import Students from "./pages/Students";
import Rates from "./pages/Rates";
import Help from "./pages/Help";
import FinancingForm from "./pages/FinancingForm";
import ApplicationSummary from "./pages/ApplicationSummary";

// Páginas Admin
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminProductForm from "./pages/admin/AdminProductForm";
import AdminProductEdit from "./pages/admin/AdminProductEdit";
import AdminApplications from "./pages/admin/AdminApplications";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ── RUTAS PÚBLICAS ── */}
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/estudiantes" element={<Students />} />
          <Route path="/tasas" element={<Rates />} />
          <Route path="/ayuda" element={<Help />} />
          <Route path="/formulario-financiamiento" element={<FinancingForm />} />
          <Route path="/resumen" element={<ApplicationSummary />} />

          {/* ── ADMIN LOGIN (pública) ── */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* ── RUTAS ADMIN PROTEGIDAS ── */}
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminLayout />
              </PrivateRoute>
            }
          >
            {/* Redirige /admin → /admin/dashboard */}
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="applications" element={<AdminApplications />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="products/new" element={<AdminProductForm />} />
            <Route path="products/:id/edit" element={<AdminProductEdit />} />
          </Route>

          {/* ── 404 → Home ── */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
