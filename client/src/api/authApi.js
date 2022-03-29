import axiosClient from "./axiosClient";

class AuthApi {
  login = (formData) => {
    const url = "/auth/login";
    return axiosClient.post(url, formData);
  };

  register = (formData) => {
    const url = "/register";
    return axiosClient.post(url, formData);
  };

  getNewToken = (refreshToken) => {
    const url = "/auth/token";
    axiosClient.defaults.headers.common["Authorization"] =
      "Bearer " + refreshToken;
    return axiosClient.post(url);
  };

  getInfo = () => {
    const url = "/auth/info";
    return axiosClient.post(url);
  };
}

const authApi = new AuthApi();
export default authApi;