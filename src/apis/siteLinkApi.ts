import axiosClient from "./axiosClient";
import { SITE, SITE_CATEGORY } from "./urlConfig";

export const siteLinkApi = {
  getListCategory: (params?: any) => {
    return axiosClient.get(`${SITE_CATEGORY}`, { params });
  },
  createSiteCategory: (params: any) => {
    return axiosClient.post(`${SITE_CATEGORY}`, params);
  },
  editSiteCategory: (params: any) => {
    return axiosClient.put(`${SITE_CATEGORY}/multiple/data`, params);
  },
  deleteSiteCategory: (id: any, params?: any) => {
    return axiosClient.delete(`${SITE_CATEGORY}/${id}`, { params });
  },
  getListSite: (params?: any) => {
    return axiosClient.get(`${SITE}`, { params });
  },
  createSite: (params?: any) => {
    return axiosClient.post(`${SITE}`, params);
  },
  editSite: (params?: any, id?: string) => {
    return axiosClient.put(`${SITE}/${id}`, params);
  },
  deleteSite: (params?: any) => {
    return axiosClient.delete(`${SITE}/?items=["${params}"]`);
  },
  deleteMultiSite: (ids?: any) => {
    const itemsParam = JSON.stringify(ids);
    return axiosClient.delete(`${SITE}?items=${itemsParam}`);
  },
};
