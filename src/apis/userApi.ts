import axiosClient from "./axiosClient";
import { USER } from "./urlConfig";

export const userApi = {
  getList: (params?: any) => {
    return axiosClient.get(`${USER}`, { params });
  },
  getCount: (params?: string | number) => {
    return axiosClient.get(`${USER}/count?group_id=${params}`);
  },
  createUser: (data: any) => {
    return axiosClient.post(`${USER}`, data);
  },
  updateUser: (id: any, data: any) => {
    return axiosClient.put(`${USER}/${id}`, data);
  },
  updateJumpLimit: (id: any, data: any) => {
    return axiosClient.put(`${USER}/update_jump_limit/${id}`, data);
  },
  getListPaymentHistory: (params?: any) => {
    return axiosClient.get(`/user_payment_history`, { params });
  },
  updateUserPaymentHistory: (data: any) => {
    return axiosClient.post(`/user_payment_history`, data);
  },
};
