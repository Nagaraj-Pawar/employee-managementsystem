import { useEffect, useState } from "react";
import api from "../../services/api";
import AdminNavbar from "../../components/AdminNavbar";

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    employeeId: "",
    name: "",
    email: "",
    password: "",
    phone: "",
    department: "",
    role: "EMPLOYEE",
  });

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = () => {
    api.get("/admin/employees").then(res => setEmployees(res.data));
  };

  // ================= ADD / UPDATE =================
  const submit = e => {
    e.preventDefault();

    const apiCall = editingId
      ? api.put(`/admin/employee/${editingId}`, form)
      : api.post("/admin/employee", form);

    apiCall.then(() => {
      loadEmployees();
      resetForm();
    });
  };

  // ================= EDIT =================
  const editEmployee = emp => {
    setEditingId(emp.id);
    setForm({
      employeeId: emp.employeeId,
      name: emp.name,
      email: emp.email,
      password: "",
      phone: emp.phone || "",
      department: emp.department,
      role: emp.role,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ================= DELETE =================
  const remove = id => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    api.delete(`/admin/employee/${id}`).then(loadEmployees);
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      employeeId: "",
      name: "",
      email: "",
      password: "",
      phone: "",
      department: "",
      role: "EMPLOYEE",
    });
  };

  return (
    <>
      <AdminNavbar />
      <div className="container mt-4">

        {/* ================= FORM ================= */}
        <div className="card shadow mb-4">
          <div className={`card-header ${editingId ? "bg-warning" : "bg-primary"} text-white`}>
            <h4 className="mb-0">
              {editingId ? "Edit Employee" : "Add Employee"}
            </h4>
          </div>

          <div className="card-body">
            <form className="row g-2" onSubmit={submit}>

              <input className="form-control col" placeholder="Emp ID"
                value={form.employeeId}
                onChange={e => setForm({ ...form, employeeId: e.target.value })} />

              <input className="form-control col" placeholder="Name"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })} />

              <input className="form-control col" placeholder="Email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })} />

              {!editingId && (
                <input className="form-control col" placeholder="Password"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })} />
              )}

              {/* ✅ PHONE FIELD */}
              <input
                className="form-control col"
                placeholder="Phone Number"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
              />

              <input className="form-control col" placeholder="Department"
                value={form.department}
                onChange={e => setForm({ ...form, department: e.target.value })} />

              <select className="form-control col"
                value={form.role}
                onChange={e => setForm({ ...form, role: e.target.value })}>
                <option>EMPLOYEE</option>
                <option>ADMIN</option>
              </select>

              <button className={`btn ${editingId ? "btn-warning" : "btn-primary"} col`}>
                {editingId ? "Update" : "Add"}
              </button>

              {editingId && (
                <button type="button" className="btn btn-secondary col"
                  onClick={resetForm}>
                  Cancel
                </button>
              )}
            </form>
          </div>
        </div>

        {/* ================= TABLE ================= */}
        <h4 className="fw-bold mb-2">👥 All Employees</h4>

        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>EmpId</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Dept</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(e => (
              <tr key={e.id}>
                <td>{e.employeeId}</td>
                <td className="fw-semibold">{e.name}</td>
                <td>{e.email}</td>
                <td>{e.phone || "-"}</td>
                <td>{e.department}</td>
                <td>
                  <span className={`badge ${e.role === "ADMIN" ? "bg-danger" : "bg-success"}`}>
                    {e.role}
                  </span>
                </td>
                <td>
                  <button className="btn btn-sm btn-warning me-2"
                    onClick={() => editEmployee(e)}>
                    ✏️
                  </button>
                  <button className="btn btn-sm btn-danger"
                    onClick={() => remove(e.id)}>
                    🗑
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </>
  );
}
