import { useTheme } from '../contexts/ThemeContext';
import { useStudents } from '../contexts/StudentContext';
import './DashboardHeader.css';

function DashboardHeader() {
  const { theme, toggleTheme } = useTheme();
  const { favorites } = useStudents();

  return (
    <header className="dashboard-header">
      <div className="header-content">
        <h1 className="header-title">Student Dashboard</h1>
        <p className="header-tagline">Manage and track student performance</p>
        <div className="favorites-badge">⭐ {favorites.length} Favorites</div>
      </div>
      <div className="header-actions">
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        <nav className="header-nav">
          {/* Navigation buttons – you can keep them or remove if not needed */}
          <button className="nav-link active">Dashboard</button>
          <button className="nav-link">Students</button>
          <button className="nav-link">Courses</button>
          <button className="nav-link">Reports</button>
        </nav>
      </div>
    </header>
  );
}

export default DashboardHeader;