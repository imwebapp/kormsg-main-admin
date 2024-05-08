import { BannerInterface } from "../entities/banner.entity";
import { NavBarInterface } from "../entities/navbar.entity";
import axiosClient from "./axiosClient";
import { NAVBAR } from "./urlConfig";

export const NavBarApi = {
  getList: async () => {
    const res: any = await axiosClient.get(`${NAVBAR}/?fields=["$all"]&limit=6969696&order=[["index","ASC"],["created_at","ASC"]]`);
    return res?.results?.objects?.rows || []
  },
  updateNavbar: async (id: string, data: NavBarInterface) => {
    return await axiosClient.put(`${NAVBAR}/${id}`, data);
  },
  deleteNavbar: async (id: string) => {
    return await axiosClient.delete(`${NAVBAR}/${id}`);
  },
  createNavbar: async (data: NavBarInterface) => {
    return await axiosClient.post(NAVBAR, data);
  },
  orderNav: async (id?: string, data?: any) => {
    return await axiosClient.put(`${NAVBAR}/order-nav/${id}`, data);
  },
};
