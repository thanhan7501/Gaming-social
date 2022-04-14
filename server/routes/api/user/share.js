const Router = require('@koa/router');
const router = new Router();
const controller = require('../../../controllers/user/share');

router.post('/share', controller.createShare)

router.delete('/share/:id', controller.deleteShare)

module.exports = router.routes();