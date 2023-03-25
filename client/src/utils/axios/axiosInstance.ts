import { baseURLCluster } from "@/constants";
import axios, { AxiosInstance } from "axios";
import axiosInterceptor from "./axiosInterceptor";

const buildClient = () => {
  if (typeof window === "undefined") {
    return axios.create({
      baseURL: baseURLCluster,
    });
  }
  return axios.create({
    baseURL: "/",
  });
};

const axiosInstance: AxiosInstance = buildClient();

axiosInterceptor(axiosInstance);

export default axiosInstance;
