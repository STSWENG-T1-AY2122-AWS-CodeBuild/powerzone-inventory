/* Schema for the selling prices of the available products */

/* Mongoose is used for database functions */
const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
	/* Label of the database entry for database retrieval */
	label: {
		type: String,
		required: true,
	},

	/* Price for gasoline */
	gasoline: {
		type: Number,
		required: true,
	},

	/* Price for premium gasoline 95 */
	premiumGasoline95: {
		type: Number,
		required: true,
	},

	/* Price for diesel */
	diesel: {
		type: Number,
		required: true,
	},

	/* Price for premiumGasoline97 */
	premiumGasoline97: {
		type: Number,
		required: true,
	},

	/* Price for kerosene */
	kerosene: {
		type: Number,
		required: true,
	},
});

module.exports = mongoose.model('Price', priceSchema);
