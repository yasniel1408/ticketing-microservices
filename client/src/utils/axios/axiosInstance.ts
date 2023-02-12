import axios, { AxiosInstance } from 'axios';
import axiosInterceptor from './axiosInterceptor';

// const buildClient = () => {
//   if (typeof window === 'undefined') {
//     return axios.create({
//       baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
//     });
//   }
//   return axios.create();
// };

const axiosInstance: AxiosInstance = axios.create();

axiosInterceptor(axiosInstance);

export default axiosInstance;
