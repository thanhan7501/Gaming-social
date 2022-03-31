import axiosClient from "./axiosClient";

class UploadFileApi {
  uploadFileApi = (values) => {
    const url = "/user/post";
    return axiosClient.post(url, values);
  };
}

const uploadFileApi = new UploadFileApi();
export default uploadFileApi;