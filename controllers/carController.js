const carService = require('../services/CarService');

class CarController {
  async getFreeCars(req, res) {
    const { start_date, end_date } = req.body;
    const car = await carService.getFreeCars(start_date, end_date);
    res.json(car);
  }

	async getCarsReply(req, res) {
    const {start, end} = req.body;
    const workload = await carService.getCarsReply(start, end);
    res.json(workload);
  }
}

module.exports = new CarController();
