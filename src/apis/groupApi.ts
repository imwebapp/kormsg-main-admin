import axiosClient from "./axiosClient";
import { GROUP } from "./urlConfig";

export const groupApi = {
  getList: (params?: any) => {
    return axiosClient.get(`${GROUP}`, { params });
  },
  create: (data: any) => {
    return axiosClient.post(`${GROUP}`, data);
  },
  update: (id: string, data: any) => {
    return axiosClient.put(`${GROUP}/${id}`, data);
  },
  delete: (id: string, new_group_id?: string) => {
    console.log(new_group_id);

    return axiosClient.delete(
      `${GROUP}/${id}${
        new_group_id && new_group_id.trim() !== ""
          ? `?new_group=${encodeURIComponent(new_group_id)}`
          : ""
      }`
    );
  },
  orderGroup: (id: string, data?: any) => {
    return axiosClient.put(`${GROUP}/order-group/${id}`, data);
  },
};
