/* Controller for displaying the inventory page */

/* The db file and inventory schema are used for the inventory page. */
const db = require('../models/db.js');
const Inventory = require('../models/inventory-schema.js');

/* A utility object is used for auxiliary functions. */
const inventoryControllerUtil = require('./inventory-controller-util.js');

const inventoryController = {
	/**
	 * Gets the inventory page.
	 *
	 * @param {Express.Request} req  Object that contains information on the HTTP request from the client.
	 * @param {Express.Response} res  Object that contains information on the HTTP response from the server.
	 */
	getInventory: function(req, res) {
		/* Retrieve the details of all inventory purchases. */
		const query = {};
		const projection = '_id type date supplier price quantityPurchased quantityDepleted';

		db.findMany(Inventory, query, projection, function(result) {
			const details = inventoryControllerUtil.inventoryUtil(result);

			/* Store the total fuel quantities, fuel statuses, and retrieved inventory details
			 * in the variable data.
			 */
			const data = {
				totalGasoline: details.totalGasoline,
				totalPremiumGasoline95: details.totalPremiumGasoline95,
				totalDiesel: details.totalDiesel,
				totalPremiumGasoline97: details.totalPremiumGasoline97,
				totalKerosene: details.totalKerosene,
				inventoryIds: details.ids,
				inventoryTypes: details.types,
				inventoryDates: details.dates,
				inventorySuppliers: details.suppliers,
				inventoryPrices: details.prices,
				inventoryLocations: details.locations,
				inventoryStatuses: details.statuses,

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

		/* Retrieve the data corresponding to the ID of the selected purchase. */
		const query = {_id: db.convertToObjectId(id)};
		const projection = 'type supplier location quantityPurchased quantityDepleted price date';

		db.findOne(Inventory, query, projection, function(result) {
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

			/* Compute for the current quantity of the stock. */
			const currentQuantity = result.quantityPurchased - result.quantityDepleted;

			/* Store the purchase details in the variable data. */
			const data = {
				type: result.type,
				supplier: result.supplier,
				location: result.location,
				quantity: currentQuantity,
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
		const projection = 'type supplier location quantityPurchased quantityDepleted price date';

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

			/* Compute for the current quantity of the stock. */
			const currentQuantity = result.quantityPurchased - result.quantityDepleted;

			/* Store the purchase details in the variable data. */
			const data = {
				id: id,
				type: result.type,
				supplier: result.supplier,
				location: result.location,
				quantityPurchased: result.quantityPurchased,
				quantityDepleted: result.quantityDepleted,
				currentQuantity: currentQuantity,
				price: result.price,
				date: cleanDate
			};

			res.render('edit-stock', data);
		});
	},

	/**
	 * Edits the details of a stock or purchase.
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

		/* Assign the updated details to the update variable.
		 */
		const update = {
			type: type,
			supplier: supplier,
			location: location,
			quantityPurchased: quantity,
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
		const quantity = req.body.addStockQuantityPurchased;
		const price = req.body.addStockPricePurchased;
		const date = req.body.addStockDatePurchased;

		/* Assign the purchase details to the purchase variable. */
		const purchase = {
			type: type,
			supplier: supplier,
			location: location,
			quantityPurchased: quantity,
			quantityDepleted: 0,
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
