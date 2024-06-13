import { DOMAIN_ANALYTICS } from "../utils/constants";
import baseAxios from "./baseAxios";

export const analyticsApi = {
  getInfo: (params?: any) => {
    return baseAxios.post(`analytics?domain=${DOMAIN_ANALYTICS}`, params);
  },
  getQuerySearch: (params?: any) => {
    return baseAxios.post(`search?domain=${DOMAIN_ANALYTICS}`, params);
  },
};
