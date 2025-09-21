function FilterCategory({ categoryKey, label, options, filters, toggleFilter, isOpen, toggleSection }) {
  return (
    <div className="filter-category">
      <h4 onClick={() => toggleSection(categoryKey)}>
        {label}
        {isOpen ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
      </h4>
      {isOpen && (
        <div className="checkbox-group">
          {options.map((opt) => (
            <span
              key={opt}
              className={`tag ${filters[categoryKey].has(opt) ? "tag--active" : ""}`}
              onClick={() => toggleFilter(categoryKey, opt)}
            >
              {opt}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
