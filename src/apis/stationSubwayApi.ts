import axiosClient from "./axiosClient";
import { SUBWAY } from "./urlConfig";

export const subwayApi = {
  getList: (params?: any) => {
    return axiosClient.get(`${SUBWAY}`, { params });
  },
  create: (data: any) => {
    return axiosClient.post(`${SUBWAY}`, data);
  },
  update: (id: string, data: any) => {
    return axiosClient.put(`${SUBWAY}/${id}`, data);
  },
  delete: (id: string, new_group_id?: string) => {
    console.log(new_group_id);

    return axiosClient.delete(
      `${SUBWAY}/${id}${new_group_id && new_group_id.trim() !== ""
        ? `?new_group=${encodeURIComponent(new_group_id)}`
        : ""
      }`
    );
  },
  ordersubway: async (id?: string, data?: any) => {
    return await axiosClient.put(`${SUBWAY}/order-item/${id}`, data);
  },
};
