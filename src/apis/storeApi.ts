import axiosClient from "./axiosClient";
import { CATEGORY, STORE } from "./urlConfig";

export const storeApi = {
  getList: (params?: any) => {
    console.log("params", params);

    return axiosClient.get(`${STORE}`, { params });
  },
  cloneStore: (id: string) => {
    return axiosClient.post(`${STORE}/clone_shop/${id}`);
  },
  deleteStore: (id: string) => {
    return axiosClient.delete(`${STORE}/${id}`);
  },
  getListCategory: (params?: any) => {
    return axiosClient.get(`${CATEGORY}`, { params });
  },
};
