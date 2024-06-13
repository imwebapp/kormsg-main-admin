import axiosClient from "./axiosClient";
import { CATEGORY, STORE } from "./urlConfig";
export const storeApi = {
  getList: (params?: any) => {
    return axiosClient.get(`${STORE}`, { params });
  },
  cloneStore: (id: string) => {
    return axiosClient.post(`${STORE}/clone_shop/${id}`);
  },
  hardDeleteStore: (id: string) => {
    return axiosClient.delete(`${STORE}/hard_delete/${id}`);
  },
  deleteStore: (id: string) => {
    return axiosClient.delete(`${STORE}/${id}`);
  },
  getListCategory: (params?: any) => {
    return axiosClient.get(`${CATEGORY}`, { params });
  },
  getCountStore: (params?: any) => {
    return axiosClient.get(`${STORE}/count_shop`, { params });
  },
  getListThema: (params?: any) => {
    return axiosClient.get(`${CATEGORY}`, { params });
  },
  approveStore: (params?: any, id?: any) => {
    return axiosClient.put(`${STORE}/${id}`, params);
  },
  rejectStore: (params?: any, id?: string) => {
    return axiosClient.put(`${STORE}/${id}`, params);
  },
  downloadExcel: (params?: any) => {
    return axiosClient.get(`${STORE}/download_excel`, { params });
  },
  uploadExcel: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file, file.name);
    const res: any = await axiosClient.post(`${STORE}/import_excel`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  },
  updateStore: (params?: any, id?: string) => {
    return axiosClient.put(`${STORE}/${id}`, params);
  },
};
