import axios from "axios";

const baseAxios = axios.create({
  baseURL: "https://ga.norehaja.com",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
  },
});
export default baseAxios;
