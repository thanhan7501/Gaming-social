const Game = require("../../models/game");

const getPath = (path) => {
    return "/" + path[path.length - 2] + "/" + path[path.length - 1];
};

module.exports = {
    createGame: async (ctx) => {
        let game = new Game(ctx.request.body)
        let imgPath = ctx.request.files.gameAvatar[0].path.split("\\");
        game.gameAvatar = getPath(imgPath);
        await game.save();
        return (ctx.body = {
            status: true,
            message: "create success",
        });
    },
    getAllGames: async (ctx) => {
        const games = await Game.find().lean();
        return (ctx.body = {
            status: true,
            games
        });
    },
    deleteGame: async (ctx) => {
        const id = ctx.request.params.id;
        if(!id || id === undefined) {
            return (ctx.body = {
                status: false,
                message: "id not found",
            });
        } 
        await Game.deleteOne({
            _id: id
        });
        return (ctx.body = {
            status: true,
            message: "delete success",
        });
    },
}