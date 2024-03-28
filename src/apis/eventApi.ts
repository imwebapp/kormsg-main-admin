import axiosClient from "./axiosClient";
export const eventApi = {
  createEvent: (params?: any) => {
    return axiosClient.post(`event/create_event`, params);
  },
};
