import axiosClient from './axiosClient'
import {HISTORY} from './urlConfig'

export const historyApi = {
  getList: (params?: any) => {
    return axiosClient.get(`${HISTORY}`, {params})
  },
}
