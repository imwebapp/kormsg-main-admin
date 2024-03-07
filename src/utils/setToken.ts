import { LoginType } from "../types/login.type"

export const setTokens = (data: LoginType) => {
    localStorage.setItem('accessToken', data.token)
    // localStorage.setItem('refreshToken', data.refreshToken)
    // localStorage.setItem('expiresIn', JSON.stringify(data.expiresIn))
  }