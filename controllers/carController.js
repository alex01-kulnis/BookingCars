const carService = require('../services/CarService');

class CarController {
  async getFreeCars(req, res) {
    const { start_date, end_date } = req.body;
    const car = await carService.getFreeCars(start_date, end_date);
    res.json(car);
  }

}

module.exports = new CarController();
