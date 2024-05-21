import axiosClient from "./axiosClient";
import { REVIEW } from "./urlConfig";

export const reviewApi = {
  getList: (params?: any) => {
    return axiosClient.get(`${REVIEW}`, { params });
  },
  //https://server-dev.kormsg.com/api/v1/review/{id}
  deleteComment: (id?: any) => {
    return axiosClient.delete(`${REVIEW}/${id}`);
  },
};
