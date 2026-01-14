import { useEffect, useState } from "react";
import api from "../../services/api";
import AdminNavbar from "../../components/AdminNavbar";

export default function FinanceManagement() {
  const [finances, setFinances] = useState([]);
  const [empId, setEmpId] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [finance, setFinance] = useState({
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    basicSalary: "",
    hra: "",
    allowances: "",
    deductions: ""
  });

  useEffect(() => {
    loadFinance();
  }, []);

  const loadFinance = () => {
    api.get("/finance")
      .then(res => setFinances(res.data))
      .catch(err => console.error(err));
  };

  // ✅ AUTO CALCULATION
  const calculateNetSalary = () => {
    const basic = Number(finance.basicSalary || 0);
    const hra = Number(finance.hra || 0);
    const allowances = Number(finance.allowances || 0);
    const deductions = Number(finance.deductions || 0);
    return basic + hra + allowances - deductions;
  };

  // ✅ ADD / UPDATE
  const submit = e => {
    e.preventDefault();

    const payload = {
      ...finance,
      netSalary: calculateNetSalary()
    };

    const apiCall = editingId
      ? api.put(`/finance/${editingId}`, payload)
      : api.post(`/finance/${Number(empId)}`, payload);

    apiCall
      .then(() => {
        loadFinance();
        resetForm();
      })
      .catch(err => {
        console.error(err);
        alert("Operation failed");
      });
  };

  // ✏️ EDIT
  const editFinance = f => {
    setEditingId(f.id);
    setEmpId(f.employee?.id || "");
    setFinance({
      bankName: f.bankName,
      accountNumber: f.accountNumber,
      ifscCode: f.ifscCode,
      basicSalary: f.basicSalary,
      hra: f.hra,
      allowances: f.allowances,
      deductions: f.deductions
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 🗑 DELETE
  const deleteFinance = id => {
    if (!window.confirm("Delete this finance record?")) return;

    api.delete(`/finance/${id}`)
      .then(loadFinance)
      .catch(err => console.error(err));
  };

  const resetForm = () => {
    setEmpId("");
    setEditingId(null);
    setFinance({
      bankName: "",
      accountNumber: "",
      ifscCode: "",
      basicSalary: "",
      hra: "",
      allowances: "",
      deductions: ""
    });
  };

  return (
    <>
      <AdminNavbar />

      <div className="container mt-4">

        {/* FORM */}
        <div className="card shadow border-0 mb-4">
          <div className={`card-header ${editingId ? "bg-warning" : "bg-primary"} text-white`}>
            <h4 className="mb-0">
              {editingId ? "Edit Finance Details" : "Add Finance Details"}
            </h4>
          </div>

          <div className="card-body">
            <form className="row g-3" onSubmit={submit}>

              {!editingId && (
                <div className="col-md-3">
                  <input className="form-control"
                    placeholder="Employee ID"
                    value={empId}
                    onChange={e => setEmpId(e.target.value)} />
                </div>
              )}

              {["bankName","accountNumber","ifscCode"].map((f,i)=>(
                <div className="col-md-3" key={i}>
                  <input className="form-control"
                    placeholder={f.replace(/([A-Z])/g," $1")}
                    value={finance[f]}
                    onChange={e => setFinance({ ...finance, [f]: e.target.value })} />
                </div>
              ))}

              {["basicSalary","hra","allowances","deductions"].map((f,i)=>(
                <div className="col-md-3" key={i}>
                  <input type="number" className="form-control"
                    placeholder={f.replace(/([A-Z])/g," $1")}
                    value={finance[f]}
                    onChange={e => setFinance({ ...finance, [f]: e.target.value })} />
                </div>
              ))}

              <div className="col-md-6">
                <div className="alert alert-success fw-bold">
                  Net Salary: ₹ {calculateNetSalary()}
                </div>
              </div>

              <div className="col-md-3 d-grid">
                <button className={`btn ${editingId ? "btn-warning" : "btn-success"}`}>
                  {editingId ? "Update" : "Add"}
                </button>
              </div>

              {editingId && (
                <div className="col-md-3 d-grid">
                  <button type="button" onClick={resetForm} className="btn btn-secondary">
                    Cancel
                  </button>
                </div>
              )}

            </form>
          </div>
        </div>

        {/* TABLE */}
        <div className="card shadow border-0">
          <div className="card-header bg-dark text-white">
            <h4 className="mb-0">All Finance Details</h4>
          </div>

          <div className="card-body p-0">
            <table className="table table-striped table-hover mb-0">
              <thead className="table-secondary">
                <tr>
                  <th>Employee</th>
                  <th>Bank</th>
                  <th>Account</th>
                  <th>Net Salary</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {finances.map(f => (
                  <tr key={f.id}>
                    <td>{f.employee?.name}</td>
                    <td>{f.bankName}</td>
                    <td>{f.accountNumber}</td>
                    <td className="fw-bold text-success">{f.netSalary}</td>
                    <td>
                      <button className="btn btn-sm btn-warning me-2"
                        onClick={() => editFinance(f)}>✏️</button>
                      <button className="btn btn-sm btn-danger"
                        onClick={() => deleteFinance(f.id)}>🗑</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </>
  );
}
