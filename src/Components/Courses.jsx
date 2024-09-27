import "./index.css";
import useZuStore from "../zuStore";
import Course from "./Course";

function Courses() {
  // console.log(courses);
  const courses = useZuStore((state) => state.courses);

  

  return (
    <div className="coursePage">
      {courses &&
        courses.map((course) => (
          <Course key={course.sys_id} course={course}/>
        ))}
      {/* <button className="buttonClass" onClick={() => handleUpdate(courses[0].sys_id)}>Update</button> */}
    </div>
  );
}

export default Courses;
