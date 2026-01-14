import { useEffect, useState } from "react";
import api from "../../services/api";
import AdminNavbar from "../../components/AdminNavbar";

export default function ProfessionalManagement() {
  const [empId, setEmpId] = useState("");
  const [professionals, setProfessionals] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [professional, setProfessional] = useState({
    qualification: "",
    skills: "",
    experience: "",
    previousCompany: ""
  });

  // ================= LOAD =================
  useEffect(() => {
    loadProfessionals();
  }, []);

  const loadProfessionals = () => {
    api.get("/professional")
      .then(res => setProfessionals(res.data))
      .catch(err => console.error(err));
  };

  // ================= ADD / UPDATE =================
  const submit = e => {
    e.preventDefault();

    if (!empId && !editingId) {
      alert("Employee ID is required");
      return;
    }

    const apiCall = editingId
      ? api.put(`/professional/${editingId}`, professional)
      : api.post(`/professional/${Number(empId)}`, professional);

    apiCall.then(() => {
      resetForm();
      loadProfessionals();
    });
  };

  // ================= EDIT =================
  const editProfessional = p => {
    setEditingId(p.id);
    setEmpId(p.employee?.id);
    setProfessional({
      qualification: p.qualification,
      skills: p.skills,
      experience: p.experience,
      previousCompany: p.previousCompany
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ================= DELETE =================
  const deleteProfessional = id => {
    if (!window.confirm("Delete this professional detail?")) return;

    api.delete(`/professional/${id}`)
      .then(loadProfessionals)
      .catch(err => console.error(err));
  };

  const resetForm = () => {
    setEmpId("");
    setEditingId(null);
    setProfessional({
      qualification: "",
      skills: "",
      experience: "",
      previousCompany: ""
    });
  };

  return (
    <>
      <AdminNavbar />

      <div className="container mt-4">

        {/* ===== FORM ===== */}
        <div className="card shadow mb-4">
          <div className={`card-header ${editingId ? "bg-warning" : "bg-info"} text-white`}>
            <h4 className="mb-0">
              {editingId ? "Edit Professional Details" : "Add Professional Details"}
            </h4>
          </div>

          <div className="card-body">
            <form className="row g-3" onSubmit={submit}>

              {!editingId && (
                <div className="col-md-3">
                  <input
                    className="form-control"
                    placeholder="Employee ID"
                    value={empId}
                    onChange={e => setEmpId(e.target.value)}
                  />
                </div>
              )}

              <div className="col-md-3">
                <input className="form-control" placeholder="Qualification"
                  value={professional.qualification}
                  onChange={e => setProfessional({ ...professional, qualification: e.target.value })} />
              </div>

              <div className="col-md-3">
                <input className="form-control" placeholder="Skills"
                  value={professional.skills}
                  onChange={e => setProfessional({ ...professional, skills: e.target.value })} />
              </div>

              <div className="col-md-2">
                <input type="number" className="form-control" placeholder="Experience"
                  value={professional.experience}
                  onChange={e => setProfessional({ ...professional, experience: e.target.value })} />
              </div>

              <div className="col-md-3">
                <input className="form-control" placeholder="Previous Company"
                  value={professional.previousCompany}
                  onChange={e => setProfessional({ ...professional, previousCompany: e.target.value })} />
              </div>

              <div className="col-md-2 d-grid">
                <button className={`btn ${editingId ? "btn-warning" : "btn-info"} text-white`}>
                  {editingId ? "Update" : "Add"}
                </button>
              </div>

              {editingId && (
                <div className="col-md-2 d-grid">
                  <button type="button" onClick={resetForm} className="btn btn-secondary">
                    Cancel
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* ===== TABLE ===== */}
        <div className="card shadow">
          <table className="table table-striped table-hover mb-0">
            <thead className="table-dark">
              <tr>
                <th>Employee</th>
                <th>Qualification</th>
                <th>Skills</th>
                <th>Experience</th>
                <th>Previous Company</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {professionals.map(p => (
                <tr key={p.id}>
                  <td>{p.employee?.name}</td>
                  <td>{p.qualification}</td>
                  <td>{p.skills}</td>
                  <td>{p.experience}</td>
                  <td>{p.previousCompany}</td>
                  <td>
                    <button className="btn btn-sm btn-warning me-2"
                      onClick={() => editProfessional(p)}>✏️</button>
                    <button className="btn btn-sm btn-danger"
                      onClick={() => deleteProfessional(p.id)}>🗑</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </>
  );
}
