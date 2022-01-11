/* Script for populating the database with a sample transaction */

/* The db file and transaction schema are used to manipulate the transaction entries on the database. */
const db = require('../models/db.js');
const Transaction = require('../models/transaction-schema.js');

/* Establish a connection to the database. */
db.connect();

/* Initialize sample transaction details */
const transaction = {
	id: 10000001,
	date: '01/01/2022',
	customer: 'Shell',
	total: 15186.00,
	status: 'completed',
	number: 9175244444,
	priceGasoline: 55.09,
	litersGasoline: 50,
	pricePremiumGasoline95: 65.55,
	litersPremiumGasoline95: 50,
	priceDiesel: 65.00,
	litersDiesel: 50,
	pricePremiumGasoline97: 59.04,
	litersPremiumGasoline97: 50,
	priceKerosene: 59.04,
	litersKerosene: 50
};

/* Insert the initialized transaction into the database. */
db.insertOne(Transaction, transaction, function(flag) {
	if (flag) {
		console.log('\nDatabase population complete! Press Ctrl + C to continue.');
	}
});
