const Router = require("@koa/router");
const router = new Router();
const controller = require("../../../controllers/user/profile")

router.get('/profile/:id', controller.getUserPost);

router.post('/profile/change-avatar', controller.changeAvatar);

module.exports = router.routes();