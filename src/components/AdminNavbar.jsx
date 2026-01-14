import { Link, useLocation, useNavigate } from "react-router-dom";

export default function AdminNavbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = path =>
    location.pathname === path ? "active" : "";

  const logout = () => {
    if (!window.confirm("Logout from EMS Admin?")) return;
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm px-4">
      
      {/* BRAND */}
      <Link className="navbar-brand fw-bold fs-4 me-4" to="/admin/dashboard">
        EMS <span className="text-warning">Admin</span>
      </Link>

      {/* TOGGLER (for mobile) */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#adminNavbar"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* NAV CONTENT */}
      <div className="collapse navbar-collapse" id="adminNavbar">
        
        {/* LEFT NAV LINKS */}
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-lg-2">

          <li className="nav-item">
            <Link className={`nav-link ${isActive("/admin/dashboard")}`}
              to="/admin/dashboard">
              Dashboard
            </Link>
          </li>

          <li className="nav-item">
            <Link className={`nav-link ${isActive("/admin/employees")}`}
              to="/admin/employees">
              Employees
            </Link>
          </li>

          <li className="nav-item">
            <Link className={`nav-link ${isActive("/admin/projects")}`}
              to="/admin/projects">
              Projects
            </Link>
          </li>

          <li className="nav-item">
            <Link className={`nav-link ${isActive("/admin/finance")}`}
              to="/admin/finance">
              Finance
            </Link>
          </li>

          <li className="nav-item">
            <Link className={`nav-link ${isActive("/admin/professional")}`}
              to="/admin/professional">
              Professional
            </Link>
          </li>

        </ul>

        {/* RIGHT ACTION */}
        <button
          className="btn btn-outline-warning fw-semibold"
          onClick={logout}
        >
          Logout
        </button>

      </div>
    </nav>
  );
}
