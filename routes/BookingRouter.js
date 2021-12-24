const Router = require('express');
const router = new Router();
const bookingController = require('../controllers/BookingController');


router.post('/orders', bookingController.getBookingCar);
// router.get('/:id', carController);

module.exports = router;
