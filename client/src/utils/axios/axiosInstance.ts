// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import axiosInterceptor from './axiosInterceptor';

const axiosInstance = axios.create();
axiosInterceptor(axiosInstance);

export default axiosInstance;
