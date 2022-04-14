const Router = require('@koa/router');
const router = new Router();
const controller = require('../../../controllers/user/report');

router.post('/report', controller.reportPost)

module.exports = router.routes();