import axiosClient from "./axiosClient";
import { POINT, POINT_PRODUCT, POINT_PRODUCT_HISTORY } from "./urlConfig";

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
  getListReceivePoint: (params?: any) => {
    return axiosClient.get(`${POINT}`, { params });
  },
  getListOrderHistory: (params?: any) => {
    return axiosClient.get(`${POINT_PRODUCT_HISTORY}`, { params });
  },
  downloadExcel: (params?: any) => {
    return axiosClient.get(`${POINT_PRODUCT_HISTORY}/download_excel`, {
      params,
    });
  },
  rejectOrderHistory: (id?: string) => {
    return axiosClient.put(`${POINT_PRODUCT_HISTORY}/send/${id}`);
  },
  approveOrderHistory: (id?: string) => {
    return axiosClient.put(`${POINT_PRODUCT_HISTORY}/confirm/${id}`);
  },
};
