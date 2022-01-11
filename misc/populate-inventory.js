/* Script for populating the database with initial inventory purchases */

/* The db file and inventory schema are used to manipulate the inventory entries on the database. */
const db = require('../models/db.js');
const Inventory = require('../models/inventory-schema.js');

/* Establish a connection to the database. */
db.connect();

/* Initialize inventory purchase details. */
const purchaseOne = {
	type: 'diesel',
	date: '01/01/2022',
	supplier: 'Supplier One',
	price: 60.00,
	location: '2401 Taft Ave., Manila',
	quantityPurchased: 100,
	quantityDepleted: 0
};

const purchaseTwo = {
	type: 'diesel',
	date: '01/25/2022',
	supplier: 'Supplier One',
	price: 65.00,
	location: '2401 Taft Ave., Manila',
	quantityPurchased: 1000,
	quantityDepleted: 0
};

const purchaseThree = {
	type: 'gasoline',
	date: '01/11/2022',
	supplier: 'Supplier Gas',
	price: 123.50,
	location: '2401 Taft Ave., Manila',
	quantityPurchased: 50,
	quantityDepleted: 0
};

const purchaseFour = {
	type: 'gasoline',
	date: '01/01/2022',
	supplier: 'Supplier Gas',
	price: 125.00,
	location: '2401 Taft Ave., Manila',
	quantityPurchased: 50,
	quantityDepleted: 0
};

const purchaseFive = {
	type: 'kerosene',
	date: '12/30/2021',
	supplier: 'Supplier Three',
	price: 100.00,
	location: '2401 Taft Ave., Manila',
	quantityPurchased: 100,
	quantityDepleted: 0
};

const purchaseSix = {
	type: 'kerosene',
	date: '01/03/2022',
	supplier: 'Supplier Three',
	price: 1000.00,
	location: '2401 Taft Ave., Manila',
	quantityPurchased: 5000,
	quantityDepleted: 0
};

const purchaseSeven = {
	type: 'premium-gasoline-95',
	date: '01/01/2022',
	supplier: 'Supplier Premium',
	price: 82.35,
	location: '2401 Taft Ave., Manila',
	quantityPurchased: 250,
	quantityDepleted: 0
};

const purchaseEight = {
	type: 'premium-gasoline-95',
	date: '01/04/2022',
	supplier: 'Supplier Premium',
	price: 82.50,
	location: '2401 Taft Ave., Manila',
	quantityPurchased: 250,
	quantityDepleted: 0
};

const purchaseNine = {
	type: 'premium-gasoline-97',
	date: '01/01/2022',
	supplier: 'Supplier Premium',
	price: 112.35,
	location: '2401 Taft Ave., Manila',
	quantityPurchased: 250,
	quantityDepleted: 0
};

const purchaseTen = {
	type: 'premium-gasoline-97',
	date: '01/04/2022',
	supplier: 'Supplier Premium',
	price: 150.00,
	location: '2401 Taft Ave., Manila',
	quantityPurchased: 250,
	quantityDepleted: 0
};

/* Insert the initialized purchases into the database. */
db.insertMany(Inventory, [purchaseOne, purchaseTwo, purchaseThree, purchaseFour, purchaseFive, purchaseSix, purchaseSeven, purchaseEight, purchaseNine, purchaseTen], function(flag) {
	if (flag) {
		console.log('\nDatabase population complete! Press Ctrl + C to continue.');
	}
});
