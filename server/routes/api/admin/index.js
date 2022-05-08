const Router = require("@koa/router");
const router = new Router();
const register = require("./register");
const game = require("./game");
const report = require("./report");
const dashboard = require("./dashboard");

router.use(register);
router.use(game);
router.use(report);
router.use(dashboard);

module.exports = router.routes();