/* Script for populating the database with an initial inventory purchase */

/* The db file and inventory schema are used to manipulate the inventory entries on the database. */
const db = require('../models/db.js');
const Inventory = require('../models/inventory-schema.js');

/* Establish a connection to the database. */
db.connect();

/* Initialize inventory purchase details */
const purchase = {
	type: 'diesel',
	date: '01/01/2022',
	supplier: 'Supplier One',
	price: 60.00,
	location: '2401 Taft Ave., Manila',
	quantity: 100
};

/* Insert the initialized account into the database. */
db.insertOne(Inventory, purchase, function(flag) {
	if (flag) {
		console.log('\nDatabase population complete! Press Ctrl + C to continue.');
	}
});
