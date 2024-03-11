import axiosClient from './axiosClient'
import {SHOP} from './urlConfig'

export const shopApi = {
  getList: (params?: any) => {
    return axiosClient.get(`${SHOP}`, {params})
  },
}
