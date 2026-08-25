import { useState, useEffect } from 'react';
import { useStudents } from '../contexts/StudentContext';
import Notification from './Notification';
import './AddStudentForm.css';


export default function AddStudentForm() {
  const { addStudent, students } = useStudents();

  // Form fields
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [major, setMajor] = useState('');
  const [gpa, setGpa] = useState('');
  const [courses, setCourses] = useState('');

  // Validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Notification state
  const [showNotification, setShowNotification] = useState(false);

  // Task 4: Auto-dismiss notification after 3s
  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => setShowNotification(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) newErrors.name = 'Full name is required.';
    if (!id.trim()) {
      newErrors.id = 'Student ID is required.';
    } else if (isNaN(Number(id))) {
      newErrors.id = 'Student ID must be numeric.';
    } else if (students.some((s) => s.id === id)) {
      newErrors.id = 'Student ID must be unique.';
    }
    if (!major.trim()) newErrors.major = 'Major is required.';
    if (!gpa.trim()) {
      newErrors.gpa = 'GPA is required.';
    } else {
      const gpaNum = parseFloat(gpa);
      if (isNaN(gpaNum) || gpaNum < 0 || gpaNum > 4.0) {
        newErrors.gpa = 'GPA must be between 0 and 4.0.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const newStudent = {
      id,
      name: name.trim(),
      major: major.trim(),
      gpa: parseFloat(gpa),
      credits: 0, // you can set a default or add field
      avatar: `https://i.pravatar.cc/150?img=${students.length + 10}`,
      courses: courses.split(',').map((c) => c.trim()).filter(Boolean),
      courseColors: ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6'], // random
    };

    addStudent(newStudent);
    setShowNotification(true);

    // Reset form
    setName('');
    setId('');
    setMajor('');
    setGpa('');
    setCourses('');
    setErrors({});
  };

  return (
    <div className="add-student-form">
      <h2>Add New Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Student ID</label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className={errors.id ? 'error' : ''}
          />
          {errors.id && <span className="error-message">{errors.id}</span>}
        </div>

        <div className="form-group">
          <label>Major</label>
          <input
            type="text"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            className={errors.major ? 'error' : ''}
          />
          {errors.major && <span className="error-message">{errors.major}</span>}
        </div>

        <div className="form-group">
          <label>GPA (0.0 – 4.0)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            max="4"
            value={gpa}
            onChange={(e) => setGpa(e.target.value)}
            className={errors.gpa ? 'error' : ''}
          />
          {errors.gpa && <span className="error-message">{errors.gpa}</span>}
        </div>

        <div className="form-group">
          <label>Courses (comma-separated)</label>
          <input
            type="text"
            value={courses}
            onChange={(e) => setCourses(e.target.value)}
            placeholder="e.g. Math, Physics, English"
          />
        </div>

        <button type="submit" className="submit-btn">Add Student</button>
      </form>

      {showNotification && (
        <Notification message="Student added successfully!" />
      )}
    </div>
  );
}

