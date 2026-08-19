import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import StudentCard from './components/StudentCard'

export type Student={
  id: string,
  name: string,
  major: string,
  gpa: number,
  avatar: string
}
function App() {
    const getAvatar=(id:number)=>"https://i.pravatar.cc/150?img=${id}";


    const students: Student[]=[
      {id: "123", name: "Taneem", major: "Software Engineering", gpa: 3.96, avatar: getAvatar(3)},
      {id: "123", name: "Taneem", major: "Software Engineering", gpa: 3.96, avatar: getAvatar(3)},
      {id: "123", name: "Taneem", major: "Software Engineering", gpa: 3.96, avatar: getAvatar(3)},
      {id: "123", name: "Taneem", major: "Software Engineering", gpa: 2.96, avatar: getAvatar(3)},
      {id: "123", name: "Taneem", major: "Software Engineering", gpa: 3.96, avatar: getAvatar(3)},

    ];

  return (

    <>
      <div className="app">
        <h1 className="dashboard-title">Student Dashboard</h1>
        <div className="card-grid"> {students.map((student)=>(
          <StudentCard key={student.id} student={student}>
          </StudentCard>
        )
        )}</div>
      </div>
    </>
  )
}

export default App
