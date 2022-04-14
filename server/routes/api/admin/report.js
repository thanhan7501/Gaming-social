const Router = require('@koa/router');
const router = new Router();
const controller = require('../../../controllers/admin/report');

router.get('/report', controller.getAllReport)

module.exports = router.routes();