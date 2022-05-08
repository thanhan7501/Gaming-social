const Router = require('@koa/router');
const router = new Router();
const controller = require('../../../controllers/admin/dashboard');

router.get('/dashboard', controller.getNewUserByMonths)

module.exports = router.routes();