const Router = require("@koa/router");
const router = new Router();
const register = require("./register")
const post = require("./post")
const passport = require("koa-passport");
require("../../../middleware/passport");

router.use(register);
router.use(
    passport.authenticate("jwt-access", {
        failWithError: true
    }),
    post
)

module.exports = router.routes();