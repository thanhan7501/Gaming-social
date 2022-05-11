import axiosClient from "./axiosClient";

class LikeApi {
  createShare = (post) => {
    const url = "/user/share";
    return axiosClient.post(url, post);
  };

  deleteShare = (id) => {
    const url = `/user/share/${id}`;
    return axiosClient.delete(url);
  };
}

const likeApi = new LikeApi();
export default likeApi;