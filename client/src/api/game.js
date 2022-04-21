import axiosClient from "./axiosClient";

class GameApi {
  getAllGames = () => {
    const url = "/admin/games";
    return axiosClient.get(url);
  };

  createGame = (values) => {
    const url = "/admin/create-game";
    return axiosClient.post(url, values);
  };

  deleteGame = (id) => {
    const url = `/admin/delete-game/${id}`;
    return axiosClient.delete(url);
  };
}

const gameApi = new GameApi();
export default gameApi;