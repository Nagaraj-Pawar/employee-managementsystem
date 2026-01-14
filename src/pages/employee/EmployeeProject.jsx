import { useEffect, useState } from "react";
import api from "../../services/api";
import EmployeeSidebar from "../../components/EmployeeSidebar";

export default function EmployeeProject() {
  const [projects, setProjects] = useState([]);
  const id = localStorage.getItem("empId");

  useEffect(() => {
    if (id) {
      api.get(`/projects/employee/${id}`)
        .then(res => setProjects(res.data))
        .catch(err => console.error(err));
    }
  }, [id]);

  return (
    <div className="container-fluid">
      <div className="row">

        {/* SIDEBAR */}
        <div className="col-md-3 col-lg-2 p-0">
          <EmployeeSidebar />
        </div>

        {/* MAIN CONTENT */}
        <div className="col-md-9 col-lg-10 p-4 bg-light min-vh-100">

          <h3 className="fw-bold mb-4">📁 My Projects</h3>

          <div className="card shadow-sm border-0">
            <div className="card-body p-0">

              <table className="table table-striped table-hover mb-0">
                <thead className="table-dark">
                  <tr>
                    <th>Project Name</th>
                    <th>Role</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {projects.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="text-center text-muted py-4">
                        No projects assigned
                      </td>
                    </tr>
                  ) : (
                    projects.map(p => (
                      <tr key={p.id}>
                        <td className="fw-semibold">{p.projectName}</td>
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
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
