import { useEffect, useState } from "react";
import api from "../../services/api";
import AdminNavbar from "../../components/AdminNavbar";

export default function ProjectManagement() {
  const [projects, setProjects] = useState([]);
  const [empId, setEmpId] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [project, setProject] = useState({
    projectName: "",
    clientName: "",
    projectCode: "",
    projectRole: "",
    startDate: "",
    endDate: "",
    status: "ONGOING",
  });

  // ================= LOAD =================
  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    api.get("/projects")
      .then(res => setProjects(res.data))
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
      ? api.put(`/projects/${editingId}`, project)
      : api.post(`/projects/${Number(empId)}`, project);

    apiCall.then(() => {
      resetForm();
      loadProjects();
    });
  };

  // ================= EDIT =================
  const editProject = p => {
    setEditingId(p.id);
    setEmpId(p.employee?.id);
    setProject({
      projectName: p.projectName,
      clientName: p.clientName,
      projectCode: p.projectCode,
      projectRole: p.projectRole,
      startDate: p.startDate,
      endDate: p.endDate,
      status: p.status,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ================= DELETE =================
  const deleteProject = id => {
    if (!window.confirm("Delete this project?")) return;

    api.delete(`/projects/${id}`)
      .then(loadProjects)
      .catch(err => console.error(err));
  };

  const resetForm = () => {
    setEmpId("");
    setEditingId(null);
    setProject({
      projectName: "",
      clientName: "",
      projectCode: "",
      projectRole: "",
      startDate: "",
      endDate: "",
      status: "ONGOING",
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
              {editingId ? "Edit Project" : "Add Project"}
            </h4>
          </div>

          <div className="card-body">
            <form className="row g-2" onSubmit={submit}>

              {!editingId && (
                <input className="form-control col"
                  placeholder="Employee ID"
                  value={empId}
                  onChange={e => setEmpId(e.target.value)} />
              )}

              <input className="form-control col"
                placeholder="Project Name"
                value={project.projectName}
                onChange={e => setProject({ ...project, projectName: e.target.value })} />

              <input className="form-control col"
                placeholder="Client Name"
                value={project.clientName}
                onChange={e => setProject({ ...project, clientName: e.target.value })} />

              <input className="form-control col"
                placeholder="Project Code"
                value={project.projectCode}
                onChange={e => setProject({ ...project, projectCode: e.target.value })} />

              <input type="date" className="form-control col"
                value={project.startDate}
                onChange={e => setProject({ ...project, startDate: e.target.value })} />

              <input type="date" className="form-control col"
                value={project.endDate}
                onChange={e => setProject({ ...project, endDate: e.target.value })} />

              <input className="form-control col"
                placeholder="Role"
                value={project.projectRole}
                onChange={e => setProject({ ...project, projectRole: e.target.value })} />

              <select className="form-control col"
                value={project.status}
                onChange={e => setProject({ ...project, status: e.target.value })}>
                <option value="ONGOING">ONGOING</option>
                <option value="COMPLETED">COMPLETED</option>
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
        <div className="card shadow">
          <table className="table table-bordered table-hover mb-0">
            <thead className="table-dark">
              <tr>
                <th>Project</th>
                <th>Client</th>
                <th>Code</th>
                <th>Role</th>
                <th>Status</th>
                <th>Employee</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(p => (
                <tr key={p.id}>
                  <td>{p.projectName}</td>
                  <td>{p.clientName}</td>
                  <td>{p.projectCode}</td>
                  <td>{p.projectRole}</td>
                  <td>
                    <span className={`badge ${p.status === "COMPLETED" ? "bg-success" : "bg-warning"}`}>
                      {p.status}
                    </span>
                  </td>
                  <td>{p.employee?.name}</td>
                  <td>
                    <button className="btn btn-sm btn-warning me-2"
                      onClick={() => editProject(p)}>✏️</button>
                    <button className="btn btn-sm btn-danger"
                      onClick={() => deleteProject(p.id)}>🗑</button>
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
