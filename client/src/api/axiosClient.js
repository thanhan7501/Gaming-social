// api/axiosClient.js
import axios from "axios";
import queryString from "query-string";
const getToken = () => {
  const accessToken = localStorage.getItem("access_token");
  return accessToken
}

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient.interceptors.request.use(
  (config) => {
    // Handle token here ...
    const accessToken = getToken();
    // config.headers['Accept-Language'] = getLanguage();

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    throw error;
  }
);
export default axiosClient;