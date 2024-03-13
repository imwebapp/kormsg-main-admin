import axiosClient from "./axiosClient";
import { STORE } from "./urlConfig";

export const storeApi = {
  getList: (params?: any) => {
    return axiosClient.get(`${STORE}`, { params });
  },
};
