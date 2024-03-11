import axiosClient from './axiosClient'
import {GLOBAL} from './urlConfig'

export const globalApi = {
  getList: (params?: any) => {
    return axiosClient.get(GLOBAL, {params})
  },
}
