const Router = require("@koa/router");
const router = new Router();
const controller = require("../../../controllers/admin/game");
const multer = require("../../../middleware/multer");

router.post("/create-game", multer.fields([{
    name: "gameAvatar",
    maxCount: 1
}, ]), controller.createGame);
router.get("/games", controller.getAllGames)
router.delete("/delete-game/:id", controller.deleteGame)

module.exports = router.routes();