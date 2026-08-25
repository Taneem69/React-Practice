import { useStudents } from '../contexts/StudentContext';
import './SearchBar.css';

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useStudents();

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by name or major..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      {searchQuery && (
        <button className="search-clear" onClick={() => setSearchQuery('')}>
          ✕
        </button>
      )}
    </div>
  );
}
