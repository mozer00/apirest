import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="menu">
      <div className="nav_content">
        <div className="logo">
          <Link to="/"><img src={logo} alt="Logo" /></Link>
        </div>

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
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
