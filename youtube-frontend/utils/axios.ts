// Import necessary modules and utilities
import axios from "axios";
import { LocalStorage } from "@/utils/localStorage";
import { server_url } from "@/utils/constant";

// Create an Axios instance for API requests
export const apiClient = axios.create({
  baseURL: server_url,
  withCredentials: true,
  timeout: 120000,
});

// Add an interceptor to set authorization header with user token before requests
apiClient.interceptors.request.use(
  function (config) {
    // Retrieve user token from local storage
    const token = LocalStorage.get("token");
    // Set authorization header with bearer token
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
