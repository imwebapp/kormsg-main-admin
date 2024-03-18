import axios from "axios";

const baseAxios = axios.create({
  baseURL: "http://13.209.45.210:8000",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
  },
});
export default baseAxios;
