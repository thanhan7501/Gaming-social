import axiosClient from "./axiosClient";

class ReportApi {
    reportPost = (values) => {
        const url = `/user/report`
        return axiosClient.post(url, values);
    }

    getAllReports = () => {
        const url = `/admin/report`
        return axiosClient.get(url);
    }
}

const reportApi = new ReportApi();
export default reportApi;