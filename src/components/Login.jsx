import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/login", {
        email,
        password,
      });

      // backend returns: id, name, role
      localStorage.setItem("empId", res.data.id);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/employee/profile");
      }
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 col-md-4 mx-auto">
        <h3 className="text-center mb-3">EMS Login</h3>

        {error && (
          <div className="alert alert-danger text-center">
            {error}
          </div>
        )}

        <form onSubmit={submit}>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn btn-primary w-100 btn-animate">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
