import axiosClient from "./axiosClient";

class GameApi {
  getAllGames = () => {
    const url = "/admin/games";
    return axiosClient.get(url);
  };
}

const gameApi = new GameApi();
export default gameApi;