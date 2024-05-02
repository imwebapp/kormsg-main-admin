import axiosClient from "./axiosClient";
export const eventApi = {
  createEvent: (params?: any) => {
    return axiosClient.post(`event/create_event`, params);
  },
  editEvent: (params?: any, id?: string) => {
    return axiosClient.put(`event/${id}`, params);
  },
  deleteEvent: (id?: string) => {
    return axiosClient.delete(`event/${id}`);
  },
};
