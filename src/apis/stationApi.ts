import axiosClient from "./axiosClient";
import { STATION } from "./urlConfig";

export const stationApi = {
  getList: (params?: any) => {
    return axiosClient.get(`${STATION}`, { params });
  },
  create: (data: any) => {
    return axiosClient.post(`${STATION}`, data);
  },
  update: (id: string, data: any) => {
    return axiosClient.put(`${STATION}/${id}`, data);
  },
  delete: (id: string, new_group_id?: string) => {
    console.log(new_group_id);

    return axiosClient.delete(
      `${STATION}/${id}${new_group_id && new_group_id.trim() !== ""
        ? `?new_group=${encodeURIComponent(new_group_id)}`
        : ""
      }`
    );
  },
  orderstation: async (id?: string, data?: any) => {
    return await axiosClient.put(`${STATION}/order-item/${id}`, data);
  },
};
