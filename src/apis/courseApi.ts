import axiosClient from './axiosClient'
import {COURSE} from './urlConfig'

export const courseApi = {
  createCourse: (id: string, data: any) => {
    return axiosClient.post(`${COURSE}/set_courses/${id}`, data)
  },
}
