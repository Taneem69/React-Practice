import { useTheme } from './contexts/ThemeContext';
import { useStudents } from './contexts/StudentContext';
import DashboardHeader from './components/DashboardHeader';
import StudentCard from './components/StudentCard';
import StatBadge from './components/StatBadge';
import SearchBar from './components/SearchBar';
import SortControls from './components/SortControls';
import AddStudentForm from './components/AddStudentForm';
import Spinner from './components/Spinner';
import './App.css';

export type Student = {
  id: string;
  name: string;
  major: string;
  gpa: number;
  credits: number;
  avatar: string;
  courses: string[];
  courseColors: string[];
};

function App() {
  const { theme } = useTheme();
  const { students, loading, searchQuery, setSearchQuery, sortBy, setSortBy, favorites } = useStudents();

  const totalStudents = students.length;

  return (
    <div className="app" data-theme={theme}>
      <DashboardHeader/>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="dashboard-stats">
            <StatBadge label="Total Students" value={totalStudents.toString()} />
            <StatBadge
              label="Average GPA"
              value={(students.reduce((sum, s) => sum + s.gpa, 0) / totalStudents || 0).toFixed(2)}
              color="var(--color-gpa-high)"
            />
            <StatBadge label="Favorites" value={favorites.length.toString()} />
          </div>

          <SearchBar/>
          <SortControls />

          <div className="card-grid">
            {students.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>

          {students.length === 0 && (
            <p className="no-results">No students found.</p>
          )}

          <AddStudentForm />
        </>
      )}
    </div>
  );
}

export default App;