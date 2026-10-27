
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");

    toast.success("Logged out successfully");

    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container">

        <NavLink className="navbar-brand fw-bold" to="/">
          MyApp
        </NavLink>

        <div className="navbar-nav ms-auto">

          {token ? (
            <button
              className="btn btn-danger"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>

              <NavLink className="nav-link" to="/register">
                Register
              </NavLink>
            </>
          )}

        </div>

      </div>
    </nav>
  );
}