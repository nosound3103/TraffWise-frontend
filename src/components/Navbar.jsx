import "./Navbar.css";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <button className="nav-button" onClick={() => navigate("/")}>
        Home
      </button>
      <button className="nav-button" onClick={() => navigate("/dashboard")}>
        Dashboard
      </button>
      <button className="nav-button" onClick={() => navigate("/violations")}>
        Violations
      </button>
    </nav>
  );
}
