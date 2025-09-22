import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__section footer__about">
          <h4 className="footer__title">Sandrine Pham</h4>
          <p className="footer__description">
            Développeuse Front-end passionnée, je transforme vos idées en
            expériences digitales élégantes et fonctionnelles.
          </p>
        </div>
        <section className="footer__content">
          <div className="footer__section footer__contact">
            <h5>Contact: </h5>
            <ul>
              <li>
                <FaEnvelope />{" "}
                <a href="mailto:thecodeofsp@gmail.com">thecodeofsp@gmail.com</a>
              </li>
              <li>
                <FaMapMarkerAlt /> Nancy, France
              </li>
            </ul>
          </div>

          <div className="footer__section footer__socials">
            <h5>Réseaux sociaux: </h5>
            <div className="footer__icons">
              <a
                href="https://github.com/SandrinePham"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/sandrinepham69132b145"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a href="mailto:thecodeofsp@gmail.com" aria-label="Email">
                <FaEnvelope />
              </a>
            </div>
          </div>
        </section>
      </div>

      <div className="footer__copyright">
        © {new Date().getFullYear()} Sandrine Pham — Tous droits réservés
      </div>
    </footer>
  );
};

export default Footer;
