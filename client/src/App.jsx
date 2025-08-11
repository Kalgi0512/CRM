import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LeadsPage from "./pages/LeadsPage";
import DashboardLayout from "./pages/DashboardLayout";
import ClientsPage from "./pages/ClientsPage";
import DashboardDefault from "./pages/DashboardDefault";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard"  element={<DashboardLayout />} >
          <Route index element={<DashboardDefault />} />
          <Route path="leads" element={<LeadsPage />} />
          <Route path="clients" element={<ClientsPage />} />
        </Route>
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </>
  );
}

export default App;