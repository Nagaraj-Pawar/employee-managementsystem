import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login.jsx";

import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import EmployeeManagement from "./pages/admin/EmployeeManagement.jsx";
import ProjectManagement from "./pages/admin/ProjectManagement.jsx";
import FinanceManagement from "./pages/admin/FinanceManagement.jsx";
import ProfessionalManagement from "./pages/admin/ProfessionalManagement.jsx";

import EmployeeProfile from "./pages/employee/EmployeeProfile.jsx";
import EmployeeProject from "./pages/employee/EmployeeProject.jsx";
import EmployeeFinance from "./pages/employee/EmployeeFinance.jsx";
import EmployeeProfessional from "./pages/employee/EmployeeProfessional.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/employees" element={<EmployeeManagement />} />
        <Route path="/admin/projects" element={<ProjectManagement />} />
        <Route path="/admin/finance" element={<FinanceManagement />} />
        <Route path="/admin/professional" element={<ProfessionalManagement />} />

        <Route path="/employee/profile" element={<EmployeeProfile />} />
        <Route path="/employee/project" element={<EmployeeProject />} />
        <Route path="/employee/finance" element={<EmployeeFinance />} />
        <Route path="/employee/professional" element={<EmployeeProfessional />} />
        <Route path ="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
