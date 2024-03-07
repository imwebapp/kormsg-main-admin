import axiosClient from "./axiosClient"
import { TRANSACTION } from "./urlConfig"

export const transactionApi = {
  getList: (params?: any) => {
    return axiosClient.get(`${TRANSACTION}/list`, {params})
  },
}
