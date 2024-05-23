import axiosClient from "./axiosClient";
import { POST } from "./urlConfig";

export const postApi = {
  getList: (params?: any) => {
    return axiosClient.get(`${POST}`, { params });
  },
  deleteSingleCommunity: (id?: any) => {
    return axiosClient.delete(`${POST}/${id}`);
  },
  deleteMultiCommunity: (ids?: any) => {
    const itemsParam = JSON.stringify(ids);
    console.log(itemsParam);
    return axiosClient.delete(`${POST}?items=${itemsParam}`);
  },
};
