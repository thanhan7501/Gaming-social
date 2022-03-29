import axiosClient from "./axiosClient";

class AuthApi {
  login = (values) => {
    const url = "/auth/login";
    return axiosClient.post(url, values);
  };

  register = (values) => {
    const url = "/user/register";
    return axiosClient.post(url, values);
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