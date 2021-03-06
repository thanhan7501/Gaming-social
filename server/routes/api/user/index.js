const Router = require("@koa/router");
const router = new Router();
const register = require("./register");
const post = require("./post");
const like = require("./like");
const share = require("./share");
const report = require("./report");
const room = require("./room");
const profile = require("./profile");
const passport = require("koa-passport");
require("../../../middleware/passport");

router.use(register);

router.use(passport.authenticate("jwt-access", { failWithError: true }), post)

router.use(passport.authenticate("jwt-access", { failWithError: true }), like)

router.use(passport.authenticate("jwt-access", { failWithError: true }), share)

router.use(passport.authenticate("jwt-access", { failWithError: true }), report)

router.use(passport.authenticate("jwt-access", { failWithError: true }), room)

router.use(passport.authenticate("jwt-access", { failWithError: true }), profile)

module.exports = router.routes();