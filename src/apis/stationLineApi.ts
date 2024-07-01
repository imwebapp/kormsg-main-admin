import axiosClient from "./axiosClient";
import { STATION_LINE } from "./urlConfig";

export const stationLineApi = {
  getList: (params?: any) => {
    return axiosClient.get(`${STATION_LINE}`, { params });
  },
  create: (data: any) => {
    return axiosClient.post(`${STATION_LINE}`, data);
  },
  update: (id: string, data: any) => {
    return axiosClient.put(`${STATION_LINE}/${id}`, data);
  },
  delete: (id: string, new_group_id?: string) => {
    console.log(new_group_id);

    return axiosClient.delete(
      `${STATION_LINE}/${id}${new_group_id && new_group_id.trim() !== ""
        ? `?new_group=${encodeURIComponent(new_group_id)}`
        : ""
      }`
    );
  },
  orderstationLine: async (id?: string, data?: any) => {
    return await axiosClient.put(`${STATION_LINE}/order-item/${id}`, data);
  },
};
