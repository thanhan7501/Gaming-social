const Router = require("@koa/router");
const router = new Router();
const register = require("./register");
const game = require("./game");
const report = require("./report");

router.use(register);
router.use(game);
router.use(report);

module.exports = router.routes();