import axiosClient from "./axiosClient";
import { CONVERSATION } from "./urlConfig";

export const conversationApi = {
  getList: async (params?: any) => {
    const res: any = await axiosClient.get(`${CONVERSATION}`, { params });
    return res?.results?.objects;
  },
  getDetailConversation: async (conversationId?: string, params?: any) => {
    const res: any = await axiosClient.get(
      `message${CONVERSATION}/${conversationId}`,
      { params }
    );

    return res?.results?.objects;
  },
};
