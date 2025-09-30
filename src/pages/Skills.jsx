import { useEffect, useRef, useState } from "react";
import { FaCode, FaWarehouse } from "react-icons/fa";
import "./skills.scss";

const Skills = () => {
  const refs = useRef([]);
  const [visible, setVisible] = useState([]);

  const skills = [
    { name: "HTML", level: 95 },
    { name: "CSS / SCSS / Animations", level: 90 },
    { name: "SEO & Accessibilité", level: 90 },
    { name: "API REST", level: 90 },
    { name: "JavaScript", level: 85 },
    { name: "React", level: 85 },
    { name: "Redux Toolkit", level: 75 },
  ];

  const tools = [
    "Git",
    "GitHub",
    "VS Code",
    "Figma",
    "Google Analytics",
    "Postman",
    "Lighthouse",
    "Chrome DevTools",
  ];

  const diplomas = [
    {
      title: "Titre Professionnel Développeur Web et Web Mobile",
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

  // Observer pour fade-in
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = entry.target.dataset.index;
          if (entry.isIntersecting) {
            setVisible((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.2 }
    );

    refs.current.forEach((el) => el && observer.observe(el));
    return () => refs.current.forEach((el) => el && observer.unobserve(el));
  }, []);

  const renderSkillItem = (skill, index) => (
    <div
      key={skill.name}
      ref={(el) => refs.current.push(el)}
      data-index={`skill-${index}`}
      className={`skill-item ${
        visible.includes(`skill-${index}`) ? "visible" : ""
      }`}
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
  );

  const renderToolItem = (tool, index) => (
    <div
      key={tool}
      ref={(el) => refs.current.push(el)}
      data-index={`tool-${index}`}
      className={`tool-item ${
        visible.includes(`tool-${index}`) ? "visible" : ""
      }`}
    >
      {tool}
    </div>
  );

  const renderMethodology = (method, desc, index) => (
    <div
      key={index}
      ref={(el) => refs.current.push(el)}
      data-index={`method-${index}`}
      className={`methodology-card ${
        visible.includes(`method-${index}`) ? "visible" : ""
      }`}
    >
      <h3>{method}</h3>
      <p>{desc}</p>
    </div>
  );

  const renderDiploma = (diploma, index) => (
    <div
      key={index}
      ref={(el) => refs.current.push(el)}
      data-index={`diploma-${index}`}
      className={`diploma-item ${
        visible.includes(`diploma-${index}`) ? "visible" : ""
      }`}
    >
      <div className="diploma-header">
        {diploma.icon}
        <div>
          <h3 className="diploma-title">{diploma.title}</h3>
          <span className="diploma-badge">{diploma.niveau}</span>
        </div>
      </div>
      <a
        href={diploma.institutionUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="diploma-institution"
      >
        {diploma.institution}
      </a>
      <p className="diploma-location">{diploma.lieux}</p>
      {diploma.qualification && (
        <p className="diploma-qualification">{diploma.qualification}</p>
      )}
      {diploma.skills && (
        <ul className="diploma-skills">
          {diploma.skills.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      )}
      <span className="diploma-year">{diploma.year}</span>
    </div>
  );

  const methodologies = [
    {
      name: "Kanban",
      desc: "Organisation du travail avec des tableaux visuels",
    },
    {
      name: "Agilité",
      desc: "Travail en mode projet, itératif et collaboratif",
    },
    {
      name: "Responsive / Mobile First",
      desc: "Interfaces optimisées pour tous les supports",
    },
    {
      name: "Système de veille",
      desc: "Surveillance des tendances et évolutions technologiques",
    },
    {
      name: "Marketing digital",
      desc: "Notions de référencement, d’analyse et de visibilité",
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
            <div className="skills__list">{skills.map(renderSkillItem)}</div>
          </section>

          <section className="skills__section">
            <h2>Outils & Environnement</h2>
            <div className="tools-grid">{tools.map(renderToolItem)}</div>
          </section>

          <section className="skills__section">
            <h2>Méthodologies & Approches</h2>
            <div className="methodologies">
              {methodologies.map((m, i) =>
                renderMethodology(m.name, m.desc, i)
              )}
            </div>
          </section>

          <section className="skills__section">
            <h2>Diplômes</h2>
            <div className="diplomas">{diplomas.map(renderDiploma)}</div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Skills;
