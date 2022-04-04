const Router = require("@koa/router");
const router = new Router();
const controller = require("../../../controllers/user/register");
require("dotenv").config();

router.post("/register", controller.registerUser);

module.exports = router.routes();
