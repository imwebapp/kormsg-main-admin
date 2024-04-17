import axiosClient from "./axiosClient";
import { FAQ, FAQ_CATEGORY, SETTING } from "./urlConfig";
export const settingApi = {
  getList: (params?: any) => {
    return axiosClient.get(`${SETTING}`, { params });
  },
  updateSetting: (id: string, data: any) => {
    return axiosClient.put(`${SETTING}/${id}`, data);
  },
  getListFaqCategory: (params: any) => {
    return axiosClient.get(`${FAQ_CATEGORY}`, { params });
  },
  createFaqCategory: (params: any) => {
    return axiosClient.post(`${FAQ_CATEGORY}`, params);
  },
  editFaqCategory: (params: any, id: string) => {
    return axiosClient.put(`${FAQ_CATEGORY}/${id}`, { params });
  },
  deleteFaqCategory: (id: any) => {
    return axiosClient.delete(`${FAQ_CATEGORY}/${id}`);
  },
  createFaq: (params: any) => {
    return axiosClient.post(`${FAQ}`, params);
  },

  deleteFaq: (id: any) => {
    return axiosClient.delete(`${FAQ}/${id}`);
  },
  getListFaq: (params: any) => {
    return axiosClient.get(`${FAQ}`, { params });
  },
};
