import axiosClient from "./axiosClient";
import { EMPLOYEE } from "./urlConfig";

export const employeeApi = {
  getList: (params?: any) => {
    return axiosClient.get(`${EMPLOYEE}`, { params });
  },
};
