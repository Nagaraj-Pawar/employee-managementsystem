import { useEffect, useState } from "react";
import api from "../../services/api";
import EmployeeSidebar from "../../components/EmployeeSidebar";

export default function EmployeeFinance() {
  const [f, setF] = useState({});
  const id = localStorage.getItem("empId");

  useEffect(() => {
    if (id) {
      api.get(`/finance/employee/${id}`)
        .then(res => setF(res.data))
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

          <h3 className="fw-bold mb-4">💰 My Finance</h3>

          {!f || !f.id ? (
            <div className="alert alert-info">
              Finance details not available.
            </div>
          ) : (
            <div className="card shadow-sm border-0" style={{ maxWidth: "500px" }}>
              <div className="card-body">

                <div className="mb-3 d-flex justify-content-between">
                  <span className="fw-semibold text-muted">Bank Name</span>
                  <span>{f.bankName}</span>
                </div>

                <div className="mb-3 d-flex justify-content-between">
                  <span className="fw-semibold text-muted">Account Number</span>
                  <span>{f.accountNumber}</span>
                </div>

                <div className="mb-3 d-flex justify-content-between">
                  <span className="fw-semibold text-muted">IFSC Code</span>
                  <span>{f.ifscCode}</span>
                </div>

                <hr />

                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-bold fs-5">Net Salary</span>
                  <span className="badge bg-success fs-6 px-3 py-2">
                    ₹ {f.netSalary}
                  </span>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
