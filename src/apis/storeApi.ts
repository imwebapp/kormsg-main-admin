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
  getCountStore: () => {
    return axiosClient.get(`${STORE}/count_shop`);
  },
  getListThema: (params?: any) => {
    return axiosClient.get(`${CATEGORY}`, { params });
  },
  approveStore: (params?: any, ids?: any) => {
    const encodedIds = encodeURIComponent(JSON.stringify(ids));
    return axiosClient.put(
      `${STORE}/update_expiration_date_multiple?items=${encodedIds}`,
      params
    );
  },
  rejectStore: (params?: any, id?: string) => {
    return axiosClient.put(`${STORE}/${id}`, params);
  },
};
