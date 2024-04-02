import { TagThemaInterface } from "../entities";
import axiosClient from "./axiosClient";
import { TAG } from "./urlConfig";

export const TagApi = {
  getList: async (params?: object) => {
    const res: any = await axiosClient.get(`${TAG}/?fields=["$all"]&limit=50&order=[["index","ASC"],["created_at","DESC"]]`, { params });
    return res?.results?.objects?.rows || []
  },
  updateTag: async (id: string, data: TagThemaInterface) => {
    return await axiosClient.put(`${TAG}/${id}`, data);
  },
  deleteTag: async (id: string) => {
    return await axiosClient.delete(`${TAG}/${id}`);
  },
  createTag: async (data: TagThemaInterface) => {
    return await axiosClient.post(TAG, data);
  },
  orderTag: async (id?: string, data?: any) => {
    return await axiosClient.put(`${TAG}/order-tag/${id}`, data);
  },
};
