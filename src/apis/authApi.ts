import {LoginType} from '../types/login.type'
import axiosClient from './axiosClient'
import {LOGIN} from './urlConfig'

export const authApi = {
  login: (params: any): Promise<{results: LoginType}> => {
    return axiosClient.post(LOGIN, params)
  },
}
