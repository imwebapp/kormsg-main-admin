import axiosClient from "./axiosClient";
import { REGION } from "./urlConfig";

export const regionApi = {
  getList: (params?: any) => {
    return axiosClient.get(`${REGION}`, { params });
  },
  create: (data: any) => {
    return axiosClient.post(`${REGION}`, data);
  },
  update: (id: string, data: any) => {
    return axiosClient.put(`${REGION}/${id}`, data);
  },
  delete: (id: string, new_group_id?: string) => {
    console.log(new_group_id);

    return axiosClient.delete(
      `${REGION}/${id}${
        new_group_id && new_group_id.trim() !== ""
          ? `?new_group=${encodeURIComponent(new_group_id)}`
          : ""
      }`
    );
  },
  orderGroup: (id: string, data?: any) => {
    return axiosClient.put(`${REGION}/order-group/${id}`, data);
  },
};
