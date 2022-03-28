const Router = require("@koa/router");
const router = new Router();
const admin = require("../../../controllers/admin/register");

router.post("/register", admin.registerAdmin);

module.exports = router.routes();
