import axiosClient from './axiosClient'
import {SHOP} from './urlConfig'

export const shopApi = {
  getList: (params?: any) => {
    return axiosClient.get(`${SHOP}`, {params})
  },
  viewShop: (id: string, params?: any) => {
    return axiosClient.get(`${SHOP}/${id}`, {params})
  },
}
