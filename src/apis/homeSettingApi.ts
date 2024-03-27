import { BannerInterface } from "../entities/banner.entity";
import axiosClient from "./axiosClient";
import { BANNER, SETTING_ADMIN } from "./urlConfig";

export const HomeSettingApi = {
  getList: async () => {
    const res: any = await axiosClient.get(`${BANNER}/?fields=["$all"]&limit=50&order=[["created_at","DESC"]]`);
    return res?.results?.objects?.rows || []
  },
  updateBanner: async (id: string, data: BannerInterface) => {
    return await axiosClient.put(`${BANNER}/${id}`, data);
  },
  deleteBanner: async (id: string) => {
    return await axiosClient.delete(`${BANNER}/${id}`);
  },
  createBanner: async (data: BannerInterface) => {
    return await axiosClient.post(BANNER, data);
  },
  settingAdmin: async () => {
    const res: any = await axiosClient.get(SETTING_ADMIN);
    return res?.results?.object
  },
  settingMentorStatus: async () => {
    return await axiosClient.put(`${SETTING_ADMIN}/mentor_status`);
  },
  settingAdultVerification: async () => {
    return await axiosClient.put(`${SETTING_ADMIN}`);
  },
  
};
