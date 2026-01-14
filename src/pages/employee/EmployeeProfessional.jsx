import { useEffect, useState } from "react";
import api from "../../services/api";
import EmployeeSidebar from "../../components/EmployeeSidebar";

export default function EmployeeProfessional() {
  const [professional, setProfessional] = useState(null);
  const Id = localStorage.getItem("empId");

  useEffect(() => {
    if (!Id) return;

    api.get(`/professional/employee/${Id}`)
      .then(res => setProfessional(res.data))
      .catch(err => console.error(err));
  }, [Id]);

  return (
    <div className="container-fluid">
      <div className="row">

        {/* SIDEBAR */}
        <div className="col-md-3 col-lg-2 p-0">
          <EmployeeSidebar />
        </div>

        {/* MAIN CONTENT */}
        <div className="col-md-9 col-lg-10 p-4 bg-light min-vh-100">

          <h3 className="fw-bold mb-4">🎓 My Professional Details</h3>

          {!professional ? (
            <div className="alert alert-info">
              No professional details found.
            </div>
          ) : (
            <div className="card shadow-sm border-0" style={{ maxWidth: "700px" }}>
              <div className="card-body">

                <div className="row mb-3">
                  <div className="col-5 fw-semibold text-muted">Qualification</div>
                  <div className="col-7">{professional.qualification}</div>
                </div>

                <div className="row mb-3">
                  <div className="col-5 fw-semibold text-muted">Skills</div>
                  <div className="col-7">{professional.skills}</div>
                </div>

                <div className="row mb-3">
                  <div className="col-5 fw-semibold text-muted">Experience</div>
                  <div className="col-7">
                    <span className="badge bg-success">
                      {professional.experience} years
                    </span>
                  </div>
                </div>

                <div className="row">
                  <div className="col-5 fw-semibold text-muted">Previous Company</div>
                  <div className="col-7">
                    {professional.previousCompany || (
                      <span className="text-muted">Not Available</span>
                    )}
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
