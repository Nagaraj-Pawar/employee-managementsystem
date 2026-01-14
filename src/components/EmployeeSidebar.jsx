import { Link, useLocation, useNavigate } from "react-router-dom";

export default function EmployeeSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) =>
    location.pathname === path
      ? "active bg-primary text-white"
      : "text-dark";

  const logout = () => {
    localStorage.clear();     // clear empId, role, etc
    navigate("/login");       // go to login page
  };

  return (
    <div
      className="bg-light border-end d-flex flex-column"
      style={{ minHeight: "100vh", width: "240px" }}
    >
      {/* HEADER */}
      <div className="text-center py-4 border-bottom">
        <h6 className="fw-bold mb-0">Employee Panel</h6>
      </div>

      {/* LINKS */}
      <div className="nav flex-column nav-pills px-3 py-4 gap-3 flex-grow-1">
        <Link
          to="/employee/profile"
          className={`nav-link ${isActive("/employee/profile")}`}
        >
          👤 My Profile
        </Link>

        <Link
          to="/employee/project"
          className={`nav-link ${isActive("/employee/project")}`}
        >
          📁 My Project
        </Link>

        <Link
          to="/employee/finance"
          className={`nav-link ${isActive("/employee/finance")}`}
        >
          💰 My Finance
        </Link>

        <Link
          to="/employee/professional"
          className={`nav-link ${isActive("/employee/professional")}`}
        >
          🎓 My Professional
        </Link>
      </div>

      {/* LOGOUT */}
      <div className="p-3 border-top">
        <button
          className="btn btn-outline-danger w-100"
          onClick={logout}
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
}
