// FilterCategory.jsx
import { memo, useCallback } from "react";
import { FaChevronDown } from "react-icons/fa";

// 🔹 Composant Tag
function Tag({ label, active, onClick }) {
  return (
    <span
      className={`tag ${active ? "tag--active" : ""}`}
      onClick={onClick}
    >
      {label}
    </span>
  );
}

const MemoTag = memo(Tag);

export default function FilterCategory({
  categoryKey,
  label,
  options,
  filters,
  toggleFilter,
  isOpen,
  toggleSection,
}) {
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
        <span className="label-text">{label}</span>
        <FaChevronDown
          size={14}
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </h4>

      {/* ✅ Toujours rendu, mais avec une classe dynamique */}
      <div className={`checkbox-group ${isOpen ? "open" : ""}`}>
        {options.map((opt) => (
          <MemoTag
            key={opt}
            label={opt}
            active={filters[categoryKey].has(opt)}
            onClick={handleToggleFilter(opt)}
          />
        ))}
      </div>
    </div>
  );
}
