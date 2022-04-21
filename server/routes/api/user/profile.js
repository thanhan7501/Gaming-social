const Router = require("@koa/router");
const router = new Router();
const controller = require("../../../controllers/user/profile")

router.get('/profile', controller.getUserPost);

module.exports = router.routes();