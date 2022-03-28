const Router = require("@koa/router");
const router = new Router();
const admin = require("../../../controllers/admin/game");
const multer = require("../../../middleware/multer");

router.post("/create-game", multer.fields([{
    name: "avatarGame",
    maxCount: 1
}, ]), admin.createGame);
router.get("/games", admin.getAllGames)
router.delete("/delete-game/:id", admin.deleteGame)

module.exports = router.routes();