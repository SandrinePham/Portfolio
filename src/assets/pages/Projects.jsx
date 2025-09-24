import { useState, useEffect, useMemo } from "react";
import { FaChevronDown } from "react-icons/fa";
import ProjectCard from "../components/ProjectCard";
import "./projects.scss";

const FILTER_CATEGORIES = {
  languages: ["HTML", "CSS", "JavaScript"],
  frameworks: ["React", "Redux", "React Router", "Sass", "Chart.js"],
  outilsDev: [
    "GitHub",
    "Node.js",
    "Yarn",
    "Swagger",
    "VS Code",
    "Chrome DevTools",
    "Vite",
    "API",
  ],
};

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
  });
  const [search, setSearch] = useState("");
  const [openSections, setOpenSections] = useState({
    languages: true,
    frameworks: true,
    outilsDev: false,
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const basePath = import.meta.env.BASE_URL || "";
        const res = await fetch(`${basePath}data/projects.json`);
        if (!res.ok) throw new Error(`Erreur HTTP : ${res.status}`);
        const data = await res.json();
        setProjectsData(data);
      } catch (err) {
        console.error("Erreur chargement JSON :", err);
      }
    };
    fetchProjects();
  }, []);

  const toggleSection = (section) =>
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));

  const toggleFilter = (category, value) => {
    setFilters((prev) => {
      const newSet = new Set(prev[category]);
      newSet.has(value) ? newSet.delete(value) : newSet.add(value);
      return { ...prev, [category]: newSet };
    });
  };

  const resetFilters = () => {
    setFilters({
      languages: new Set(),
      frameworks: new Set(),
      outilsDev: new Set(),
    });
    setSearch("");
  };

  const filteredProjects = useMemo(() => {
    return projectsData
      .sort((a, b) => b.id - a.id)
      .filter((project) => {
        const techs = project.technologies.map((t) => t.toLowerCase());
        const matches = (selectedSet) =>
          selectedSet.size === 0 ||
          [...selectedSet].some((sel) => techs.includes(sel.toLowerCase()));
        if (
          ![filters.languages, filters.frameworks, filters.outilsDev].every(
            matches
          )
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
  }, [projectsData, filters, search]);

  return (
    <div className="projects">
      <div className="container">
        <header className="projects__header">
          <h2 className="page-title">Mes Projets</h2>
          <div className="page-subtitle">Une sélection de mes créations</div>
        </header>

        <div className="projects__filters">
          {/* Ligne 1 : Languages et Frameworks */}
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

          {/* Ligne 2 : Outils Dev */}
          <div className="filter-row">
            <FilterCategory
              categoryKey="outilsDev"
              label="Outils Dev"
              options={FILTER_CATEGORIES.outilsDev}
              filters={filters}
              toggleFilter={toggleFilter}
              isOpen={openSections.outilsDev}
              toggleSection={toggleSection}
            />
          </div>

          {/* Bouton reset + compteur */}
          <div className="filter-row">
            <button className="btn btn--reset" onClick={resetFilters}>
              Réinitialiser filtres
            </button>
            <div className="projects__count">
              {filteredProjects.length} projet
              {filteredProjects.length > 1 ? "s" : ""} trouvé
              {filteredProjects.length !== projectsData.length
                ? ` sur ${projectsData.length}`
                : ""}
            </div>
          </div>

          {/* Grid de projets */}
          <div className="projects__grid">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
