// Projects.jsx
import { useState, useMemo } from "react";
import ProjectCard from "../components/ProjectCard";
import FilterCategory from "../components/FilterCategory";
import { useFetchProjects } from "../hooks/UseFectchProjects"; // ✅ Hook personnalisé
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

export default function Projects() {
  const { projectsData, loading, error } = useFetchProjects(); // ✅ utilisation du hook
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

        if (![filters.languages, filters.frameworks, filters.outilsDev].every(matches)) {
          return false;
        }

        if (
          search.trim() &&
          !(
            project.title.toLowerCase().includes(search.toLowerCase()) ||
            project.description.toLowerCase().includes(search.toLowerCase())
          )
        ) {
          return false;
        }

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

        {loading && <p>Chargement des projets...</p>}
        {error && <p style={{ color: "red" }}>Erreur : {error}</p>}

        {!loading && !error && (
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
        )}
      </div>
    </div>
  );
}

