import { useState } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <h1>Sandrine Pham</h1>
          <div className="header__subtitle">Développeuse Front-end</div>
        </div>

        <nav className={`nav ${isMenuOpen ? "nav--open" : ""}`}>
          <ul className="nav__list">
            <li className="nav__item">
              <NavLink
                to="/"
                className="nav__link"
                onClick={() => setIsMenuOpen(false)}
              >
                Accueil
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                to="/about"
                className="nav__link"
                onClick={() => setIsMenuOpen(false)}
              >
                À propos
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                to="/projects"
                className="nav__link"
                onClick={() => setIsMenuOpen(false)}
              >
                Projets
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                to="/skills"
                className="nav__link"
                onClick={() => setIsMenuOpen(false)}
              >
                Compétences
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                to="/experience"
                className="nav__link"
                onClick={() => setIsMenuOpen(false)}
              >
                Expériences
              </NavLink>
            </li>

            <li className="nav__item">
              <NavLink
                to="/contact"
                className="nav__link"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>

        <button
          className="header__menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
