import axios from "axios";
import { BASE_URL_ANALYTICS } from "../utils/constants";

const baseAxios = axios.create({
  baseURL: BASE_URL_ANALYTICS,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
  },
});
export default baseAxios;
