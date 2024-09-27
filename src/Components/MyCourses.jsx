import "./index.css";
import useZuStore from "../zuStore";
import { unSubscribeToCourse } from "../../services/courseService";



function MyCourses() {
  // console.log(courses);
  const courses = useZuStore((state) => state.courses);
  const myCourses = useZuStore((state) => state.myCourses);
  const subscribedCourses = courses.filter((course) =>
    myCourses.some((myCourse) => myCourse.course.value === course.sys_id)
  );
  const unsubscribeMyCourse = useZuStore((state) => state.unsubscribeMyCourse);

  return (
    <div className="coursePage">
      {courses &&
        subscribedCourses.map((course) => (
          <div key={course.sys_id} className="courseContainer">
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
        ))}
      {/* <button className="buttonClass" onClick={() => handleUpdate(courses[0].sys_id)}>Update</button> */}
    </div>
  );
}

export default MyCourses;
