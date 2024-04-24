import baseAxios from "./baseAxios";

export const analyticsApi = {
  getInfo: (params?: any) => {
    return baseAxios.post("analytics", params);
  },
  getQuerySearch: (params?: any) => {
    return baseAxios.post("search", params);
  },
};
