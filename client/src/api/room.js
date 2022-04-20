import axiosClient from "./axiosClient";

class RoomApi {
    getRoomMessages = (id) => {
        const url = `/user/post/${id}`
        return axiosClient.get(url);
    }
}

const roomApi = new RoomApi();
export default roomApi;