import type {Student} from "../App"

export default function StudentCard(props:{student: Student}){
    const{student}=props;
    const gpaColor = student.gpa >= 3.5 ? "var(--color-gpa-high)" : "#e74c3c";

    return (
        <div className="student-card">
            <img src={student.avatar} alt="student.name" className="avatar"/>

            <h3 className="student-name">{student.name}</h3>

            <p className="student-id">ID: {student.id}</p>
            <p className="student-major">Major: {student.major}</p>
            <p className="student-gpa" style={{backgroundColor: gpaColor}}>GPA: {student.gpa}</p>
            
        </div>
    )
}