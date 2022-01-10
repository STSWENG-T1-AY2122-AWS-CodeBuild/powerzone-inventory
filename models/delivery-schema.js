/* Schema for the transaction deliveries */

/* Mongoose is used for database functions */
const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
	/* Delivery ID */
	id: {
		type: Number,
		required: true
	},

	/* Delivery date */
	date: {
		type: Date,
		required: false
	},

	/* Customer name */
	customer: {
		type: String,
		required: true
	},

	/* Drop-off location */
	dropoff: {
		type: String,
		required: false
	},

	/* Delivery status */
	status: {
		type: String,
		required: true
	},

	/* Customer phone number */
	number: {
		type: Number,
		required: false
	},

	/* Warehouse location */
	warehouse: {
		type: String,
		required: false
	},

	/* Delivery manager */
	manager: {
		type: String,
		required: false
	},

	/* Driver */
	driver: {
		type: String,
		required: false
	}
});

module.exports = mongoose.model('Delivery', deliverySchema);
