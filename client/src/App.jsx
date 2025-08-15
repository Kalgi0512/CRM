import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LeadsPage from "./pages/LeadsPage";
import DashboardLayout from "./pages/DashboardLayout";
import ClientsPage from "./pages/ClientsPage";
import TasksPage from "./pages/TasksPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";
import DashboardDefault from "./pages/DashboardDefault";
import ProtectedRoute from "./components/ProtectedRoute";
import UsersPage from "./pages/UsersPage";

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
        <Route index element={<DashboardDefault />} />
        <Route path="leads" element={<LeadsPage />} />
        <Route path="clients" element={<ClientsPage />} />
        <Route path="tasks" element={<TasksPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="admin/users" element={<UsersPage />} />
        <Route path="admin/settings" element={<SettingsPage />} />
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
