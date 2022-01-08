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
    number: 09175244444,
    priceGasoline: 55.09,
    litersGasoline: 50,
    totalGasoline: 2754.50,
    pricePremiumGasoline95: 65.55,
    litersPremiumGasoline95: 50,
    totalPremiumGasoline95: 3277.50,
    priceDiesel: 65.00,
    litersDiesel: 50,
    totalDiesel: 3250.00,
    pricePremiumGasoline97: 59.04,
    litersPremiumGasoline97: 50,
    totalPremiumGasoline97: 2952.00,
    priceKerosene: 59.04,
    litersKerosene: 50,
    totalKerosene: 2952.00,
};

/* Insert the initialized account into the database. */
db.insertOne(Transaction, transaction, function(flag) {
	if (flag) {
		console.log('\nDatabase population complete! Press Ctrl + C to continue.');
	}
});
