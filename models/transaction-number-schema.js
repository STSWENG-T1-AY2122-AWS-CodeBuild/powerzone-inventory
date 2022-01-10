/* Schema for the transaction number of the next transaction */

/* Mongoose is used for database functions */
const mongoose = require('mongoose');

const transactionNumberSchema = new mongoose.Schema({
	/* Label of the database entry for database retrieval */
	label: {
		type: String,
		required: true
	},

	/* Number of the next transaction */
	transactionNumber: {
		type: Number,
		required: true
	}
});

module.exports = mongoose.model('TransactionNumber', transactionNumberSchema);
