import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "../services/axiosService";



const useZuStore = create(
  persist(
    (set, get) => ({
      learner: {},
      setLearner: (current) => set(() => ({ learner: current })),
      learners: [],
      setLearners: async () => {
        try {
          const response = await axiosInstance.get(
            `/api/now/table/x_quo_coursehub_learner`
          );
          set({
            learners: response?.data.result.map((learner) => ({
              learner_id: learner.sys_id,
              user_id: learner.user_account.value ? learner.user_account.value : "Couldnt fetch user"
            }))
          });
        } catch (error) {
          console.error("Error fetching learners:", error);
        }
      },
      activeLearner: {},
      setActiveLearner: (current) => set(() => ({ activeLearner: current })),
      courses: [],
      setCourses: async () => {
        try {
          const response = await axiosInstance.get(
            `/api/now/table/x_quo_coursehub_course`,
            {
              "Content-Type": "application/json",
             
            }
          );
          set({
            courses: response.data.result
          });
        } catch (error) {
          console.error("Error fetching courses:", error);
        }
      },
     
      myCourses: [],
      setMyCourses: async () => {
        try {
          const response = await axiosInstance.get(
            `/api/now/table/x_quo_coursehub_course_subscription?sysparm_query=learner=${get().activeLearner.learner_id}`,
            {
              "Content-Type": "application/json",
             
            }
          );
          set({
            myCourses: response.data.result
          });
        } catch (error) {
          console.error("Error fetching courses:", error);
        }
      },
      unsubscribeMyCourse: (courseId) => set(() => ({ myCourses: get().myCourses.filter((myCourse) => myCourse.course.value !== courseId) })),
      dragDivHeight: 0,
      setDragDivHeight: (height) => set(() => ({ dragDivHeight: height })),
    }),
    {
      name: "courseHubStorage", // name of the item in the storage (must be unique)
      onRehydrateStorage: () => (state) => {
        console.log("Rehydrating state:", state);
      }
    }
  )
);

export default useZuStore;
