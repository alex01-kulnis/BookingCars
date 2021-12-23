const Router = require('express');
const router = new Router();
const carRouter = require('./carRouter');

router.use('/car', carRouter);
// router.use('/type', typeRouter)
// router.use('/brand', brandRouter)
// router.use('/device', deviceRouter)

module.exports = router;
