import axiosClient from './axiosClient'
import {SHOP} from './urlConfig'

export const shopApi = {
  getList: (params?: any) => {
    return axiosClient.get(`${SHOP}`, {params})
  },
  viewShop: (id: string, params?: any) => {
    return axiosClient.get(`${SHOP}/${id}`, {params})
  },
  createShop: (data: any) => {
    return axiosClient.post(`${SHOP}/create_shop`, data)
  },
  updateShop: (id: string, data: any) => {
    return axiosClient.put(`${SHOP}/${id}`, data)
  },
  updateExpirationDateMultiple: (ids: string, data: any) => {
    return axiosClient.put(`${SHOP}/update_expiration_date_multiple/?items=${ids}`, data)
  },
  updateForceExpiredMultiple: (ids: string, data: any) => {
    return axiosClient.put(`${SHOP}/force_expired_multiple/?items=${ids}`, data)
  },
}
