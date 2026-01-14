import { useEffect, useState } from "react";
import api from "../../services/api";
import AdminNavbar from "../../components/AdminNavbar";

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [finances, setFinances] = useState([]);
  const [professionals, setProfessionals] = useState([]); 

  useEffect(() => {
    api.get("/dashboard/stats").then(r => setStats(r.data));
    api.get("/admin/employees").then(r => setEmployees(r.data));
    api.get("/projects").then(r => setProjects(r.data));
    api.get("/finance").then(r => setFinances(r.data));
    api.get("/professional").then(r => setProfessionals(r.data));
  }, []);

  return (
    <>
      <AdminNavbar />

      <div className="container mt-4">

        {/* ===== DASHBOARD STATS ===== */}
        <div className="row mb-5">
          {[
            {
              title: "Employees",
              value: stats.totalEmployees,
              bg: "linear-gradient(135deg,#667eea,#764ba2)"
            },
            {
              title: "Projects",
              value: stats.totalProjects,
              bg: "linear-gradient(135deg,#43cea2,#185a9d)"
            },
            {
              title: "Total Salary Paid",
              value: `₹ ${stats.totalSalaryPaid ?? 0}`,
              bg: "linear-gradient(135deg,#f7971e,#ffd200)"
            }
          ].map((c, i) => (
            <div className="col-md-4" key={i}>
              <div
                className="card text-white shadow-lg text-center p-4 mb-3"
                style={{
                  background: c.bg,
                  borderRadius: "15px",
                  transition: "transform .3s, box-shadow .3s"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 25px rgba(0,0,0,.3)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow =
                    "0 6px 15px rgba(0,0,0,.2)";
                }}
              >
                <h5 className="mb-2">{c.title}</h5>
                <h2 className="fw-bold">{c.value ?? 0}</h2>
              </div>
            </div>
          ))}
        </div>

        {/* ===== EMPLOYEES ===== */}
        <h4 className="fw-bold text-primary mb-3">👥 All Employees</h4>
        <div className="card shadow mb-5">
          <table className="table table-striped table-hover mb-0">
            <thead className="table-dark">
              <tr>
                <th>Emp ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(emp => (
                <tr key={emp.id}>
                  <td>{emp.employeeId}</td>
                  <td className="fw-semibold">{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>
                    <span className="badge bg-info">{emp.department}</span>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        emp.role === "ADMIN" ? "bg-danger" : "bg-success"
                      }`}
                    >
                      {emp.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ===== PROJECTS ===== */}
        <h4 className="fw-bold text-success mb-3">📁 All Projects</h4>
        <div className="card shadow mb-5">
          <table className="table table-hover table-bordered mb-0">
            <thead className="table-dark">
              <tr>
                <th>Project</th>
                <th>Client</th>
                <th>Role</th>
                <th>Status</th>
                <th>Employee</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(p => (
                <tr key={p.id}>
                  <td className="fw-semibold">{p.projectName}</td>
                  <td>{p.clientName}</td>
                  <td>{p.projectRole}</td>
                  <td>
                    <span
                      className={`badge ${
                        p.status === "COMPLETED"
                          ? "bg-success"
                          : "bg-warning text-dark"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td>{p.employee?.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ===== FINANCE ===== */}
        <h4 className="fw-bold text-warning mb-3">💰 Finance Details</h4>
        <div className="card shadow mb-5">
          <table className="table table-striped table-hover mb-0">
            <thead className="table-dark">
              <tr>
                <th>Employee</th>
                <th>Bank</th>
                <th>Account</th>
                <th>Net Salary</th>
              </tr>
            </thead>
            <tbody>
              {finances.map(f => (
                <tr key={f.id}>
                  <td className="fw-semibold">{f.employee?.name}</td>
                  <td>{f.bankName}</td>
                  <td>{f.accountNumber}</td>
                  <td className="fw-bold text-success">
                    ₹ {f.netSalary}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ===== PROFESSIONAL DETAILS ===== */}
        <h4 className="fw-bold text-info mb-3">👔 Professional Details</h4>
        <div className="card shadow mb-5">
          <table className="table table-hover table-striped mb-0">
            <thead className="table-dark">
              <tr>
                <th>Employee</th>
                <th>Qualification</th>
                <th>Skills</th>
                <th>Experience</th>
                <th>Previous Company</th>
              </tr>
            </thead>
            <tbody>
              {professionals.map(p => (
                <tr key={p.id}>
                  <td className="fw-semibold">{p.employee?.name}</td>
                  <td>{p.qualification}</td>
                  <td>{p.skills}</td>
                  <td>{p.experience} yrs</td>
                  <td>{p.previousCompany}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </>
  );
}
