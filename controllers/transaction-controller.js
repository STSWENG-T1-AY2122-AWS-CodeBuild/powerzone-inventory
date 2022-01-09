/* Controller for displaying the transactions page */

/* The db file, transaction schema, inventory schema, transaction number schema, and selling price schema
 * are used for the transaction page. 
 */
const db = require('../models/db.js');
const Transaction = require('../models/transaction-schema.js');
const Inventory = require('../models/inventory-schema.js');
const TransactionNumber = require('../models/transaction-number-schema.js');
const Price = require('../models/selling-price-schema.js');

const transactionController = {
	/**
	 * Gets the transactions page.
	 *
	 * @param {Express.Request} req  Object that contains information on the HTTP request from the client.
	 * @param {Express.Response} res  Object that contains information on the HTTP response from the server.
	 */
	getTransaction: function(req, res) {
		/* Store the details of all transactions in individual arrays to allow for further formatting. */
		const ids = [];
		const dates = [];
		const customers = [];
		const totals = [];
		const statuses = [];

		/* Retrieve the details of all transactions. */
		const query = {};
		const projection = 'id date customer total status';

		db.findMany(Transaction, query, projection, function(result) {
			/* Assign the result of the database retrieval to the variable transactions. */
			const transactions = result;

			/* For each transaction, store the transaction details in the individual arrays. */
			for (let i = 0; i < transactions.length; i++) {
				
				/* Format the display of the transaction date from the Date object
				 * stored in the database
				 */
				const month = transactions[i].date.getMonth() + 1;
				let formattedMonth = month;
				if (month.toString().length < 2) {
					formattedMonth = '0' + month.toString();
				}

				const date = transactions[i].date.getDate();
				let formattedDate = date;
				if (date.toString().length < 2) {
					formattedDate = '0' + date.toString();
				}

				const year = transactions[i].date.getFullYear();

				/* Store the transaction details in their respective arrays. */
				ids[i] = transactions[i].id;
				dates[i] = formattedMonth + '/' + formattedDate + '/' + year;
				customers[i] = transactions[i].customer;
				totals[i] = transactions[i].total;
				statuses[i] = transactions[i].status;
			}

			/* Store the retrieved transaction details in the variable data. */
			const data = {
				transactionIds: ids,
				transactionDates: dates,
				transactionCustomers: customers,
				transactionTotals: totals,
				transactionStatuses: statuses,

				/* Additionally, store the role of the account to authorize the add and edit transaction features. */
				role: req.session.role
			};

			res.render('transaction', data);
		});
	},

	/**
	 * Updates the status of the selected transaction to "Cancelled".
	 *
	 * @param {Express.Request} req  Object that contains information on the HTTP request from the client.
	 * @param {Express.Response} res  Object that contains information on the HTTP response from the server.
	 */
	 postEditStatusCancelled: function(req, res) {
		/* Retrieve the ID of the selected transaction. */
		const transactionId = req.body.transactionId;

		/* Set the status of the selected account to "Cancelled". */
		const update = {status: 'cancelled'};

		/* Update the corresponding database entry using its transaction ID. */
		const filter = {id: transactionId};

		db.updateOne(Transaction, filter, update, function(flag) {
			res.status(200).json('Status updated successfully!');
			res.send();
		});
	},

	/**
	 * Updates the status of the selected transaction to "Completed".
	 *
	 * @param {Express.Request} req  Object that contains information on the HTTP request from the client.
	 * @param {Express.Response} res  Object that contains information on the HTTP response from the server.
	 */
	 postEditStatusCompleted: function(req, res) {
		/* Retrieve the ID of the selected transaction. */
		const transactionId = req.body.transactionId;

		/* Set the status of the selected account to "Completed". */
		const update = {status: 'completed'};

		/* Update the corresponding database entry using its transaction ID. */
		const filter = {id: transactionId};

		db.updateOne(Transaction, filter, update, function(flag) {
			res.status(200).json('Status updated successfully!');
			res.send();
		});
	},

	/**
	 * Updates the status of the selected transaction to "Pending".
	 *
	 * @param {Express.Request} req  Object that contains information on the HTTP request from the client.
	 * @param {Express.Response} res  Object that contains information on the HTTP response from the server.
	 */
	 postEditStatusPending: function(req, res) {
		/* Retrieve the ID of the selected transaction. */
		const transactionId = req.body.transactionId;

		/* Set the status of the selected account to "Pending". */
		const update = {status: 'pending'};

		/* Update the corresponding database entry using its transaction ID. */
		const filter = {id: transactionId};

		db.updateOne(Transaction, filter, update, function(flag) {
			res.status(200).json('Status updated successfully!');
			res.send();
		});
	},

	/**
	 * Gets the page displaying more information for a particular transaction.
	 *
	 * @param {Express.Request} req  Object that contains information on the HTTP request from the client.
	 * @param {Express.Response} res  Object that contains information on the HTTP response from the server.
	 */
	getMoreInfoTransaction: function(req, res) {
		/* Retrieve the purchase ID from the page link. */
		const transactionId = req.params.id;

		/* Retrieve the data corresponding to the ID of the selected transaction. */
		const query = {id: transactionId};
		const projection = 'id status customer number date total priceGasoline litersGasoline pricePremiumGasoline95 litersPremiumGasoline95 priceDiesel litersDiesel pricePremiumGasoline97 litersPremiumGasoline97 priceKerosene litersKerosene';

		db.findOne(Transaction, query, projection, function(result) {
			/* Format the display of the purchase date from the Date object
			 * stored in the database.
			 */
			const month = result.date.getMonth() + 1;
			let formattedMonth = month;
			if (month.toString().length < 2) {
				formattedMonth = '0' + month.toString();
			}

			const date = result.date.getDate();
			let formattedDate = date;
			if (date.toString().length < 2) {
				formattedDate = '0' + date.toString();
			}

			const year = result.date.getFullYear();

			const cleanDate = year + '-' + formattedMonth + '-' + formattedDate;

			/* Compute for the total price of each type of fuel purchased. */
			const totalGasoline = result.priceGasoline * result.litersGasoline;
			const totalPremiumGasoline95 = result.pricePremiumGasoline95 * result.litersPremiumGasoline95;
			const totalDiesel = result.priceDiesel * result.litersDiesel;
			const totalPremiumGasoline97 = result.pricePremiumGasoline97 * result.litersPremiumGasoline97;
			const totalKerosene = result.priceKerosene * result.litersKerosene;

			/* Store the purchase details in the variable data. */
			const data = {
				id: result.id,
				status: result.status,
				customer: result.customer,
				number: result.number,
				date: cleanDate,
				total: result.total,
				priceGasoline: result.priceGasoline,
				litersGasoline: result.litersGasoline,
				totalGasoline: totalGasoline,
				pricePremiumGasoline95: result.pricePremiumGasoline95,
				litersPremiumGasoline95: result.litersPremiumGasoline95,
				totalPremiumGasoline95: totalPremiumGasoline95,
				priceDiesel: result.priceDiesel,
				litersDiesel: result.litersDiesel,
				totalDiesel: totalDiesel,
				pricePremiumGasoline97: result.pricePremiumGasoline97,
				litersPremiumGasoline97: result.litersPremiumGasoline97,
				totalPremiumGasoline97: totalPremiumGasoline97,
				priceKerosene: result.priceKerosene,
				litersKerosene: result.litersKerosene,
				totalKerosene: totalKerosene
			};

			res.render('more-info-transaction', data);
		});
	},

	getEditTransaction: function(req, res) {
		/* Retrieve the purchase ID from the page link. */
		const id = req.params.id;

		/* Retrieve the data corresponding to the ID of the selected transaction. */
		const query = {id: id};
		const projection = 'id status customer number date priceGasoline litersGasoline pricePremiumGasoline95 litersPremiumGasoline95 priceDiesel litersDiesel pricePremiumGasoline97 litersPremiumGasoline97 priceKerosene litersKerosene';

		db.findOne(Transaction, query, projection, function(result) {
			/* Store the result of the database retrieval in the variable transactionDetails. */
			const transactionDetails = result;

			/* Format the display of the transaction date from the Date object
			 * stored in the database.
			 */
			const month = transactionDetails.date.getMonth() + 1;
			let formattedMonth = month;
			if (month.toString().length < 2) {
				formattedMonth = '0' + month.toString();
			}

			const date = transactionDetails.date.getDate();
			let formattedDate = date;
			if (date.toString().length < 2) {
				formattedDate = '0' + date.toString();
			}

			const year = transactionDetails.date.getFullYear();

			const cleanDate = year + '-' + formattedMonth + '-' + formattedDate;
			
			/* Store the total quantities and statuses of each type of fuel. */
			let totalGasoline = 0;
			let totalPremiumGasoline95 = 0;
			let totalDiesel = 0;
			let totalPremiumGasoline97 = 0;
			let totalKerosene = 0;

			/* Retrieve the available fuel amounts in the inventory. */
			const queryInventory = {};
			const projectionInventory = '_id type quantityPurchased quantityDepleted';

			db.findMany(Inventory, queryInventory, projectionInventory, function(result) {
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
				
				/* Store the transaction details and total fuel amounts in the variable data. */
				const data = {
					id: id,
					status: transactionDetails.status,
					customer: transactionDetails.customer,
					number: transactionDetails.number,
					date: cleanDate,
					priceGasoline: transactionDetails.priceGasoline,
					litersGasoline: transactionDetails.litersGasoline,
					pricePremiumGasoline95: transactionDetails.pricePremiumGasoline95,
					litersPremiumGasoline95: transactionDetails.litersPremiumGasoline95,
					priceDiesel: transactionDetails.priceDiesel,
					litersDiesel: transactionDetails.litersDiesel,
					pricePremiumGasoline97: transactionDetails.pricePremiumGasoline97,
					litersPremiumGasoline97: transactionDetails.litersPremiumGasoline97,
					priceKerosene: transactionDetails.priceKerosene,
					litersKerosene: transactionDetails.litersKerosene,

					totalGasoline: totalGasoline,
					totalPremiumGasoline95: totalPremiumGasoline95,
					totalDiesel: totalDiesel,
					totalPremiumGasoline97: totalPremiumGasoline97,
					totalKerosene: totalKerosene
				};

				res.render('edit-transaction', data);
			});
		});
	},

	getAddTransaction: function(req, res) {
		/* Retrieve the transaction number of the new transaction. */
		const query = {label: "nextTransaction"};
		const projection = 'transactionNumber';

		db.findOne(TransactionNumber, query, projection, function(result) {
			/* The transaction ID of the new transaction is 1000000 added to the transaction number. */
			const transactionId = 1000000 + result.transactionNumber;

			/* Retrieve the current selling price of each fuel type. */
			const queryPrice = {label: "Prices"};
			const projectionPrice = 'gasoline premiumGasoline95 diesel premiumGasoline97 kerosene';

			db.findOne(Price, queryPrice, projectionPrice, function(result) {
				/* Store the result of the database retrieval in the variable sellingPrices. */
				const sellingPrices = result;

				/* Store the total quantities and statuses of each type of fuel. */
				let totalGasoline = 0;
				let totalPremiumGasoline95 = 0;
				let totalDiesel = 0;
				let totalPremiumGasoline97 = 0;
				let totalKerosene = 0;

				/* Retrieve the available fuel amounts in the inventory. */
				const queryInventory = {};
				const projectionInventory = '_id type quantityPurchased quantityDepleted';

				db.findMany(Inventory, queryInventory, projectionInventory, function(result) {
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
					
					/* Store the preliminary transaction data in the variable data. */
					const data = {
						id: transactionId,
						priceGasoline: sellingPrices.gasoline,
						pricePremiumGasoline95: sellingPrices.premiumGasoline95,
						priceDiesel: sellingPrices.diesel,
						pricePremiumGasoline97: sellingPrices.premiumGasoline97,
						priceKerosene: sellingPrices.kerosene,

						totalGasoline: totalGasoline,
						totalPremiumGasoline95: totalPremiumGasoline95,
						totalDiesel: totalDiesel,
						totalPremiumGasoline97: totalPremiumGasoline97,
						totalKerosene: totalKerosene
					};

					res.render('add-transaction', data);
				});
			});
		});
	}
};

module.exports = transactionController;
