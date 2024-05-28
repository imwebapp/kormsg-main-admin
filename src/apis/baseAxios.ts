import axios from "axios";

const baseAxios = axios.create({
  baseURL: process.env.BASE_URL_ANALYTICS,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
  },
});
export default baseAxios;
