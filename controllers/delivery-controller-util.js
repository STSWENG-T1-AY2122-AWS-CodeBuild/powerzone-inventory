const deliveryControllerUtil = {
	deliveryUtil: function(result) {
		/* Store the details of all deliveries in individual arrays to allow for further formatting. */
		const ids = [];
		const dates = [];
		const customers = [];
		const dropoffs = [];
		const statuses = [];

		/* Assign the result of the database retrieval to the variable deliveries. */
		const deliveries = result;

		/* For each delivery, store the delivery details in the individual arrays. */
		for (let i = 0; i < deliveries.length; i++) {
			/* Format the display of the delivery date from the Date object, if applicable,
             * stored in the database.
             */
			if (deliveries[i].date != null) {
				const month = deliveries[i].date.getMonth() + 1;
				let formattedMonth = month;
				if (month.toString().length < 2) {
					formattedMonth = '0' + month.toString();
				}

				const date = deliveries[i].date.getDate();
				let formattedDate = date;
				if (date.toString().length < 2) {
					formattedDate = '0' + date.toString();
				}

				const year = deliveries[i].date.getFullYear();

				dates[i] = formattedMonth + '/' + formattedDate + '/' + year;
			} else {
				dates[i] = null;
			}

			/* Store the other delivery details in their respective arrays. */
			ids[i] = deliveries[i].id;
			customers[i] = deliveries[i].customer;
			dropoffs[i] = deliveries[i].dropoff;
			statuses[i] = deliveries[i].status;
		}

		return {ids, dates, customers, dropoffs, statuses};
	}
};

module.exports = deliveryControllerUtil;
