const Router = require("@koa/router");
const router = new Router();
const controller = require("../../../controllers/admin/register");

router.post("/register", controller.registerAdmin);

module.exports = router.routes();
