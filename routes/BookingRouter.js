const Router = require('express');
const router = new Router();
const bookingController = require('../controllers/BookingController');


router.post('/:id', bookingController.getBookingCar);
// router.get('/:id', carController);

module.exports = router;
