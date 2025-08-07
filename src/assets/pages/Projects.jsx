import { useState, useMemo, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FILTER_CATEGORIES = {
  languages: ["HTML", "CSS", "JavaScript"],
  frameworks: ["React", "Redux", "React Router", "Sass", "Chart.js"],
  outilsDev: [
    "GitHub",
    "Node.js",
    "Yarn",
    "Swagger",
    "Visual Studio Code",
    "Chrome DevTools",
    "Vite",
    "API",
  ],
  outilsSEO: ["Lighthouse", "Wave", "SEO"],
  outilsDesign: ["Figma"],
  gestionProjet: ["Kanban", "Agile", "Veille Techno", "Spécifications"],
};

export default function Projects() {
  const [projectsData, setProjectsData] = useState([]);
  const [filters, setFilters] = useState({
    languages: new Set(),
    frameworks: new Set(),
    outilsDev: new Set(),
    outilsSEO: new Set(),
    outilsDesign: new Set(),
    gestionProjet: new Set(),
  });
  const [search, setSearch] = useState("");
  const [openSections, setOpenSections] = useState({
    languages: true,
    frameworks: true,
    outilsDev: false,
    outilsSEO: false,
    outilsDesign: false,
    gestionProjet: false,
  });

  // Chargement des projets depuis projects.json au montage
  useEffect(() => {
    fetch("/projects.json")
      .then((res) => res.json())
      .then((data) => setProjectsData(data))
      .catch((err) => console.error("Erreur chargement JSON :", err));
  }, []);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleFilter = (category, value) => {
    setFilters((prev) => {
      const newSet = new Set(prev[category]);
      if (newSet.has(value)) {
        newSet.delete(value);
      } else {
        newSet.add(value);
      }
      return { ...prev, [category]: newSet };
    });
  };

  const resetFilters = () => {
    setFilters({
      languages: new Set(),
      frameworks: new Set(),
      outilsDev: new Set(),
      outilsSEO: new Set(),
      outilsDesign: new Set(),
      gestionProjet: new Set(),
    });
    setSearch("");
  };

  const filteredProjects = useMemo(() => {
    return [...projectsData]
      .sort((a, b) => b.id - a.id)
      .filter((project) => {
        const techs = project.technologies.map((t) => t.toLowerCase());

        const categoryMatches = (category, selectedSet) => {
          if (selectedSet.size === 0) return true;
          return [...selectedSet].some((sel) =>
            techs.includes(sel.toLowerCase())
          );
        };

        if (
          !categoryMatches("languages", filters.languages) ||
          !categoryMatches("frameworks", filters.frameworks) ||
          !categoryMatches("outilsDev", filters.outilsDev) ||
          !categoryMatches("outilsSEO", filters.outilsSEO) ||
          !categoryMatches("outilsDesign", filters.outilsDesign) ||
          !categoryMatches("gestionProjet", filters.gestionProjet)
        )
          return false;

        if (
          search.trim() &&
          !(
            project.title.toLowerCase().includes(search.toLowerCase()) ||
            project.description.toLowerCase().includes(search.toLowerCase())
          )
        )
          return false;

        return true;
      });
  }, [filters, search, projectsData]);

  const renderCheckboxes = (categoryKey, options) =>
    options.map((opt) => (
      <label key={opt} className="checkbox-item">
        <input
          type="checkbox"
          checked={filters[categoryKey].has(opt)}
          onChange={() => toggleFilter(categoryKey, opt)}
        />
        {opt}
      </label>
    ));

  return (
    <div className="projects">
      <div className="container">
        <div className="projects__header">
          <h1 className="page-title">Mes Projets</h1>
          <div className="page-subtitle">Une sélection de mes créations</div>
        </div>

        <div className="projects__filters">
          {/* Boutons pour reset filtres ou recherche si tu veux les ajouter */}
          {/* <button onClick={resetFilters}>Réinitialiser</button> */}

          <div className="filter-row">
            {[
              ["languages", "Languages"],
              ["frameworks", "Frameworks"],
            ].map(([key, label]) => (
              <div key={key} className="filter-category">
                <h4 onClick={() => toggleSection(key)}>
                  {label}
                  {openSections[key] ? (
                    <FaChevronUp size={14} />
                  ) : (
                    <FaChevronDown size={14} />
                  )}
                </h4>
                {openSections[key] && (
                  <div className="checkbox-group">
                    {renderCheckboxes(key, FILTER_CATEGORIES[key])}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="filter-row">
            {[
              ["outilsDev", "Outils Dev"],
              ["outilsSEO", "Outils SEO"],
            ].map(([key, label]) => (
              <div key={key} className="filter-category">
                <h4 onClick={() => toggleSection(key)}>
                  {label}
                  {openSections[key] ? (
                    <FaChevronUp size={14} />
                  ) : (
                    <FaChevronDown size={14} />
                  )}
                </h4>
                {openSections[key] && (
                  <div className="checkbox-group">
                    {renderCheckboxes(key, FILTER_CATEGORIES[key])}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="filter-row">
            {[
              ["outilsDesign", "Outils Design"],
              ["gestionProjet", "Gestion de projet"],
            ].map(([key, label]) => (
              <div key={key} className="filter-category">
                <h4 onClick={() => toggleSection(key)}>
                  {label}
                  {openSections[key] ? (
                    <FaChevronUp size={14} />
                  ) : (
                    <FaChevronDown size={14} />
                  )}
                </h4>
                {openSections[key] && (
                  <div className="checkbox-group">
                    {renderCheckboxes(key, FILTER_CATEGORIES[key])}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="projects__count">
            {filteredProjects.length} projet
            {filteredProjects.length > 1 ? "s" : ""} trouvé
            {filteredProjects.length !== projectsData.length
              ? ` sur ${projectsData.length}`
              : ""}
          </div>

          <div className="projects__grid">
            {filteredProjects.map((project) => (
              <article key={project.id} className="project-card">
                <div className="project-card__image">
                  <img src={project.image} alt={project.title} />
                  <div
                    className={`project-card__status project-card__status--${project.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {project.status}
                  </div>
                </div>

                <div className="project-card__content">
                  <h3 className="project-card__title">{project.title}</h3>
                  <p className="project-card__description">
                    {project.description}
                  </p>

                  <div className="project-card__technologies">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="project-card__actions">
                    {project.projet && (
                      <a
                        href={project.projet}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn--secondary"
                      >
                        Voir le projet
                      </a>
                    )}
                    {project.code && (
                      <a
                        href={project.code}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn--outline"
                      >
                        Code source
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
