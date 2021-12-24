const Router = require('express');
const router = new Router();
const carRouter = require('./CarRouter');
const bookingRouter = require('./BookingRouter');

router.use('/car', carRouter);
router.use('/booking', bookingRouter);
// router.use('/type', typeRouter)
// router.use('/brand', brandRouter)
// router.use('/device', deviceRouter)

module.exports = router;
