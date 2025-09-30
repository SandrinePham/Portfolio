import FilterCategory from "./FilterCategory";
import "./ProjectFilters.scss";

export default function ProjectFilters({
  categories = [],
  filters,
  toggleFilter,
  openSections,
  toggleSection,
  resetFilters,
  filteredCount,
  totalCount,
}) {
  return (
    <div className="projects__filters">
      {categories.map((cat) => (
        <FilterCategory
          key={cat.key}
          categoryKey={cat.key}
          label={cat.label}
          options={cat.options}
          filters={filters}
          toggleFilter={toggleFilter}
          isOpen={openSections[cat.key]}
          toggleSection={toggleSection}
        />
      ))}

      <div className="filter-row">
        <button className="btn btn--reset" onClick={resetFilters}>
          Réinitialiser filtres
        </button>
        <div className="projects__count">
          {filteredCount} projet{filteredCount > 1 ? "s" : ""} trouvé
          {filteredCount !== totalCount ? ` sur ${totalCount}` : ""}
        </div>
      </div>
    </div>
  );
}
