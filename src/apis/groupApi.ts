import axiosClient from './axiosClient'
import {GROUP} from './urlConfig'

export const groupApi = {
  getList: (params?: any) => {
    return axiosClient.get(`${GROUP}`, {params})
  },
  create: (data: any) => {
    return axiosClient.post(`${GROUP}`, data)
  },
  update: (id: string, data: any) => {
    return axiosClient.put(`${GROUP}/${id}`, data)
  },
  delete: (id: string) => {
    return axiosClient.delete(`${GROUP}/${id}`)
  },
}
