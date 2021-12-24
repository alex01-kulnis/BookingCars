// const userModel = require('../models/userModel');

const db = require('../db');

class CarService {
  async getFreeCars(start_d, end_d) {
    const start_date = this.ValidFormat(start_d);
    const end_date = this.ValidFormat(end_d);

    if (!this.IsValidRangeBooking(start_date, end_date)) {
      throw new Error('Больше 30 дней');
    }

    if (!this.IsCorrectRange(start_date, end_date)) {
      throw new Error('Конечная больше чем стартвоая');
    }

    if (!this.WorkDay(start_date) || !this.WorkDay(end_date)) {
      throw new Error('Выходной день');
    }

    const result = await db.query("select car_id from order_sessions where  ($1 not between start_date and end_date + interval '3 day') and ($2 not between start_date and end_date + interval '3 day')", [start_date,end_date]);
    return result;
  }


  IsValidRangeBooking(start_date, end_date) {
    const oneDayMillisecond = 24 * 60 * 60 * 1000;
    return ((end_date - start_date) / oneDayMillisecond <= 30);
  }

  IsCorrectRange(start_date, end_date) {
    return (end_date >= start_date);
  }

  WorkDay(date) {
    return (date.getDay() >= 1 && date.getDay() <= 5);
  }

  ValidFormat(data) {
    return new Date(Date.parse(data));
  }
}

module.exports = new CarService();

// const cars = await db.query('call get_free_cars($1, $2)', [start_date,end_date,]);
// validDate(d1, d2);
