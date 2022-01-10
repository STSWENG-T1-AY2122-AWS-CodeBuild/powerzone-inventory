/* Script for populating the database with a sample delivery */

/* The db file and delivery schema are used to manipulate the transaction entries on the database. */
const db = require('../models/db.js');
const Delivery = require('../models/delivery-schema.js');

/* Establish a connection to the database. */
db.connect();

/* Initialize sample delivery details */
const delivery = {
	id: 20000001,
    date: '01/05/2022',
    customer: 'Shell',
    dropoff: 'LTI Spine Road, Laguna Boulevard',
    status: 'completed',
    number: 9174499876,
    warehouse: '940 Cong. A. Francisco St., Malate',
    manager: 'Manager One',
    driver: 'Driver One'
};

/* Insert the initialized delivery into the database. */
db.insertOne(Delivery, delivery, function(flag) {
	if (flag) {
		console.log('\nDatabase population complete! Press Ctrl + C to continue.');
	}
});
