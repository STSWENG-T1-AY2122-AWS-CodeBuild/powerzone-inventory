/* Script for populating the database with the product prices */

/* Mongoose is used for database functions. */
const mongoose = require('mongoose');

/* The db file and selling price schema are used to manipulate the prices on the database. */
const db = require('../models/db.js');
const Price = require('../models/selling-price-schema.js');

/* Establish a connection to the database. */
db.connect();

/* Initialize prices */
const prices = {
	label: 'Prices',
	gasoline: 59.04,
	premiumGasoline95: 59.04,
	diesel: 59.04,
	premiumGasoline97: 59.04,
	kerosene: 59.04,
};

/* Insert the initialized account into the database. */
db.insertOne(Price, prices, function(flag) {
	if (flag) {
		console.log('\nDatabase population complete! Press Ctrl + C to continue.');
	}
});
