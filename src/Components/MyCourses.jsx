import "./index.css";
import useZuStore from "../zuStore";
import { unSubscribeToCourse } from "../../services/courseService";
import { axiosInstance } from '../../services/axiosService';

import { useRef, useEffect} from "react";



function MyCourses() {
  // console.log(courses);
  const courses = useZuStore((state) => state.courses);
  const myCourses = useZuStore((state) => state.myCourses);
  const subscribedCourses = courses.filter((course) =>
    myCourses.some((myCourse) => myCourse.course.value === course.sys_id)
  );
  const unsubscribeMyCourse = useZuStore((state) => state.unsubscribeMyCourse);
  const dragDivHeight = useZuStore((state) => state.dragDivHeight);

  const div2Ref = useRef(null);
  
  const handleDrop = (e) => {
   
    const courseId = e.dataTransfer.getData("courseId");
    const learnerId = e.dataTransfer.getData("learnerId");
    const hasUserSubbedToCourse = myCourses.find((mycourse) => mycourse.course.value == courseId);
    if(!hasUserSubbedToCourse){subscribeToCourse(courseId, learnerId)}
    else{alert("You are already subscribed to this course.")}
  }

  const handleDragOver = (e) => {
    e.preventDefault();
  }

  const subscribeToCourse = async (courseId, learner_id) => {
    if (learner_id) {
      axiosInstance
        .post(`/api/now/table/x_quo_coursehub_course_subscription`, {
          course: courseId,
          learner: learner_id
        })
        .then((response) => {
          console.log(response);
          useZuStore.getState().setMyCourses();
        })
        .catch((error) => {
          console.error("Error subscribing to course:", error);
        });
    } else {
      alert("Please select a user to subscribe to courses.");
    }
  }
useEffect(() => {

  div2Ref.current.style.height = `${dragDivHeight}px`;
},[dragDivHeight]);
 
  return (
    <div className="coursePage">
      <h3>My Courses</h3>
      <div className="myCoursePageDiv" onDrop={handleDrop} onDragOver={handleDragOver}  ref={div2Ref}>
      {subscribedCourses.length==0 ? <h3 style={{color:"black"}}>Drag and Drop Courses Here</h3> :(
        subscribedCourses.map((course) => (
          <div key={course.sys_id} className="myCourseContainer">
            <div className="courseDesc">
              <h2>{course.title}</h2>
              <p>{course.description}</p>
              <p>
                {(new Date(course.duration) -
                  new Date(
                    "Thu Jan 1 1970 00:00:00 GMT+0200 (Eastern European Standard Time)"
                  )) /
                  86400000}{" "}
                Days
              </p>
            </div>
            <div className="courseButtons">
              <button
                className="buttonClass"
                onClick={() => {
                  unSubscribeToCourse(
                    myCourses.find(
                      (mycourse) => mycourse.course.value == course.sys_id
                    ).sys_id
                  ),
                    unsubscribeMyCourse(course.sys_id);
                }}
              >
                Unsubscribe
              </button>
            </div>
          </div>
        )))}
    </div>
    </div>
  );
}

export default MyCourses;
