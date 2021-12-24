const db = require('../db');

class BookingService {
  async getBookingCar(carId, startDate, endDate) {
    const start = this.ValidFormat(startDate);
    const end = this.ValidFormat(endDate);

    const {baseOrderCost} = await this.getServiceConstants();
    const orderCost =  this.getOrderCost(start, end, baseOrderCost);

    await db.query("insert into order_sessions(car_id, start_date, end_date, order_cost) " + "values($1, $2, $3, $4)", [carId, startDate, endDate, orderCost]);

    return {message: "Your car order was applied", car_id: carId, start: startDate, end: endDate, cost: orderCost};
  }

	ValidFormat(dateString) {
		return new Date(Date.parse(dateString));
	}

	async getServiceConstants() {
		const {rows} = await db.query("select * from service_constants");
		return {baseOrderCost: rows[0].base_order_cost, orderMaxPeriod: rows[0].car_order_max_period, orderCooldown: rows[0].car_order_cooldown};
	}

	getOrderCost(startDate, endDate, baseOrderCost) {
		const days = this.getDaysBetween(startDate, endDate);
		let price = 0;
		for (let i = 1; i <= days; i++) {
				price += baseOrderCost - baseOrderCost * this.getDiscountByDay(i); 
		}
		return price;
	}

	getDiscountByDay(day) {
		const discount = new Map([
				[{start: 1, end: 4}, 0],
				[{start: 5, end: 9}, 0.05],
				[{start: 10, end: 17}, 0.1],
				[{start: 18, end: 30}, 0.15]
		]);

		for (let key of discount.keys()) {
				if (this.isInterval(key, day)) {
						console.log(discount.get(key));
						return discount.get(key);
				}
		}
	}

	isInterval(interval, value) {
		return (value >= interval.start && value <= interval.end);
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

module.exports = new BookingService();
