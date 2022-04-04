const Router = require("@koa/router");
const router = new Router();
const register = require("./register")
const post = require("./post")
const like = require("./like")
const share = require("./share")
const passport = require("koa-passport");
require("../../../middleware/passport");

router.use(register);

router.use(passport.authenticate("jwt-access", { failWithError: true }), post)

router.use(passport.authenticate("jwt-access", { failWithError: true }), like)

router.use(passport.authenticate("jwt-access", { failWithError: true }), share)

module.exports = router.routes();