import "./skills.scss";
import { FaGraduationCap, FaCode, FaWarehouse } from "react-icons/fa";

import { useEffect, useRef, useState } from "react";

const Skills = () => {
  const skills = [
    { name: "HTML", level: 95, category: "Frontend" },
    { name: "CSS / SCSS / Animations", level: 90, category: "Frontend" },
    { name: "SEO & Accessibilité", level: 90, category: "Frontend" },
    { name: "API REST", level: 90, category: "Frontend" },
    { name: "JavaScript", level: 85, category: "Frontend" },
    { name: "React", level: 85, category: "Frontend" },

    { name: "Redux Toolkit", level: 75, category: "Frontend" },
  ];
  const tools = [
    "Git",
    "GitHub",
    "Visual Studio Code",
    "Figma",
    "Google Analytics",
    "Postman",
    "Lighthouse",
    "Chrome DevTools",
  ];

  const refs = useRef([]);
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const i = entry.target.dataset.index;
          if (entry.isIntersecting) {
            setVisible((prev) => [...new Set([...prev, i])]);
          }
        });
      },
      { threshold: 0.2 }
    );

    refs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      refs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const diplomas = [
    {
      title: "Titre Professionnel Développeur Web et Web Mobile",
      diplome: "Titre certifié de niveau 5 (Bac +2)",
      niveau: "Bac +2",
      institution: "OpenClassrooms",
      institutionUrl: "https://openclassrooms.com/",
      lieux: "Full remote, France",
      qualification:
        "Création d'applications web et mobiles, intégration, accessibilité, SEO",
      skills: [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Redux Toolkit",
        "SEO",
        "Accessibilité",
      ],
      year: "2025",
      icon: <FaCode className="diploma-icon" />,
    },
    {
      title:
        "Titre Professionnel Responsable production en transport logistique",
      diplome: "Titre certifié de niveau 6 (Bac +3)",
      niveau: "Bac +3",
      institution:
        "Institut Supérieur du Transport Et de la Logistique International",
      institutionUrl: "https://www.isteli.fr/",
      lieux: "Jarville-la-Malgrange (54), France",
      qualification:
        "Gestion de la chaîne logistique, optimisation des flux, management d'équipe",
      year: "2012",
      icon: <FaWarehouse className="diploma-icon" />,
    },
  ];

  return (
    <div className="skills">
      <div className="container">
        <div className="skills__header">
          <h2 className="page-title">Mes Compétences</h2>
          <div className="page-subtitle">
            Technologies, outils et méthodes que je maîtrise
          </div>
        </div>

        <div className="skills__content">
          <section className="skills__section">
            <h2>Langages & Frameworks</h2>
            <div className="skills__list">
              {skills.map((skill, index) => (
                <div
                  key={skill.name}
                  className={`skill-item ${
                    visible.includes(`skill-${index}`) ? "visible" : ""
                  }`}
                  ref={(el) => refs.current.push(el)}
                  data-index={`skill-${index}`}
                >
                  <div className="skill-item__header">
                    <span className="skill-item__name">{skill.name}</span>
                    <span className="skill-item__level">{skill.level}%</span>
                  </div>
                  <div className="skill-item__bar">
                    <div
                      className="skill-item__progress"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="skills__section">
            <h2>Outils & Environnement</h2>
            <div className="tools-grid">
              {tools.map((tool, index) => (
                <div
                  key={tool}
                  className={`tool-item ${
                    visible.includes(`tool-${index}`) ? "visible" : ""
                  }`}
                  ref={(el) => refs.current.push(el)}
                  data-index={`tool-${index}`}
                >
                  {tool}
                </div>
              ))}
            </div>
          </section>

          <section className="skills__section">
            <h2>Méthodologies & Approches</h2>
            <div className="methodologies">
              {[
                "Kanban",
                "Agilité",
                "Responsive / Mobile First",
                "Système de veille",
                "Marketing digital",
              ].map((method, index) => (
                <div
                  className={`methodology-card ${
                    visible.includes(`method-${index}`) ? "visible" : ""
                  }`}
                  key={index}
                  ref={(el) => refs.current.push(el)}
                  data-index={`method-${index}`}
                >
                  <h3>{method}</h3>
                  <p>
                    {
                      [
                        "Organisation du travail avec des tableaux visuels",
                        "Travail en mode projet, itératif et collaboratif",
                        "Interfaces optimisées pour tous les supports",
                        "Surveillance des tendances et évolutions technologiques",
                        "Notions de référencement, d’analyse et de visibilité",
                      ][index]
                    }
                  </p>
                </div>
              ))}
            </div>
          </section>
          <section className="skills__section">
            <h2>Diplômes</h2>
            <div className="diplomas">
              {diplomas.map((diploma, index) => (
                <div
                  key={index}
                  className={`diploma-item ${
                    visible.includes(`diploma-${index}`) ? "visible" : ""
                  }`}
                  ref={(el) => refs.current.push(el)}
                  data-index={`diploma-${index}`}
                >
                  <div className="diploma-header">
                    {diploma.icon}
                    <div>
                      <h3 className="diploma-title">{diploma.title}</h3>
                      <span className="diploma-badge">{diploma.niveau}</span>
                    </div>
                  </div>

                  <a
                    className="diploma-institution"
                    href={diploma.institutionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {diploma.institution}
                  </a>
                  <p className="diploma-location">{diploma.lieux}</p>

                  {diploma.qualification && (
                    <p className="diploma-qualification">
                      {diploma.qualification}
                    </p>
                  )}

                  {diploma.skills && (
                    <ul className="diploma-skills">
                      {diploma.skills.map((skill, i) => (
                        <li key={i}>{skill}</li>
                      ))}
                    </ul>
                  )}

                  <span className="diploma-year">{diploma.year}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Skills;
