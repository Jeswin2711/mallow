import { getToken } from "@/utils/helpers";
import axios from "axios";

const BASE_URL: string = import.meta.env?.VITE_BACKEND_BASE_URL;
const server = axios.create({
  baseURL: BASE_URL,
});

server.interceptors.request.use((config) => {
  if (config.url?.includes("/login")) {
    config.headers["x-api-key"] = "reqres-free-v1";
    return config;
  }
  const token = getToken();
  if (!token) {
    alert('Please Login')
    window.location.href = '/login';
    return config;
  }
  config.headers["x-api-key"] = "reqres-free-v1";
  return config;
});


export default server;
