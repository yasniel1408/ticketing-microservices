import headers from './axiosHeaders';

const axiosInterceptor = (axios: any) => {
  axios.interceptors.request.use(
    (request: any) => {
      request.headers = headers;
      //   if (isLoggedIn()) {
      //     request.headers.authorization = `Bearer ${getToken() || getTokenSession()}`;
      //   }
      return request;
    },
    (error: Error) => Promise.reject(error),
  );
};

export default axiosInterceptor;
