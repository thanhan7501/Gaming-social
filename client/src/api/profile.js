import axiosClient from "./axiosClient";

class ProfileApi {
    getProfile = (id) => {
        const url = `/user/profile/${id}`
        return axiosClient.get(url);
    }

    changeAvatar = (value) => {
        const url = `/user/profile/change-avatar`
        return axiosClient.post(url, value);
    }
}

const profileApi = new ProfileApi();
export default profileApi;