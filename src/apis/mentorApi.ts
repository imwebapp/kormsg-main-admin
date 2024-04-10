import axiosClient from './axiosClient'
import {MENTOR} from './urlConfig'

export const mentorApi = {
  getList: (params: any) => {
    return axiosClient.get(MENTOR, { params })
  },
  createMentors: (id: string, data: any) => {
    return axiosClient.post(`${MENTOR}/set_mentor/${id}`, data)
  },
}
