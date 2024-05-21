import axiosClient from "./axiosClient";
import { REVIEW } from "./urlConfig";

export const reviewApi = {
  getList: (params?: any) => {
    return axiosClient.get(`${REVIEW}`, { params });
  },
  deleteSingleComment: (id?: any) => {
    return axiosClient.delete(`${REVIEW}/${id}`);
  },
  deleteMultiComment: (ids?: any) => {
    const itemsParam = JSON.stringify(ids);
    console.log(itemsParam);

    return axiosClient.delete(`${REVIEW}?items=${itemsParam}`);
  },
};
