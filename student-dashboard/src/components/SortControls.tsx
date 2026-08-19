import "./SortControls.css";

type SortOption = "default" | "name" | "gpa";

export default function SortControls(props: {sortBy: SortOption; onSortChange: (sort: SortOption) => void;}) {
  return (
    <div className="sort-controls">
      <button className={`sort-btn ${props.sortBy === "default" ? "active" : ""}`} onClick={() => props.onSortChange("default")}>
        Default
      </button>
      <button className={`sort-btn ${props.sortBy === "name" ? "active" : ""}`} onClick={() => props.onSortChange("name")}>
        Name (A-Z)
      </button>
      <button className={`sort-btn ${props.sortBy === "gpa" ? "active" : ""}`} onClick={() => props.onSortChange("gpa")}>
        GPA (High-Low)
      </button>
    </div>
  );
}