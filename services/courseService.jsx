import { axiosInstance } from "./axiosService";

export const unSubscribeToCourse = async (subscriptionId) => {
  axiosInstance
    .delete(
      `/api/now/table/x_quo_coursehub_course_subscription/${subscriptionId}`
    )
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error("Error unsubscribing to course:", error);
    });
};

