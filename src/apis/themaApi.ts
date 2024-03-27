import { ThemaInterface } from "../entities";
import { BannerInterface } from "../entities/banner.entity";
import axiosClient from "./axiosClient";
import { BANNER, SETTING_ADMIN, THEMA } from "./urlConfig";

export const ThemaApi = {
  getList: async () => {
    const res: any = await axiosClient.get(`${THEMA}/?fields=["$all"]&limit=50&order=[["created_at","DESC"]]`);
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
