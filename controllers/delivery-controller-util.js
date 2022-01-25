/* Utility object containing functions for processing and formatting the database retrieval results of
 * the delivery controller.
 */

const deliveryControllerUtil = {
	/**
	 * Formats the database results for display in the delivery page.
	 *
	 * @param {Object} result  Object that contains the result of the database retrieval.
	 * @return {Object} Formatted delivery details.
	 */
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

		/* Return the initialized arrays. */
		return {ids, dates, customers, dropoffs, statuses};
	},

	/**
	 * Formats the database results for storing the transaction order amounts.
	 *
	 * @param {Object} result  Object that contains the result of the database retrieval.
	 * @return {Object} Formatted transaction order amounts.
	 */
	 transactionOrdersUtil: function(result) {
		/* Store the order amounts of all transactions in individual arrays. */
		const litersGasoline = [];
		const litersPremiumGasoline95 = [];
		const litersDiesel = [];
		const litersPremiumGasoline97 = [];
		const litersKerosene = [];	

		/* Assign the result of the database retrieval to the variable transactions. */
		const transactions = result;

		/* For each transaction, store the order amounts in the individual arrays. */
		for (let i = 0; i < transactions.length; i++) {
			litersGasoline[i] = transactions[i].litersGasoline;
			litersPremiumGasoline95[i] = transactions[i].litersPremiumGasoline95;
			litersDiesel[i] = transactions[i].litersDiesel;
			litersPremiumGasoline97[i] = transactions[i].litersPremiumGasoline97;
			litersKerosene[i] = transactions[i].litersKerosene;
		}

		/* Return the initialized arrays. */
		return {litersGasoline, litersPremiumGasoline95, litersDiesel, litersPremiumGasoline97, litersKerosene};
	},

	/**
	 * Formats the database results for storing the total amounts of each fuel type based on the inventory entries.
	 *
	 * @param {Object} result  Object that contains the result of the database retrieval.
	 * @return {Object} Total amounts of each fuel type.
	 */
	 inventoryAmountsUtil: function(result) {
		/* Store the total quantities of each type of fuel in the inventory. */
		let totalGasoline = 0;
		let totalPremiumGasoline95 = 0;
		let totalDiesel = 0;
		let totalPremiumGasoline97 = 0;
		let totalKerosene = 0;

		/* Assign the result of the database retrieval to the variable purchases. */
		const purchases = result;

		/* For each purchase, update the total fuel quantities accordingly and store the purchase
		 * details in the individual arrays.
		 */
		for (let i = 0; i < purchases.length; i++) {
			if (purchases[i].type == 'gasoline') {
				totalGasoline += (purchases[i].quantityPurchased - purchases[i].quantityDepleted);
			} else if (purchases[i].type == 'premium-gasoline-95') {
				totalPremiumGasoline95 += (purchases[i].quantityPurchased - purchases[i].quantityDepleted);
			} else if (purchases[i].type == 'diesel') {
				totalDiesel += (purchases[i].quantityPurchased - purchases[i].quantityDepleted);
			} else if (purchases[i].type == 'premium-gasoline-97') {
				totalPremiumGasoline97 += (purchases[i].quantityPurchased - purchases[i].quantityDepleted);
			} else {
				totalKerosene += (purchases[i].quantityPurchased - purchases[i].quantityDepleted);
			}
		}

		/* Return the aggregated values. */
		return {totalGasoline, totalPremiumGasoline95, totalDiesel, totalPremiumGasoline97, totalKerosene};
	}
};

module.exports = deliveryControllerUtil;
