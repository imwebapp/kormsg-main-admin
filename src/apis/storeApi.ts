import axiosClient from "./axiosClient";
import { STORE } from "./urlConfig";

export const storeApi = {
  getList: (params?: any) => {
    return axiosClient.get(`${STORE}`, { params });
  },
  cloneStore: (id: string) => {
    return axiosClient.post(`shop/clone_shop/${id}`);
  },
  deleteStore: (id: string) => {
    return axiosClient.delete(`shop/${id}`);
  },
};
