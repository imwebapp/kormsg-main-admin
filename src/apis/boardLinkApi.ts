import { BoardLinkInterface } from './../entities/boardlink.entity';
import { ThemaInterface } from "../entities";
import axiosClient from "./axiosClient";
import { BOARD_LINK } from "./urlConfig";

export const BoardLinkApi = {
  getList: async () => {
    const res: any = await axiosClient.get(`${BOARD_LINK}/?fields=["$all",{"thema":["$all"]},{"categories":["$all",{"category":["$all"]}]}]&limit=50&order=[["index","ASC"],["updated_at","DESC"]]`);
    return res?.results?.objects?.rows || []
  },
  create: async (data: BoardLinkInterface) => {
    const res: any = await axiosClient.post(BOARD_LINK, data);
    return res?.results?.object?.link
  },
  update: async (id: string, data: BoardLinkInterface) => {
    const res: any = await axiosClient.put(`${BOARD_LINK}/${id}`, data);
    return res?.results?.object
  },
  delete: async (id: string) => {
    return await axiosClient.delete(`${BOARD_LINK}/${id}`);
  },
  orderLink: async (id?: string, data?: any) => {
    return await axiosClient.put(`${BOARD_LINK}/order-link/${id}`, data);
  },
};
