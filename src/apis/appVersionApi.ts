import axiosClient from "./axiosClient";
import { APP_VERSION } from "./urlConfig";

export const appVersionApi = {
  getVersion: () => {
    return axiosClient.get(`${APP_VERSION}`);
  },
  updateVersion: (params: any) => {
    return axiosClient.put(`${APP_VERSION}`, params);
  },
};
