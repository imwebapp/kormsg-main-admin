import axiosClient from './axiosClient'
import {USER} from './urlConfig'

export const userApi = {
  getList: (params?: any) => {
    return axiosClient.get(`${USER}`, {params})
  },
}
