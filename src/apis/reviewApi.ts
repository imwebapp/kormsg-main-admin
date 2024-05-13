import axiosClient from "./axiosClient";
import { REVIEW } from "./urlConfig";

export const reviewApi = {
  getList: (params?: any) => {
    return axiosClient.get(`${REVIEW}`, { params });
  },
};
