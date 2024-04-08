import axiosClient from "./axiosClient";
import { RESERVATION } from "./urlConfig";

export const reservationApi = {
  getList: (params?: any) => {
    return axiosClient.get(`${RESERVATION}`, { params });
  },
  getCountReservation: () => {
    return axiosClient.get(`${RESERVATION}/state`);
  },
};
