import axiosClient from "./axiosClient";
import { POST } from "./urlConfig";

export const postApi = {
  getList: (params?: any) => {
    return axiosClient.get(`${POST}`, { params });
  },
};
