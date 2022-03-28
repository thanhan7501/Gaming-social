const Router = require("@koa/router");
const router = new Router();
const controller = require("../../../controllers/user/post");
const passport = require("koa-passport");
require("../../../middleware/passport");
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

module.exports = router.routes();