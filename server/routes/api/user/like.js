const Router = require('@koa/router');
const router = new Router();
const controller = require('../../../controllers/user/like');

router.post('/like', controller.like);

router.delete('/unlike/:id', controller.unlike);

module.exports = router.routes();