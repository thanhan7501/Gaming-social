const Router = require("@koa/router");
const router = new Router();
const controller = require("../../../controllers/user/post");
const controllerGame = require("../../../controllers/admin/game")
const multer = require("../../../middleware/multer");

require("dotenv").config();

router.post(
    "/post",
    controller.createPost
);

router.put(
    "/post/:id",
    controller.updatePost
);

router.delete(
    "/post/:id",
    controller.deletePost
);

router.post(
    "/post/file",
    multer.fields([{
        name: "postFile",
    },
    ]),
    controller.uploadFile
)

router.get("/post", controller.getAllPost)

router.get("/post/:id", controller.getPostDetail)

router.get("/post/game", controllerGame.getAllGames)

module.exports = router.routes();