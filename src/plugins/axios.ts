import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://api.adviceslip.com/",
  // Add other configurations as needed
});

export const setupAxios = () => {
  return { $axios: axiosInstance };
};
