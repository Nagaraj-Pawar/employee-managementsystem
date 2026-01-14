import { useEffect, useState } from "react";
import api from "../../services/api";
import EmployeeSidebar from "../../components/EmployeeSidebar";

export default function EmployeeProfile() {
  const [emp, setEmp] = useState({});
  const id = localStorage.getItem("empId");

  useEffect(() => {
    if (id) {
      api.get(`/employee/${id}`)
        .then(res => setEmp(res.data))
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

          <h3 className="fw-bold mb-4">👤 My Profile</h3>

          <div className="card shadow-sm border-0" style={{ maxWidth: "600px" }}>
            <div className="card-body">

              <div className="text-center mb-4">
                <div
                  className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center"
                  style={{ width: "80px", height: "80px", fontSize: "32px" }}
                >
                  {emp.name ? emp.name.charAt(0).toUpperCase() : "?"}
                </div>
                <h5 className="mt-3 mb-0 fw-bold">{emp.name}</h5>
                <span className="badge bg-secondary mt-2">
                  {emp.role}
                </span>
              </div>

              <hr />

              <div className="row mb-3">
                <div className="col-5 fw-semibold text-muted">Email</div>
                <div className="col-7">{emp.email}</div>
              </div>

              <div className="row mb-3">
                <div className="col-5 fw-semibold text-muted">Department</div>
                <div className="col-7">{emp.department}</div>
              </div>

              <div className="row mb-3">
                <div className="col-5 fw-semibold text-muted">Employee ID</div>
                <div className="col-7">{emp.employeeId}</div>
              </div>

              <div className="row">
                <div className="col-5 fw-semibold text-muted">Phone</div>
                <div className="col-7">
                  {emp.phone || <span className="text-muted">Not Provided</span>}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
