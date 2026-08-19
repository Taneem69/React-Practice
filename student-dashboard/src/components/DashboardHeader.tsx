import "./DashboardHeader.css";

export default function DashboardHeader() {
  return (
    <header className="dashboard-header">
      <div className="header-content">
        <h1 className="header-title">Student Dashboard</h1>
        <p className="header-tagline">Manage and track student performance</p>
      </div>
      <nav className="header-nav">
        <a href="#" className="nav-link">Dashboard</a>
        <a href="#" className="nav-link">Students</a>
        <a href="#" className="nav-link">Courses</a>
        <a href="#" className="nav-link">Reports</a>
      </nav>
    </header>
  );
}

