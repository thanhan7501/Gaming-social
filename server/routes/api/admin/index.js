const Router = require("@koa/router");
const router = new Router();
const register = require("./register")
const game = require("./game")

router.use(register)
router.use(game)

module.exports = router.routes();