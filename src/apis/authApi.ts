import { LoginType } from "../types/login.type";
import axiosClient from "./axiosClient";
import { AUTH } from "./urlConfig";

export const authApi = {
  login: (params: any): Promise<{ results: LoginType }> => {
    return axiosClient.post(`${AUTH}/employee_login`, params);
  },
  sendOtp: (data: { phone: string }) => {
    return axiosClient.post(`${AUTH}/employee_login_otp`, data);
  },
  verifyOtp: (data: { phone: string; otp: string }) => {
    return axiosClient.post(`${AUTH}/verify`, data);
  },
};
