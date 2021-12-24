const bookingService = require('../services/BookingService');

class BookingController {
  async getBookingCar(req, res) {
    // const carId = req.url.id;
    const {carId, startDate, endDate } = req.body;
    const order = await bookingService.getBookingCar(carId, startDate, endDate);
    res.json(order);
  }
}

module.exports = new BookingController();
