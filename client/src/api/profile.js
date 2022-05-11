import axiosClient from "./axiosClient";

class ProfileApi {
    getProfile = (id, page) => {
        const url = `/user/profile/${id}?page=${page}`
        return axiosClient.get(url);
    }

    changeAvatar = (value) => {
        const url = `/user/profile/change-avatar`
        return axiosClient.post(url, value);
    }
}

const profileApi = new ProfileApi();
export default profileApi;