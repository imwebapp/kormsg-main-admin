import axiosClient from "./axiosClient";
import { POINT_PRODUCT } from "./urlConfig";

export const pointHistoryApi = {
  getListProduct: (params?: any) => {
    return axiosClient.get(`${POINT_PRODUCT}`, { params });
  },
  createProduct: (params?: any) => {
    return axiosClient.post(
      `${POINT_PRODUCT}/?fields=["$all"]&limit=50&order=[["created_at","DESC"]]`,
      params
    );
  },
  editProduct: (params?: any, id?: string) => {
    return axiosClient.put(`${POINT_PRODUCT}/${id}`, params);
  },
  deleteProduct: (params?: any) => {
    return axiosClient.delete(`${POINT_PRODUCT}/?items=["${params}"]`);
  },
};
