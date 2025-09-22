import { useState, useMemo, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

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

// Composant FilterCategory
function FilterCategory({
  categoryKey,
  label,
  options,
  filters,
  toggleFilter,
  isOpen,
  toggleSection,
}) {
  return (
    <div className="filter-category">
      <h4 onClick={() => toggleSection(categoryKey)}>
        <span className="label-text">{label}</span>
        <FaChevronDown
          size={14}
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </h4>
      <div className={`checkbox-group ${isOpen ? "open" : ""}`}>
        {options.map((opt) => (
          <span
            key={opt}
            className={`tag ${
              filters[categoryKey].has(opt) ? "tag--active" : ""
            }`}
            onClick={() => toggleFilter(categoryKey, opt)}
          >
            {opt}
          </span>
        ))}
      </div>
    </div>
  );
}

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

  // Chargement des projets
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const basePath = import.meta.env.BASE_URL || "";
        const response = await fetch(`${basePath}data/projects.json`);
        if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);
        const data = await response.json();
        setProjectsData(data);
      } catch (error) {
        console.error("Erreur chargement JSON :", error);
      }
    };
    fetchProjects();
  }, []);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleFilter = (category, value) => {
    setFilters((prev) => {
      const newSet = new Set(prev[category]);
      if (newSet.has(value)) newSet.delete(value);
      else newSet.add(value);
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
        const matchesCategory = (selectedSet) =>
          selectedSet.size === 0 ||
          [...selectedSet].some((sel) => techs.includes(sel.toLowerCase()));
        if (
          !matchesCategory(filters.languages) ||
          !matchesCategory(filters.frameworks) ||
          !matchesCategory(filters.outilsDev) ||
          !matchesCategory(filters.outilsSEO) ||
          !matchesCategory(filters.outilsDesign) ||
          !matchesCategory(filters.gestionProjet)
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

  return (
    <div className="projects">
      <div className="container">
        <div className="projects__header">
          <h2 className="page-title">Mes Projets</h2>
          <div className="page-subtitle">Une sélection de mes créations</div>
        </div>

        <div className="projects__filters">
          <div className="filter-row">
            {["languages", "frameworks"].map((key) => (
              <FilterCategory
                key={key}
                categoryKey={key}
                label={key === "languages" ? "Languages" : "Frameworks"}
                options={FILTER_CATEGORIES[key]}
                filters={filters}
                toggleFilter={toggleFilter}
                isOpen={openSections[key]}
                toggleSection={toggleSection}
              />
            ))}
          </div>

          <div className="filter-row">
            {["outilsDev"].map((key) => (
              <FilterCategory
                key={key}
                categoryKey={key}
                label={key === "outilsDev" ? "Outils Dev" : ""}
                options={FILTER_CATEGORIES[key]}
                filters={filters}
                toggleFilter={toggleFilter}
                isOpen={openSections[key]}
                toggleSection={toggleSection}
              />
            ))}
          </div>

          <div className="filter-row">
            <button onClick={resetFilters} className="btn btn--reset">
              Réinitialiser filtres
            </button>

            <div className="projects__count">
              {filteredProjects.length} projet
              {filteredProjects.length > 1 ? "s" : ""} trouvés
              {filteredProjects.length !== projectsData.length
                ? ` sur ${projectsData.length}`
                : ""}
            </div>
          </div>

          <div className="projects__grid">
            {filteredProjects.map((project) => (
              <article key={project.id} className="project-card">
                <div className="project-card__image">
                  <img
                    src={`${import.meta.env.BASE_URL}${project.image.slice(1)}`}
                    alt={project.title}
                    loading="lazy"
                  />
                  <div
                    className={`project-card__status project-card__status--${project.status
                      .toLowerCase()
                      .replace(/\s/g, "-")}`}
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
