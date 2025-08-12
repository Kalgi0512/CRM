import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LeadsPage from "./pages/LeadsPage";
import DashboardLayout from "./pages/DashboardLayout";
import ClientsPage from "./pages/ClientsPage";
import DashboardDefault from "./pages/DashboardDefault";
import LeadsDetailsPage from "./pages/LeadsDetailsPage";
import TasksPage from "./pages/TasksPage";
import ReportsPage from "./pages/ReportsPage";
import ClientDetailsPage from "./pages/ClientsDetailsPage";
import UsersPage from "./pages/UsersPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard"  element={<DashboardLayout />} >
          <Route index element={<DashboardDefault />} />
          <Route path="leads" element={<LeadsPage />} />
          <Route path="leads/:id" element={<LeadsDetailsPage />} />
          <Route path="clients" element={<ClientsPage />} />
          <Route path="clients/:id" element={<ClientDetailsPage />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="admin/users" element={<UsersPage />} />
        </Route>
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </>
  );
}

export default App;
