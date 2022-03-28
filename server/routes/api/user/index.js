const Router = require("@koa/router");
const router = new Router();
const register = require("./register")
const post = require("./post")

router.use(register);
router.use(
    passport.authenticate("jwt-access", {
        failWithError: true
    }),
    post
)

module.exports = router.routes();