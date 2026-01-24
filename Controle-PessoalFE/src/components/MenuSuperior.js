import { useState } from "react";
import { Link } from "react-router-dom";

const MenuSuperior = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-primary navbar-dark sticky-top">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          Controle Pessoal de Livros
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={closeMenu}>
                Inclusão
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/manut" className="nav-link" onClick={closeMenu}>
                Manutenção
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/resumo" className="nav-link" onClick={closeMenu}>
                Resumo
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MenuSuperior;
