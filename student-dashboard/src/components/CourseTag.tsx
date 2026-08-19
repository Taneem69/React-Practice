import "./CourseTag.css";
export default function CourseTag(props:{courseName: string; color: string}){
    return (
        <span className="course-tag" style={{backgroundColor: props.color}}>{props.courseName}</span>
    )
}