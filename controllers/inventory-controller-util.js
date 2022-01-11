/* Utility object containing functions for processing and formatting the database retrieval results of 
 * the inventory controller. 
 */
const inventoryControllerUtil = {
	/**
	 * Formats the database results for display in the inventory page.
	 *
	 * @param result  Object that contains the result of the database retrieval.
	 */
	inventoryUtil: function(result) {
		/* Store the total quantities and statuses of each type of fuel. */
		let totalGasoline = 0;
		let totalPremiumGasoline95 = 0;
		let totalDiesel = 0;
		let totalPremiumGasoline97 = 0;
		let totalKerosene = 0;

		/* Store the details of all purchases in individual arrays to allow for further formatting. */
		const ids = [];
		const types = [];
		const dates = [];
		const suppliers = [];
		const prices = [];
		const locations = [];
		const statuses = [];

		/* Assign the result of the database retrieval to the variable purchases. */
		const purchases = result;

		/* For each purchase, update the total fuel quantities accordingly and store the purchase
            * details in the individual arrays.
            */
		for (let i = 0; i < purchases.length; i++) {
			/* Following the feature specifications, display only stocks with quantities above 0
                * in the application.
                */
			if ((purchases[i].quantityPurchased - purchases[i].quantityDepleted) > 0) {
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

				/* Format the display of the purchase date from the Date object
                    * stored in the database
                    */
				const month = purchases[i].date.getMonth() + 1;
				let formattedMonth = month;
				if (month.toString().length < 2) {
					formattedMonth = '0' + month.toString();
				}

				const date = purchases[i].date.getDate();
				let formattedDate = date;
				if (date.toString().length < 2) {
					formattedDate = '0' + date.toString();
				}

				const year = purchases[i].date.getFullYear();

				/* Set all statuses to "In Stock" as depleted stocks are no longer displayed. */
				const status = 'In Stock';

				/* Store the purchase details in their respective arrays. */
				ids[i] = purchases[i]._id;
				types[i] = purchases[i].type;
				dates[i] = formattedMonth + '/' + formattedDate + '/' + year;
				suppliers[i] = purchases[i].supplier;
				prices[i] = purchases[i].price;
				locations[i] = purchases[i].location;
				statuses[i] = status;
			}
		}

		return {ids, types, dates, suppliers, prices, locations, statuses,
			totalGasoline, totalPremiumGasoline95, totalDiesel, totalPremiumGasoline97, totalKerosene};
	}
};

module.exports = inventoryControllerUtil;
