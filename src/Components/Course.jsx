import "./index.css";
import useZuStore from "../zuStore";
import { unSubscribeToCourse } from "../../services/courseService";
import { useState } from "react";
import { axiosInstance } from "../../services/axiosService";
import PropTypes from "prop-types";

function Course({ course }) {
  Course.propTypes = {
    course: PropTypes.object.isRequired
  };
  // console.log(courses);

  const myCourses = useZuStore((state) => state.myCourses);
  const setMyCourses = useZuStore((state) => state.setMyCourses);
  const unsubscribeMyCourse = useZuStore((state) => state.unsubscribeMyCourse);
  const activeLearner = useZuStore((state) => state.activeLearner);
  const [loading, setLoading] = useState(false);
  const subscribed = myCourses.some(
    (mycourse) => mycourse.course.value == course.sys_id
  );
  console.log(loading);

  const subscribeToCourse = async (courseId, learner_id) => {
    setLoading(true);
    if (learner_id) {
      axiosInstance
        .post(`/api/now/table/x_quo_coursehub_course_subscription`, {
          course: courseId,
          learner: learner_id
        })
        .then((response) => {
          console.log(response);
          setMyCourses();
        })
        .catch((error) => {
          console.error("Error subscribing to course:", error);
        })
        .finally(setTimeout(() => setLoading(false), 1200));
    } else {
      setLoading(false);
      alert("Please select a user to subscribe to courses.");
    }
  };

  const handleOnDrag = (e, courseId, learnerId) => {
    e.dataTransfer.setData("courseId", courseId);
    e.dataTransfer.setData("learnerId", learnerId);
  }

  return (
    <div
      key={course.sys_id}
      className="courseContainer"
      id="draggableElement"
      draggable
      onDragStart={(e) =>
        handleOnDrag(e, course.sys_id, activeLearner.learner_id)
      }
    >
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
        {loading ? (
          <button className="buttonClass" disabled>
            Subscribing...
          </button>
        ) : subscribed ? (
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
        ) : (
          <button
            className="buttonClass"
            onClick={() =>
              subscribeToCourse(course.sys_id, activeLearner.learner_id)
            }
          >
            Subscribe
          </button>
        )}
      </div>
    </div>
  );
}

export default Course;
