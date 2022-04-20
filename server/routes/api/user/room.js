const Router = require('@koa/router');
const router = new Router();
const controller = require('../../../controllers/user/room');

router.post('/roomchat/:id', controller.reportPost)

module.exports = router.routes();