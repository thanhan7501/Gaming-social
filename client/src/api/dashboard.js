import axiosClient from "./axiosClient";

class DashboardApi {
  getDashboard = () => {
    const url = "/admin/dashboard";
    return axiosClient.get(url);
  };
}

const dashboardApi = new DashboardApi();
export default dashboardApi;