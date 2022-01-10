/* Script for populating the database with the transaction number of the next transaction */

/* The db file and transaction number schema are used to manipulate the transaction number on the database. */
const db = require('../models/db.js');
const TransactionNumber = require('../models/transaction-number-schema.js');

/* Establish a connection to the database. */
db.connect();

/* Initialize the transaction number */
const transactionNumber = {
	label: 'nextTransaction',
	transactionNumber: 10000002
};

/* Insert the transaction number into the database. */
db.insertOne(TransactionNumber, transactionNumber, function(flag) {
	if (flag) {
		console.log('\nDatabase population complete! Press Ctrl + C to continue.');
	}
});
