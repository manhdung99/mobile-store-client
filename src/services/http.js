import axios from "axios";
import LocalStorageService from "./LocalStorageService";

const localStorageService = LocalStorageService.getService();

const http = axios.create({
  baseURL: "http://localhost/3000",
  timeout: 1000,
});

// Add a request interceptor
http.interceptors.request.use(
  (config) => {
    const token = localStorageService.getAccessToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
      config.headers["Access-Control-Allow-Origin"] = "*";
    }
    // config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

http.interceptors.response.use(function (res) {
  console.log(res);
  return res;
});

export default async function fetch(method, url, body) {
  return await http[method](url, body);
}