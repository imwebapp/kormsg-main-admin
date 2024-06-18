import { convertParams } from "../utils/common";
import axiosClient from "./axiosClient";
import { DISTRICT } from "./urlConfig";

export const districtApi = {
  getList: (params?: any) => {
    return axiosClient.get(`${DISTRICT}`, { params });
  },
  create: (data: any) => {
    return axiosClient.post(`${DISTRICT}`, data);
  },
  update: (id: string, data: any) => {
    return axiosClient.put(`${DISTRICT}/${id}`, data);
  },
  delete: (id: string, new_group_id?: string) => {
    console.log(new_group_id);

    return axiosClient.delete(
      `${DISTRICT}/${id}${new_group_id && new_group_id.trim() !== ""
        ? `?new_group=${encodeURIComponent(new_group_id)}`
        : ""
      }`
    );
  },
  orderGroup: (id: string, data?: any) => {
    return axiosClient.put(`${DISTRICT}/order-group/${id}`, data);
  },
  orderDistrict: async (id?: string, data?: any) => {
    return await axiosClient.put(`${DISTRICT}/order-item/${id}`, data);
  },
};
