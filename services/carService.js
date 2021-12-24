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
    
		//const result = await db.query("select car_id from order_sessions where ($1 not between start_date and end_date) and ($2 not between start_date and end_date)", [start_date,end_date]);
		const result = await db.query('select get_free_cars($1, $2) as car_id', [start_date, end_date]);
    return result;
  }


	//ValidDate
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
	//ValidDate

	async getCarsReply(startMonth, endMonth) {
		let { rows } = await db.query("select car_id, start_date, end_date from order_sessions");
		const report = [];
		const car_ids = await this.getCarsId();


		for(let i = 0; i < rows.length; i++) {
				const order = rows[i];
				const start_month = this.ValidFormat(startMonth);
				const end_month = this.ValidFormat(endMonth);
				const start_order = this.ValidFormat(order.start_date);
				const end_order = this.ValidFormat(order.end_date);

				const workload = this.getWorkload(start_month, end_month, start_order, end_order);
				report.push({car_id: order.car_id, worload: workload.toFixed(2)})
		}
		for(let i = 0; i < car_ids.length; i++) {
			report.push({car_id: car_ids[i], worload: "0.00"})
		}
		return report;
	}
	
	async getCarsId() {
		let { rows } = await db.query("select cars.car_id from cars left join order_sessions on cars.car_id = order_sessions.car_id where order_sessions.car_id is null");
		const ids = [];

		for(let i = 0; i < rows.length; i++) {
				const car = rows[i];
				ids.push(car.car_id)
		}
		return ids;
	}

	getWorkload(startMonth, endMonth, startOrder, endOrder) {
		const daysInMonth = this.getDaysBetween(startMonth, endMonth);

		if(startOrder >= startMonth && endOrder <= endMonth)
				return ((this.getDaysBetween(startOrder, endOrder) / daysInMonth) * 100);

		if(startOrder >= startMonth && startOrder <= endMonth && endOrder > endMonth)
				return ((this.getDaysBetween(endMonth, startMonth) / daysInMonth) * 100);

		if(endOrder >= startMonth && endOrder <= endMonth && startOrder < startMonth)
				return ((this.getDaysBetween(endOrder, startMonth) / daysInMonth) * 100);

		if(startOrder < startMonth && endOrder > endMonth)
				return 1;

		return 0;
	}

	getDaysBetween(startDate, endDate) {
		const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
		return ((endDate - startDate) / oneDayInMilliseconds);
	}
}

module.exports = new CarService();
