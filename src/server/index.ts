import axios from "axios";

const BASE_URL: string = "https://reqres.in/api";
// process?.env?.BACKEND_BASE_URL ||
const server = axios.create({
  baseURL: BASE_URL,
});

server.interceptors.request.use((config) => {
  config.headers["x-api-key"] = "reqres-free-v1";
  return config;
});

export default server;
