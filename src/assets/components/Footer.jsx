import React, { memo } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

// Composant pour un item de contact
const ContactItem = memo(({ icon: Icon, children, href }) => {
  return (
    <li>
      <Icon />{" "}
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      ) : (
        children
      )}
    </li>
  );
});

// Composant pour un réseau social
const SocialIcon = memo(({ icon: Icon, href, label }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
    <Icon />
  </a>
));

const Footer = () => {
  const currentYear = new Date().getFullYear();

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
              <ContactItem
                icon={FaEnvelope}
                href="mailto:thecodeofsp@gmail.com"
              >
                thecodeofsp@gmail.com
              </ContactItem>
              <ContactItem icon={FaMapMarkerAlt}>Nancy, France</ContactItem>
            </ul>
          </div>

          <div className="footer__section footer__socials">
            <h5>Réseaux sociaux: </h5>
            <div className="footer__icons">
              <SocialIcon
                icon={FaGithub}
                href="https://github.com/SandrinePham"
                label="GitHub"
              />
              <SocialIcon
                icon={FaLinkedin}
                href="https://www.linkedin.com/in/sandrinepham69132b145"
                label="LinkedIn"
              />
              <SocialIcon
                icon={FaEnvelope}
                href="mailto:thecodeofsp@gmail.com"
                label="Email"
              />
            </div>
          </div>
        </section>
      </div>

      <div className="footer__copyright">
        © {currentYear} Sandrine Pham — Tous droits réservés
      </div>
    </footer>
  );
};

export default Footer;
