import { memo, useCallback } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

function Option({ label, active, onClick }) {
  return (
    <span className={`tag ${active ? "tag--active" : ""}`} onClick={onClick}>
      {label}
    </span>
  );
}

// Memo pour ne re-render que si props changent
const MemoOption = memo(Option);

export default function FilterCategory({
  categoryKey,
  label,
  options,
  filters,
  toggleFilter,
  isOpen,
  toggleSection,
}) {
  // useCallback pour mémoriser la fonction
  const handleToggleSection = useCallback(
    () => toggleSection(categoryKey),
    [categoryKey, toggleSection]
  );
  const handleToggleFilter = useCallback(
    (opt) => () => toggleFilter(categoryKey, opt),
    [categoryKey, toggleFilter]
  );

  return (
    <div className="filter-category">
      <h4 onClick={handleToggleSection}>
        {label}
        {isOpen ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
      </h4>
      {isOpen && (
        <div className="checkbox-group">
          {options.map((opt) => (
            <MemoOption
              key={opt}
              label={opt}
              active={filters[categoryKey].has(opt)}
              onClick={handleToggleFilter(opt)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
