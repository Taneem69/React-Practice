import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import StudentCard from './components/StudentCard'

import DashboardHeader from './components/DashboardHeader'

import StatBadge from './components/StatBadge'

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
function App() {
    const getAvatar=(id:number)=>"https://static01.nyt.com/images/2016/09/28/us/28xp-pepefrog/28xp-pepefrog-articleLarge.jpg?quality=75&auto=webp";


    const students: Student[]=[
      {id: "123", name: "Taneem", major: "Software Engineering", gpa: 3.96, credits: 120, avatar: getAvatar(3), courses: ["Advance Web Technologies", "Advance .Net", "SQT"], courseColors: ["#3498db", "#2ecc71", "#e74c3c"]},

      {id: "123", name: "Taneem", major: "Software Engineering", gpa: 3.96, credits: 120, avatar: getAvatar(3), courses: ["Advance Web Technologies", "Advance .Net", "SQT"], courseColors: ["#3498db", "#2ecc71", "#e74c3c"]},


      {id: "123", name: "Taneem", major: "Software Engineering", gpa: 2.96, credits: 120, avatar: getAvatar(3), courses: ["Advance Web Technologies", "Advance .Net", "SQT"], courseColors: ["#3498db", "#2ecc71", "#e74c3c"]},


      {id: "123", name: "Taneem", major: "Software Engineering", gpa: 3.96, credits: 120, avatar: getAvatar(3), courses: ["Advance Web Technologies", "Advance .Net", "SQT"], courseColors: ["#3498db", "#2ecc71", "#e74c3c"]},


      {id: "123", name: "Taneem", major: "Software Engineering", gpa: 3.96, credits: 120, avatar: getAvatar(3), courses: ["Advance Web Technologies", "Advance .Net", "SQT"], courseColors: ["#3498db", "#2ecc71", "#e74c3c"]},

      

    ];

    const totalStudents=students.length;

    const avgGPA=(students.reduce((sum, s)=> sum+s.gpa, 0)/totalStudents).toFixed(2);

  return (

    <>
      <DashboardHeader/>
      <div className="dashboard-stats">
        <StatBadge label="Total Students" value={totalStudents.toString()}/>

        <StatBadge label="Average GPA" value={avgGPA} color={"var(--color-gpa-high)"}/>

      </div>


      <div className='card-grid'>
        {students.map((student)=>
          <StudentCard key={student.id} student={student}/>
        )}
      </div>
    </>
  )
}

export default App
