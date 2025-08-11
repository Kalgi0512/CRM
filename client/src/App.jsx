import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainDashboard from "./pages/MainDashboard";
import LeadsPage from "./pages/LeadsPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<MainDashboard />} />
        <Route path="/dashboard/leads" element={<LeadsPage />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </>
  );
}

export default App;