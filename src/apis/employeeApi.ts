import axiosClient from "./axiosClient";
import { EMPLOYEE } from "./urlConfig";

export const employeeApi = {
  getList: (params?: any) => {
    return axiosClient.get(`${EMPLOYEE}`, { params });
  },
  createAdmin: (data: any) => {
    return axiosClient.post(`${EMPLOYEE}`, data);
  },
  deleteAdmin: (id: string) => {
    return axiosClient.delete(`${EMPLOYEE}/${id}`);
  },
};
