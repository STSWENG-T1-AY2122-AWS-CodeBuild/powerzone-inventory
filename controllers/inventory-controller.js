/* Controller for displaying the inventory page */

/* The db file and inventory schema are used for the inventory page. */
const db = require('../models/db.js');
const Inventory = require('../models/inventory-schema.js');

const inventoryController = {
	/**
	 * Gets the inventory page.
	 *
	 * @param {Express.Request} req  Object that contains information on the HTTP request from the client.
	 * @param {Express.Response} res  Object that contains information on the HTTP response from the server.
	 */
	getInventory: function(req, res) {
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

		/* Retrieve the details of all inventory purchases. */
		const query = {};
		const projection = '_id type date supplier price quantity';

		db.findMany(Inventory, query, projection, function(result) {
			/* Assign the result of the database retrieval to the variable purchases. */
			const purchases = result;

			/* For each purchase, update the total fuel quantities accordingly and store the purchase
			 * details in the individual arrays.
			 */
			for (let i = 0; i < purchases.length; i++) {
				/* Following the feature specifications, display only stocks with quantities above 0
				 * in the application.
				 */
				if (purchases[i].quantity > 0) {
					if (purchases[i].type == 'Gasoline') {
						totalGasoline += purchases[i].quantity;
					} else if (purchases[i].type == 'Premium Gasoline 95') {
						totalPremiumGasoline95 += purchases[i].quantity;
					} else if (purchases[i].type == 'Diesel') {
						totalDiesel += purchases[i].quantity;
					} else if (purchases[i].type == 'Premium Gasoline 97') {
						totalPremiumGasoline97 += purchases[i].quantity;
					} else {
						totalKerosene += purchases[i].quantity;
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

			/* Store the total fuel quantities, fuel statuses, and retrieved inventory details
			 * in the variable data.
			 */
			const data = {
				totalGasoline: totalGasoline,
				totalPremiumGasoline95: totalPremiumGasoline95,
				totalDiesel: totalDiesel,
				totalPremiumGasoline97: totalPremiumGasoline97,
				totalKerosene: totalKerosene,
				inventoryIds: ids,
				inventoryTypes: types,
				inventoryDates: dates,
				inventorySuppliers: suppliers,
				inventoryPrices: prices,
				inventoryLocations: locations,
				inventoryStatuses: statuses,

				/* Additionally, store the role of the account to authorize the add and edit stock features. */
				role: req.session.role
			};

			res.render('inventory', data);
		});
	},

	/**
	 * Gets the page displaying more information for a particular stock or purchase.
	 *
	 * @param {Express.Request} req  Object that contains information on the HTTP request from the client.
	 * @param {Express.Response} res  Object that contains information on the HTTP response from the server.
	 */
	 getMoreInfoStock: function(req, res) {
		/* Retrieve the purchase ID from the page link. */
		const id = req.params.id;

		/* Retrieve the data corresponding to the ID of the selected purchase */
		const query = {_id: db.convertToObjectId(id)};
		const projection = 'type supplier location quantity price date';

		db.findOne(Inventory, query, projection, function(result) {
			/* Format the display of the purchase date from the Date object
			 * stored in the database
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

			/* Store the purchase details in the variable data. */
			const data = {
				type: result.type,
				supplier: result.supplier,
				location: result.location,
				quantity: result.quantity,
				price: result.price,
				date: cleanDate
			};

			res.render('more-info-stock', data);
		});
	},

	/**
	 * Gets the page for editing information on a particular stock or purchase.
	 *
	 * @param {Express.Request} req  Object that contains information on the HTTP request from the client.
	 * @param {Express.Response} res  Object that contains information on the HTTP response from the server.
	 */
	getEditStock: function(req, res) {
		/* Retrieve the purchase ID from the page link. */
		const id = req.params.id;

		/* Retrieve the data corresponding to the ID of the selected purchase */
		const query = {_id: db.convertToObjectId(id)};
		const projection = 'type supplier location quantity price date';

		db.findOne(Inventory, query, projection, function(result) {
			/* Format the display of the purchase date from the Date object
			 * stored in the database
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

			/* Store the purchase details in the variable data. */
			const data = {
				id: id,
				type: result.type,
				supplier: result.supplier,
				location: result.location,
				quantity: result.quantity,
				price: result.price,
				date: cleanDate
			};

			res.render('edit-stock', data);
		});
	},

	/**
	 * Registers the details of a stock or purchase.
	 *
	 * @param {Express.Request} req  Object that contains information on the HTTP request from the client.
	 * @param {Express.Response} res  Object that contains information on the HTTP response from the server.
	 */
	 postEditStock: function(req, res) {
		/* Retrieve the purchase details from the user input. */
		const id = req.body.editStockId;
		const type = req.body.editStockName.trim();
		const supplier = req.body.editStockSupplier.trim();
		const location = req.body.editStockStorage.trim();
		const quantity = req.body.editStockQuantity;
		const price = req.body.editStockPricePurchased;
		const date = req.body.editStockDatePurchased;

		/* Convert the retrieved purchase ID to an ObjectID for database retrieval. */
		const filter = {_id: db.convertToObjectId(id)};

		/* Assign the updated details to the update variable. */
		const update = {
			type: type,
			supplier: supplier,
			location: location,
			quantity: quantity,
			price: price,
			date: date
		};

		db.updateOne(Inventory, filter, update, function(flag) {
			res.status(200).json('Stock details updated successfully!');
			res.send();
		});
	 },

	/**
	 * Gets the page for adding a new stock or purchase.
	 *
	 * @param {Express.Request} req  Object that contains information on the HTTP request from the client.
	 * @param {Express.Response} res  Object that contains information on the HTTP response from the server.
	 */
	getAddStock: function(req, res) {
		res.render('add-stock');
	},

	/**
	 * Adds a new stock or purchase to the database.
	 *
	 * @param {Express.Request} req  Object that contains information on the HTTP request from the client.
	 * @param {Express.Response} res  Object that contains information on the HTTP response from the server.
	 */
	 postAddStock: function(req, res) {
		/* Retrieve the purchase details from the user input. */
		const type = req.body.addStockName.trim();
		const supplier = req.body.addStockSupplier.trim();
		const location = req.body.addStockStorage.trim();
		const quantity = req.body.addStockQuantity;
		const price = req.body.addStockPricePurchased;
		const date = req.body.addStockDatePurchased;

		/* Assign the purchase details to the purchase variable. */
		const purchase = {
			type: type,
			supplier: supplier,
			location: location,
			quantity: quantity,
			price: price,
			date: date
		};


		db.insertOne(Inventory, purchase, function(flag) {
			res.status(200).json('Stock added successfully.');
			res.send();
		});
	}
};

module.exports = inventoryController;
