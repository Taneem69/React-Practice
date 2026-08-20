import "./DashboardHeader.css";

export default function DashboardHeader(props: {currentView: string; onViewChange: (view: string) => void; favoriteCount: number}) {
  return (
    <header className="dashboard-header">
      <div className="header-content">
        <h1 className="header-title">Student Dashboard</h1>
        <p className="header-tagline">Manage and track student performance</p>
        <div className="favorite-badge">{props.favoriteCount} Favorites</div>
      </div>
      <nav className="header-nav">
        <button className={`nav-link ${props.currentView=== "dashboard" ? "active" : ""}`} onClick={()=>props.onViewChange("dashboard")}>Dashboard</button>
        <button className={`nav-link ${props.currentView=== "students" ? "active" : ""}`} onClick={()=>props.onViewChange("students")}>Students</button>
        <button className={`nav-link ${props.currentView=== "courses" ? "active" : ""}`} onClick={()=>props.onViewChange("courses")}>Courses</button>
        <button className={`nav-link ${props.currentView=== "reports" ? "active" : ""}`} onClick={()=>props.onViewChange("reports")}>Reports</button>
      </nav>
    </header>
  );
}

