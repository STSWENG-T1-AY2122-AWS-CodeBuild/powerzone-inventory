/* Controller for displaying the inventory page */

/* The db file and inventory schema are used for the inventory page. */
const db = require('../models/db.js');
const Inventory = require('../models/inventory-schema.js');

const inventoryController = {
	/**
	 * Gets the inventory page.
	 * 
	 * @param req Object that contains information on the HTTP request from the client.
	 * @param res Object that contains information on the HTTP response from the server.
	 */
	getInventory: function(req, res) {
		/* Store the total quantities and statuses of each type of fuel. */
		let totalGasoline = 0;
		let statusGasoline = "In Stock";
		let totalPremiumGasoline95 = 0;
		let statusPremiumGasoline95 = "In Stock";
		let totalDiesel = 0;
		let statusDiesel = "In Stock";
		let totalPremiumGasoline97 = 0;
		let statusPremiumGasoline97 = "In Stock";
		let totalKerosene = 0;
		let statusKerosene = "In Stock";

		/* Store the details of all purchases in individual arrays to allow for further formatting. */
		let ids = [];
		let types = [];
		let dates = [];
		let suppliers = [];
		let prices = [];
		let locations = [];
		let quantities = [];

		/* Retrieve the details of all inventory purchases. */
		let query = {};
		let projection = '_id type date supplier price quantity';

		db.findMany(Inventory, query, projection, function(result) {

			/* Assign the result of the database retrieval to the variable purchases. */
			let purchases = result;

			/* For each purchase, update the total fuel quantities accordingly and store the purchase
			 * details in the purchaseDetails array. 
			 */
			let purchaseDetails = [];
			for (let i = 0; i < purchases.length; i++) {
				if (purchases[i].type == "Gasoline") {
					totalGasoline += purchases[i].quantity;
				} else if (purchases[i].type == "Premium Gasoline 95") {
					totalPremiumGasoline95 += purchases[i].quantity;
				} else if (purchases[i].type == "Diesel") {
					totalDiesel += purchases[i].quantity;
				} else if (purchases[i].type == "Premium Gasoline 97") {
					totalPremiumGasoline97 += purchases[i].quantity;
				} else {
					totalKerosene += purchases[i].quantity;
				}

				/* Format the display of the purchase date from the Date object
				 * stored in the database
				 */
				let month = purchases[i].date.getMonth() + 1;
				let formattedMonth = month;
				if (month.toString().length < 2) {
					formattedMonth = "0" + month.toString();
				}

				let date = purchases[i].date.getDate();
				let formattedDate = date;
				if (date.toString().length < 2) {
					formattedDate = "0" + date.toString();
				}

				let year = purchases[i].date.getFullYear();

				/* Store the purchase details in their respective arrays. */
				ids[i] = purchases[i]._id;
				types[i] = purchases[i].type;
				dates[i] = formattedMonth + "/" + formattedDate + "/" + year;
				suppliers[i] = purchases[i].supplier;
				prices[i] = purchases[i].price;
				locations[i] = purchases[i].location;
				quantities[i] = purchases[i].quantity;
			}

			/* Update the statuses of each fuel type based on their computed total quantities. */
			if (totalGasoline == 0) {
				statusGasoline = "Depleted";
			} else if (totalGasoline <= 10) {
				statusGasoline = "Critically Low";
			}

			if (totalPremiumGasoline95 == 0) {
				statusPremiumGasoline95 = "Depleted";
			} else if (totalPremiumGasoline95 <= 10) {
				statusPremiumGasoline95 = "Critically Low";
			}

			if (totalDiesel == 0) {
				statusDiesel = "Depleted";
			} else if (totalDiesel <= 10) {
				statusDiesel = "Critically Low";
			}

			if (totalPremiumGasoline97 == 0) {
				statusPremiumGasoline97 = "Depleted";
			} else if (totalPremiumGasoline97 <= 10) {
				statusPremiumGasoline97 = "Critically Low";
			}

			if (totalKerosene == 0) {
				statusKerosene = "Depleted";
			} else if (totalKerosene <= 10) {
				statusKerosene = "Critically Low";
			}

			/* Store the total fuel quantities, fuel statuses, and retrieved inventory details 
			 * in the variable data. 
			 */
			let data = {
				totalGasoline: totalGasoline,
				statusGasoline: statusGasoline,
				totalPremiumGasoline95: totalPremiumGasoline95,
				statusPremiumGasoline95: statusPremiumGasoline95,
				totalDiesel: totalDiesel,
				statusDiesel: statusDiesel,
				totalPremiumGasoline97: totalPremiumGasoline97,
				statusPremiumGasoline97: statusPremiumGasoline97,
				totalKerosene: totalKerosene,
				statusKerosene: statusKerosene,
				inventoryIds: ids,
				inventoryTypes: types,
				inventoryDates: dates,
				inventorySuppliers: suppliers,
				inventoryPrices: prices,
				inventoryLocations: locations,
				inventoryQuantities: quantities
			}

			res.render('inventory', data);
		});
	},

	/**
	 * Gets the page displaying more information for a particular stock or purchase.
	 * 
	 * @param req Object that contains information on the HTTP request from the client.
	 * @param res Object that contains information on the HTTP response from the server.
	 */
	 getMoreInfoStock: function(req, res){
		/* Retrieve the purchase ID from the page link. */ 
		let id = req.params.id;
		
		/* Retrieve the data corresponding to the ID of the selected purchase */
		let query = {_id: db.convertToObjectId(id)};
		let projection = 'type supplier location quantity price date';

		db.findOne(Inventory, query, projection, function(result) {
			/* Format the display of the purchase date from the Date object
			 * stored in the database
			 */
			let month = result.date.getMonth() + 1;
			let formattedMonth = month;
			if (month.toString().length < 2) {
				formattedMonth = "0" + month.toString();
			}

			let date = result.date.getDate();
			let formattedDate = date;
			if (date.toString().length < 2) {
				formattedDate = "0" + date.toString();
			}

			let year = result.date.getFullYear();

			let cleanDate = year + "-" + formattedMonth + "-" + formattedDate;

			/* Store the purchase details in the variable data. */
			let data = {
				type: result.type,
				supplier: result.supplier,
				location: result.location,
				quantity: result.quantity,
				price: result.price,
				date: cleanDate
			}

			res.render('more-info-stock', data);
		});
	},

	/**
	 * Gets the page for editing information on a particular stock or purchase.
	 * 
	 * @param req Object that contains information on the HTTP request from the client.
	 * @param res Object that contains information on the HTTP response from the server.
	 */
	getEditStock: function(req, res){
		/* Retrieve the purchase ID from the page link. */ 
		let id = req.params.id;
		
		/* Retrieve the data corresponding to the ID of the selected purchase */
		let query = {_id: db.convertToObjectId(id)};
		let projection = 'type supplier location quantity price date';

		db.findOne(Inventory, query, projection, function(result) {
			/* Format the display of the purchase date from the Date object
			 * stored in the database
			 */
			let month = result.date.getMonth() + 1;
			let formattedMonth = month;
			if (month.toString().length < 2) {
				formattedMonth = "0" + month.toString();
			}

			let date = result.date.getDate();
			let formattedDate = date;
			if (date.toString().length < 2) {
				formattedDate = "0" + date.toString();
			}

			let year = result.date.getFullYear();

			let cleanDate = year + "-" + formattedMonth + "-" + formattedDate;

			/* Store the purchase details in the variable data. */
			let data = {
				id: id,
				type: result.type,
				supplier: result.supplier,
				location: result.location,
				quantity: result.quantity,
				price: result.price,
				date: cleanDate
			}

			res.render('edit-stock', data);
		});
	},

	/**
	 * Registers the details of a stock or purchase.
	 * 
	 * @param req Object that contains information on the HTTP request from the client.
	 * @param res Object that contains information on the HTTP response from the server.
	 */
	 postEditStock: function(req, res) {

		/* Retrieve the purchase details from the user input. */
		let id = req.body.editStockId;
		let type = req.body.editStockName.trim();
		let supplier = req.body.editStockSupplier.trim();
		let location = req.body.editStockStorage.trim();
		let quantity = req.body.editStockQuantity;
		let price = req.body.editStockPricePurchased;
		let date = req.body.editStockDatePurchased;

		/* Convert the retrieved purchase ID to an ObjectID for database retrieval. */
		let filter = {_id: db.convertToObjectId(id)};

		/* Assign the updated details to the update variable. */
		let update = {
			type: type,
			supplier: supplier,
			location: location,
			quantity: quantity,
			price: price,
			date: date
		}

		db.updateOne(Inventory, filter, update, function(flag) {
			res.status(200).json("Stock details updated successfully!");
			res.send();
		});
	 },

	/**
	 * Gets the page for adding a new stock or purchase.
	 * 
	 * @param req Object that contains information on the HTTP request from the client.
	 * @param res Object that contains information on the HTTP response from the server.
	 */
	getAddStock: function(req, res){
		res.render('add-stock');
	},

	/**
	 * Adds a new stock or purchase to the database.
	 * 
	 * @param req Object that contains information on the HTTP request from the client.
	 * @param res Object that contains information on the HTTP response from the server.
	 */
	 postAddStock: function(req, res){
		/* Retrieve the purchase details from the user input. */
		let type = req.body.addStockName.trim();
		let supplier = req.body.addStockSupplier.trim();
		let location = req.body.addStockStorage.trim();
		let quantity = req.body.addStockQuantity;
		let price = req.body.addStockPricePurchased;
		let date = req.body.addStockDatePurchased;

		/* Assign the purchase details to the purchase variable. */
		let purchase = {
			type: type,
			supplier: supplier,
			location: location,
			quantity: quantity,
			price: price,
			date: date
		}

		console.log(purchase);

		db.insertOne(Inventory, purchase, function (flag) {
			res.status(200).json("Stock added successfully.");
			res.send();
		});
	}
}

module.exports = inventoryController;