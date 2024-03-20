import axiosClient from "./axiosClient";
import { USER } from "./urlConfig";

export const userApi = {
  getList: (params?: any) => {
    return axiosClient.get(`${USER}`, { params });
  },
  getCount: (params?: string | number) => {
    return axiosClient.get(`${USER}/count?group_id=${params}`);
  },
};
