import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LeadsPage from "./pages/LeadsPage";
import DashboardLayout from "./pages/DashboardLayout";
import ClientsPage from "./pages/ClientsPage";
import DashboardDefault from "./pages/DashboardDefault";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminManagement from "./pages/AdminManagement";

const App = () => {
  return (
    <Routes>
  <Route path="/" element={<LoginPage />} />

  {/* Admin Dashboard */}
  <Route
    path="/admin-dashboard"
    element={
      <ProtectedRoute allowedRoles={["Admin"]}>
        <DashboardLayout />
      </ProtectedRoute>
    }
  >
    <Route path="admin" element={<AdminManagement/>} />
    <Route path="leads" element={<LeadsPage />} />
    <Route path="clients" element={<ClientsPage />} />
  </Route>

  {/* Agent Dashboard */}
  <Route
    path="/agent-dashboard"
    element={
      <ProtectedRoute allowedRoles={["Agent"]}>
      </ProtectedRoute>
    }
  />

  {/* Sales Dashboard */}
  <Route
    path="/sales-dashboard"
    element={
      <ProtectedRoute allowedRoles={["Sales"]}>
      </ProtectedRoute>
    }
  />

  {/* 404 */}
  <Route path="*" element={<div>404 Not Found</div>} />
</Routes>
  );
};

export default App;
