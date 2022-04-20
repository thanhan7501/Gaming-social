const Router = require('@koa/router');
const router = new Router();
const controller = require('../../../controllers/user/room');

router.get('/roomchat/:id', controller.getRoomMessages)

module.exports = router.routes();