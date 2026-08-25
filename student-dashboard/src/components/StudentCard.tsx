import { useStudents } from '../contexts/StudentContext';
import CourseTag from './CourseTag';
import StatBadge from './StatBadge';
import type { Student } from '../App';
import './StudentCard.css';

export default function StudentCard({ student }: { student: Student }) {
  const { favorites, toggleFavorite, removeStudent } = useStudents();
  const isFavorite = favorites.includes(student.id);
  const gpaColor = student.gpa >= 3.5 ? 'var(--color-gpa-high)' : 'var(--color-gpa-low)';

  return (
    <div className="student-card">
      <div className="card-header">
        <img src={student.avatar} alt={student.name} className="avatar" />
        <button
          className={`favorite-btn ${isFavorite ? 'favorite' : ''}`}
          onClick={() => toggleFavorite(student.id)}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
        <button
          className="remove-btn"
          onClick={() => removeStudent(student.id)}
          title="Remove student"
        >
          ✕
        </button>
      </div>
      <h3 className="student-name">{student.name}</h3>
      <p className="student-id">ID: {student.id}</p>
      <p className="student-major">Major: {student.major}</p>
      <div className="courses-container">
        {student.courses.map((course, index) => (
          <CourseTag key={index} courseName={course} color={student.courseColors[index]} />
        ))}
      </div>
      <div className="stats-container">
        <StatBadge label="GPA" value={student.gpa.toString()} color={gpaColor} />
        <StatBadge label="Credits" value={student.credits.toString()} />
      </div>
    </div>
  );
}
