import { CategoryInterface } from "../entities";
import axiosClient from "./axiosClient";
import { CATEGORY } from "./urlConfig";

export const CategoryApi = {
  getList: async (params?: object) => {
    const res: any = await axiosClient.get(`${CATEGORY}/?fields=["$all"]&limit=50&order=[["created_at","DESC"]]`, { params });
    return res?.results?.objects?.rows || []
  },
  updateCategory: async (id: string, data: CategoryInterface) => {
    return await axiosClient.put(`${CATEGORY}/${id}`, data);
  },
  deleteCategory: async (id: string) => {
    return await axiosClient.delete(`${CATEGORY}/${id}`);
  },
  createCategory: async (data: CategoryInterface) => {
    return await axiosClient.post(CATEGORY, data);
  },
};
