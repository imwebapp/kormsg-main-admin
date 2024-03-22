import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "../utils/constants";
import { Url } from "../routers/paths";
import { REFRESH_TOKEN } from "./urlConfig";
import { useLocalStorage } from "../stores/localStorage";

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export const setTokens = () => {
  const { accessToken } = useLocalStorage.getState(); // Access state directly
  axiosClient.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${accessToken}`;
};
setTokens();

axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // setTokens()
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    return response.data;
  },
  function (error) {
    if (error.response.status === 401) {
      const { refreshToken, setRefreshToken, setAccessToken, setExpiresIn } =
        useLocalStorage.getState();
      axios
        .post(
          `${BASE_URL}${REFRESH_TOKEN}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        )
        .then((res) => {
          console.log("resAxiosClient REFRESH_TOKEN", res.data.data);
          setAccessToken(res.data.data.accessToken);
          setRefreshToken(res.data.data.refreshToken);
          setExpiresIn(res.data.data.expiresIn);
          // localStorage.setItem("accessToken", res.data.data.accessToken);
          // localStorage.setItem("refreshToken", res.data.data.refreshToken);
          // localStorage.setItem(
          //   "expiresIn",
          //   JSON.stringify(res.data.data.expiresIn)
          // );
          window.location.reload();
        })
        .catch((err) => {
          // console.log("errAxiosClient: ", err);
          localStorage.clear();
          setAccessToken("");
          setRefreshToken("");
          setExpiresIn(0);
          window.location.href = Url.login;
        });
    } else return Promise.reject(error);
    // return Promise.reject(error)
  }
);

export default axiosClient;
