import "./index.css";
import useZuStore from "../zuStore";
import Course from "./Course";
import MyCourses from "./MyCourses";
import { useRef, useEffect } from "react";

function Courses() {
  // console.log(courses);
  const courses = useZuStore((state) => state.courses);
  const setDragDivHeight = useZuStore((state) => state.setDragDivHeight);
  const dragDivHeight = useZuStore((state) => state.dragDivHeight);
  const div1Ref = useRef(null);
  
  useEffect(() => {
    setDragDivHeight(div1Ref.current.clientHeight);
  },[dragDivHeight]);
  

  return (
    <div className="dragDropArea"> 
         
    <div className="coursePage">
      <h3>Available Courses</h3>
      <div className="coursePageDiv" ref={div1Ref}>
      {courses &&
        courses.map((course) => (
          <Course key={course.sys_id} course={course} />
        ))}
        </div>
    </div> <MyCourses /></div>
  );
}

export default Courses;
