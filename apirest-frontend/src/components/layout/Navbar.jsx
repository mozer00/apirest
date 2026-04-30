import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { useState } from "react";
import api from "../../services/api";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isLoginPage = pathname === "/login";

  const handleLogout = async () => {
    setIsOpen(false);
    try {
      await api.post("/logout");
    } catch (e) {
      //limpa o token de qualquer forma
    }
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="menu">
      <div className="nav_content">
        <div className="logo">
          <Link to="/"><img src={logo} alt="Logo" /></Link>
        </div>

        {!isLoginPage && (
          <>
            <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? "✕" : "☰"}
            </button>

            <ul className={isOpen ? "open" : ""}>
              <li>
                <Link to="/" onClick={() => setIsOpen(false)}>Listagem</Link>
              </li>
              <li>
                <Link to="/cadastrar" onClick={() => setIsOpen(false)}>Cadastrar</Link>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }}>Sair</a>
              </li>
            </ul>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
