const Router = require('express');
const router = new Router();
const carRouter = require('./CarRouter');
const bookingRouter = require('./BookingRouter');

router.use('/car', carRouter);
router.use('/booking', bookingRouter);

module.exports = router;
