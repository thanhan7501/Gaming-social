const Router = require("@koa/router");
const router = new Router();
const admin = require("./admin");
const user = require("./user");
const auth = require("./auth/auth");
const passport = require("koa-passport");
require("../../middleware/passport");

//Admin api
router.use("/admin", passport.authenticate("jwt-access", { failWithError: true }), admin);

//User api
router.use("/user", user);

//Auth api
router.use("/auth", auth);

module.exports = router.routes();
