const Router = require("@koa/router");
const router = new Router();
const controller = require("../../../controllers/user/profile")

router.get('/profile', controller.getUserPost);

router.get('/profile/change-avatar', controller.changeAvatar);

module.exports = router.routes();