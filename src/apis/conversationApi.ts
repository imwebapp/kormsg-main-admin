import axiosClient from './axiosClient'
import {CONVERSATION} from './urlConfig'

export const conversationApi = {
  getList: (params?: any) => {
    return axiosClient.get(`${CONVERSATION}/list`, {params})
  },
}
