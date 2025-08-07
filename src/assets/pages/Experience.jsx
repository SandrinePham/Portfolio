import { useEffect, useRef, useState } from "react"
import './experiences.scss'

const Experience = () => {
  const jobs = [
    {
      title: "Assistante d’achats / Approvisionneuse",
      company: "Actemium – Laxou (54)",
      period: "Avril 2022 - Décembre 2022",
      tasks: [
        "Assistance à la négociation des achats",
        "Mise en place de stratégies selon les projets",
        "Passation et suivi de commandes"
      ]
    },
    {
      title: "Gestionnaire de stock",
      company: "Gédimat – Sorinières (44)",
      period: "Octobre 2020 - Août 2021",
      tasks: [
        "Analyse des inventaires et stocks négatifs",
        "Gestion logistique et navettes inter-sites",
        "Participation à l’amélioration continue"
      ]
    },
    {
      title: "Approvisionneuse région",
      company: "Point P – Vertou (44)",
      period: "Janvier 2020 - Octobre 2020",
      tasks: [
        "Approvisionnements gros œuvre (2000 références)",
        "Analyse des besoins et ruptures",
        "Interface entre ventes, achats et fournisseurs"
      ]
    },
    {
      title: "Supply Officer A350",
      company: "Airbus – Bouguenais (44)",
      period: "Novembre 2017 - Décembre 2019",
      tasks: [
        "Approvisionnements sur l’A350 (3000 références)",
        "Résolution des arrêts de production",
        "Interface multi-métiers et coordination fournisseurs"
      ]
    },
    {
      title: "Agent logistique",
      company: "Saint-Gobain Pam – Foug (54)",
      period: "Septembre 2014 - Octobre 2017",
      tasks: [
        "Approvisionnements, gestion des flux et stocks",
        "Traitement des flux parasites",
        "Suivi des commandes et sous-traitance"
      ]
    },
    {
      title: "Chargée du service distribution",
      company: "Primagaz – Vandoeuvre (54)",
      period: "Octobre 2012 - Décembre 2013",
      tasks: [
        "Création et suivi des tournées chauffeurs",
        "Analyse des consommations clients",
        "Gestion des points de rupture"
      ]
    }
  ]

  // Refs et états pour animation
  const cardRefs = useRef([]);
  const [visibleCards, setVisibleCards] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = entry.target.dataset.index;
          if (entry.isIntersecting) {
            setVisibleCards((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      cardRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div className="experience">
      <div className="container">
        <div className="experience__header">
          <h1 className="page-title">Mon Parcours</h1>
          <div className="page-subtitle">Retour sur mes expériences professionnelles</div>
        </div>

        <div className="experience__content">
          {jobs.map((job, index) => (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              data-index={index}
              className={`job-card ${visibleCards.includes(String(index)) ? "visible" : ""}`}
            >
              <h2>{job.title}</h2>
              <h3>{job.company}</h3>
              <p className="job-period">{job.period}</p>
              <ul>
                {job.tasks.map((task, idx) => (
                  <li key={idx}>{task}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
