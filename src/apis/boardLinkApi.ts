import axiosClient from "./axiosClient";
import { BOARD_LINK } from "./urlConfig";

export const BoardLinkApi = {
  getList: async () => {
    const res: any = await axiosClient.get(`${BOARD_LINK}/?fields=["$all",{"thema":["$all"]},{"categories":["$all",{"category":["$all"]}]}]&limit=50&order=[["index","ASC"],["updated_at","DESC"]]`);
    return res?.results?.objects?.rows || []
  },
};
