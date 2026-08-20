import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import StudentCard from './components/StudentCard'

import DashboardHeader from './components/DashboardHeader'

import StatBadge from './components/StatBadge'

import SearchBar from './components/SearchBar'

import SortControls from './components/SortControls'

import Spinner from './components/Spinner'


export type Student={
  id: string,
  name: string,
  major: string,
  gpa: number,
  avatar: string,
  credits: number,
  courses: string[],
  courseColors: string[]
}

const getAvatar=(id:number)=>`https://static01.nyt.com/images/2016/09/28/us/28xp-pepefrog/28xp-pepefrog-articleLarge.jpg?quality=75&auto=webp?img=${id}`;


  const initialStudents: Student[]=[
    {id: "123", name: "Taneem", major: "Software Engineering", gpa: 396, credits: 120, avatar: getAvatar(3), courses: ["Advance WebTechnologies", "Advance .Net", "SQT"], courseColors: ["#3498db","#2ecc71", "#e74c3c"]},
    {id: "123", name: "Taneem", major: "Software Engineering", gpa: 396, credits: 120, avatar: getAvatar(3), courses: ["Advance WebTechnologies", "Advance .Net", "SQT"], courseColors: ["#3498db","#2ecc71", "#e74c3c"]},
    {id: "123", name: "Taneem", major: "Software Engineering", gpa: 296, credits: 120, avatar: getAvatar(3), courses: ["Advance WebTechnologies", "Advance .Net", "SQT"], courseColors: ["#3498db","#2ecc71", "#e74c3c"]},
    {id: "123", name: "Taneem", major: "Software Engineering", gpa: 396, credits: 120, avatar: getAvatar(3), courses: ["Advance WebTechnologies", "Advance .Net", "SQT"], courseColors: ["#3498db","#2ecc71", "#e74c3c"]},
    {id: "123", name: "Taneem", major: "Software Engineering", gpa: 396, credits: 120, avatar: getAvatar(3), courses: ["Advance WebTechnologies", "Advance .Net", "SQT"], courseColors: ["#3498db","#2ecc71", "#e74c3c"]},
    
  ];
function App() {

  const [students, setStudents]= useState<Student[]>([]);
  const [loading, setloading]= useState<boolean>(true);

  const [searchQuery, setSearchQuery]= useState<string>("");

  const [favorites, setFavorites]= useState<string[]>([]);

  const [sortBy, setSortBy]= useState<"default" | "name" | "gpa">("default");


  const [currentView, setCurrentView]= useState<string>("dashboard");

  const getFilteredAndSortedStudents=()=>{
    let filtered = students.filter(student=>{
      const query=searchQuery.toLowerCase();
      return student.name.toLowerCase().includes(query) || student.major.toLowerCase().includes(query);
    });

    switch(sortBy) {
      case "name":
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "gpa":
        filtered = [...filtered].sort((a, b) => b.gpa - a.gpa);
        break;
      default:
        // Default order (keep as is)
        break;
    }

    return filtered;
  };
    
  

  useEffect(()=>{
    setloading(true);
    const timer= setTimeout(() => {
      setStudents(initialStudents);
      setloading(false);
    }, 1500);

    return ()=> clearTimeout(timer);
  }, []);


  const toggleFavorite= (studentId: string)=>{
    setFavorites(prev => {
      if(prev.includes(studentId)){
        return prev.filter(id=>id!=studentId)
      }

      else{
        return[...prev, studentId];
      }
    });
  };


  useEffect(() => {
    const filteredCount = getFilteredAndSortedStudents().length;
    document.title = `Dashboard - ${filteredCount} Students`;
  }, [searchQuery, students]);




  const filteredStudents = getFilteredAndSortedStudents();

  // Render content based on current view
  const renderContent = () => {
    if (loading) {
      return <Spinner />;
    }

    switch(currentView) {
      case "dashboard":
        return (
          <>
            <div className="dashboard-stats">
              <StatBadge label="Total Students" value={students.length.toString()} />
              <StatBadge 
                label="Average GPA" 
                value={(students.reduce((sum, s) => sum + s.gpa, 0) / students.length).toFixed(2)} 
                color="var(--color-gpa-high)" 
              />
              <StatBadge label="Favorites" value={favorites.length.toString()} />
            </div>
            
            <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
            <SortControls sortBy={sortBy} onSortChange={setSortBy} />
            
            <div className="card-grid">
              {filteredStudents.map((student) => (
                <StudentCard 
                  key={student.id} 
                  student={student}
                  onFavoriteToggle={toggleFavorite}
                  isFavorite={favorites.includes(student.id)}
                />
              ))}
            </div>
            
            {filteredStudents.length === 0 && (
              <p className="no-results">No students found matching your search.</p>
            )}
          </>
        );
      
      case "students":
        return (
          <div className="page-content">
            <h2>All Students</h2>
            <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
            <SortControls sortBy={sortBy} onSortChange={setSortBy} />
            <div className="card-grid">
              {filteredStudents.map((student) => (
                <StudentCard 
                  key={student.id} 
                  student={student}
                  onFavoriteToggle={toggleFavorite}
                  isFavorite={favorites.includes(student.id)}
                />
              ))}
            </div>
          </div>
        );
      
      case "courses":
        return (
          <div className="page-content">
            <h2>Courses</h2>
            <p>All available courses will be displayed here.</p>
            <ul className="course-list">
              {students.flatMap(s => s.courses).map((course, index) => (
                <li key={index} className="course-item">{course}</li>
              ))}
            </ul>
          </div>
        );
      
      case "reports":
        return (
          <div className="page-content">
            <h2>Reports</h2>
            <p>Student performance reports will be shown here.</p>
            <div className="report-stats">
              <StatBadge label="Highest GPA" value="3.9" color="var(--color-gpa-high)" />
              <StatBadge label="Lowest GPA" value="2.9" color="var(--color-gpa-low)" />
            </div>
          </div>
        );
      
      default:
        return <p>Page not found</p>;
    }
  };

  return (
    <div className="app">
      <DashboardHeader 
        currentView={currentView} 
        onViewChange={setCurrentView}
        favoriteCount={favorites.length}
      />
      {renderContent()}
    </div>
  )
}

export default App
