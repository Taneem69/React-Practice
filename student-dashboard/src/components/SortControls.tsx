import { useStudents } from '../contexts/StudentContext';
import './SortControls.css';

export default function SortControls() {
  const { sortBy, setSortBy } = useStudents();

  return (
    <div className="sort-controls">
      <button
        className={`sort-btn ${sortBy === 'default' ? 'active' : ''}`}
        onClick={() => setSortBy('default')}
      >
        Default
      </button>
      <button
        className={`sort-btn ${sortBy === 'name' ? 'active' : ''}`}
        onClick={() => setSortBy('name')}
      >
        Name (A-Z)
      </button>
      <button
        className={`sort-btn ${sortBy === 'gpa' ? 'active' : ''}`}
        onClick={() => setSortBy('gpa')}
      >
        GPA (High-Low)
      </button>
    </div>
  );
}
