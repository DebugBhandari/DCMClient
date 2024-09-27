import { baseUrl, creds, } from "../config/config";
import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: baseUrl,
    
  });

  axiosInstance.interceptors.request.use(
    async config => {
        config.headers.Authorization = "Basic " + btoa(creds);
        config.headers["Content-Type"] = "application/json";
      
      return config;
    },
    error => {
      console.error("Authentication failed:", error);
    },
  );