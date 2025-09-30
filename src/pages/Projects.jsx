import { useState, useMemo } from "react";
import ProjectCard from "../components/ProjectCard";
import ProjectFilters from "../components/ProjectFilters";
import { useFetchProjects } from "../hooks/UseFectchProjects";
import "./projects.scss";

export default function Projects() {
  const { projectsData, loading, error } = useFetchProjects();
  const [filters, setFilters] = useState({
    languages: new Set(),
    frameworks: new Set(),
    outilsDev: new Set(),
  });
  const [openSections, setOpenSections] = useState({
    languages: true,
    frameworks: true,
    outilsDev: false,
  });
  const [search, setSearch] = useState("");

  // Génération dynamique des options de filtres
  const FILTER_CATEGORIES = useMemo(() => {
    const categories = ["languages", "frameworks", "outilsDev"];
    const labels = {
      languages: "Languages",
      frameworks: "Frameworks",
      outilsDev: "Outils Dev",
    };

    return categories.map((catKey) => {
      const optionsSet = new Set();
      projectsData.forEach((project) => {
        (project[catKey] || []).forEach((item) => optionsSet.add(item));
      });
      return {
        key: catKey,
        label: labels[catKey],
        options: Array.from(optionsSet).sort(),
        defaultOpen: true,
      };
    });
  }, [projectsData]);

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
        for (let cat of ["languages", "frameworks", "outilsDev"]) {
          const selectedSet = filters[cat];
          const projectItems = (project[cat] || []).map((t) => t.toLowerCase());
          if (
            selectedSet.size > 0 &&
            ![...selectedSet].some((sel) =>
              projectItems.includes(sel.toLowerCase())
            )
          ) {
            return false;
          }
        }

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

        {loading && <p>Chargement des projets...</p>}
        {error && <p style={{ color: "red" }}>Erreur : {error}</p>}

        {!loading && !error && (
          <>
            <ProjectFilters
              categories={FILTER_CATEGORIES}
              filters={filters}
              toggleFilter={toggleFilter}
              openSections={openSections}
              toggleSection={toggleSection}
              resetFilters={resetFilters}
              filteredCount={filteredProjects.length}
              totalCount={projectsData.length}
            />

            <div className="projects__grid">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
