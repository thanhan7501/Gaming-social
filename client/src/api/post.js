import axiosClient from "./axiosClient";

class PostApi {
  createPost = (values) => {
    const url = "/user/post";
    return axiosClient.post(url, values);
  };

  updatePost = (id, values) => {
    const url = `/user/post/${id}`;
    return axiosClient.put(url, values);
  };

  deletePost = (id) => {
    const url = `/user/post/${id}`;
    return axiosClient.delete(url);
  };

  getAllPost = (sort, page) => {
    const url = `/user/post/?sort=${sort}&page=${page}`;
    return axiosClient.get(url);
  };

  getAllGames = () => {
    const url = "/user/post/game";
    return axiosClient.get(url);
  };

  getPostDetail = (id) => {
    const url = `/user/post/${id}`
    return axiosClient.get(url);
  }
}

const postApi = new PostApi();
export default postApi;