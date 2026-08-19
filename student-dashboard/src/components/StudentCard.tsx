import type {Student} from "../App"
import CourseTag from "./CourseTag";
import StatBadge from "./StatBadge";
import "./StudentCard.css";

export default function StudentCard(props:{student: Student}){
    const{student}=props;
    const gpaColor = student.gpa >= 3.5 ? "var(--color-gpa-high)" : "#e74c3c";

    return (
        <div className="student-card">
            <img src={student.avatar} alt="student.name" className="avatar"/>

            <h3 className="student-name">{student.name}</h3>

            <p className="student-id">ID: {student.id}</p>
            <p className="student-major">Major: {student.major}</p>

            <div className="courses-container">
                {student.courses.map((course, index)=>
                    <CourseTag key={index} courseName={course} color={student.courseColors[index]}/>
                )}
            </div>


            <div className="stats-container">
                <StatBadge label="GPA" value={student.gpa.toString()} color={gpaColor}/>

                <StatBadge label="Credits" value={student.gpa.toString()}/>

            </div>
            
        </div>
    )
}