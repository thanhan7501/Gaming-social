import axiosClient from "./axiosClient";

class LikeApi {
  like = (values) => {
    const url = "/user/like";
    return axiosClient.post(url, values);
  };

  unlike = (id) => {
    const url = `/user/unlike/${id}`;
    return axiosClient.delete(url);
  };
}

const likeApi = new LikeApi();
export default likeApi;