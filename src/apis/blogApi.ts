import { BoardLinkInterface } from '../entities/boardlink.entity';
import { ThemaInterface } from "../entities";
import axiosClient from "./axiosClient";
import { BLOG, BOARD_LINK } from "./urlConfig";
import { BlogInterface } from '../entities/blog.entity';

export const BlogApi = {
  getList: async (params?: any) => {
    const res: any = await axiosClient.get(`${BLOG}/?fields=["$all",{"category":["$all",{"thema":["$all"]}]}]&order=[["created_at","DESC"]]`, { params });
    return res?.results?.objects
  },
  create: async (data?: BlogInterface) => {
    const res: any = await axiosClient.post(BLOG, data);
    return res?.results?.object
  },
  update: async (id?: string, data?: BlogInterface) => {
    const res: any = await axiosClient.put(`${BLOG}/${id}`, data);
    return res?.results?.object
  },
  delete: async (id: string) => {
    return await axiosClient.delete(`${BLOG}/${id}`);
  },
};
