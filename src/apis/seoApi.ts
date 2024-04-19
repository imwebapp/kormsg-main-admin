import axiosClient from './axiosClient'
import {SEO} from './urlConfig'

export const seoApi = {
  getSEO: (params?: any) => {
    return axiosClient.get(`${SEO}`, {params})
  },
  updateSEO: (data: any) => {
    return axiosClient.put(`${SEO}`, data)
  },
}
