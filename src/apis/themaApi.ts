
import { ThemaInterface } from "../entities";
import axiosClient from "./axiosClient";
import { THEMA } from "./urlConfig";

export const ThemaApi = {
  getList: async (params?: object) => {
    const res: any = await axiosClient.get(`${THEMA}/?fields=["$all"]&limit=50&order=[["created_at","DESC"]]`, { params });
    return res?.results?.objects?.rows || []
  },
  updateThema: async (id: string, data: ThemaInterface) => {
    return await axiosClient.put(`${THEMA}/${id}`, data);
  },
  deleteThema: async (id: string) => {
    return await axiosClient.delete(`${THEMA}/${id}`);
  },
  createThema: async (data: ThemaInterface) => {
    return await axiosClient.post(THEMA, data);
  },
};
