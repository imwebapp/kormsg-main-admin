import axiosClient from "./axiosClient";
import { REPORT } from "./urlConfig";

export const ReportApi = {
  getListPost: async (params?: any) => {
    const res: any = await axiosClient.get(`${REPORT}/?fields=["$all",{"post":["$all", {"$filter" : {"id" :  { "$ne": null }}} , {"user":["$all"]}]} ]&order=[["created_at_unix_timestamp","DESC"]]`, { params });
    return res?.results?.objects?.rows || []
  },
  getCountPost: async (params?: any) => {
    const res: any = await axiosClient.get(`${REPORT}/?fields=["$all",{"post":["$all", {"$filter" : {"id" :  { "$ne": null }}} , {"user":["$all"]}]} ]&order=[["created_at_unix_timestamp","DESC"]]`, { params });
    return res?.results?.objects?.count || 0
  },
  getListReview: async (params?: any) => {
    const res: any = await axiosClient.get(`${REPORT}/?fields=["$all",{"review":["$all", {"$filter" : {"id" :  { "$ne": null }}} , {"user":["$all"]}]} ]&order=[["created_at_unix_timestamp","DESC"]]`, { params });
    return res?.results?.objects?.rows || []
  },
  getCountReview: async (params?: any) => {
    const res: any = await axiosClient.get(`${REPORT}/?fields=["$all",{"review":["$all", {"$filter" : {"id" :  { "$ne": null }}} , {"user":["$all"]}]} ]&order=[["created_at_unix_timestamp","DESC"]]`, { params });
    return res?.results?.objects?.count || 0
  },
  delete: async (data?: any) => {
    return await axiosClient.delete(`${REPORT}/delete_multiples_report_subject`, { params: data });
  },
  restore: async (data?: any) => {
    return await axiosClient.put(`${REPORT}/restore_multiples_report_subject`, {}, { params: data });
  },
};
