/* Schema for the product inventory */

/* Mongoose is used for database functions */
const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
	/* Fuel type */
	type: {
		type: String,
		required: true,
	},

	/* Date purchased */
	date: {
		type: Date,
		required: true,
	},

	/* Supplier name */
	supplier: {
		type: String,
		required: true,
	},

	/* Price purchased */
	price: {
		type: Number,
		required: true,
	},

	/* Storage location */
	location: {
		type: String,
		required: true,
	},

	/* Quantity purchased */
	quantity: {
		type: Number,
		required: true,
	},
});

module.exports = mongoose.model('Inventory', inventorySchema);
