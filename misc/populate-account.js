/* Script for populating the database with the admin account details */

/* Mongoose is used for database functions. */
const mongoose = require('mongoose');

/* The db file and account schema are used to manipulate the accounts on the database. */
const db = require('../models/db.js');
const Account = require('../models/account-schema.js');

/* Bcrypt is used for password hashing. */
const bcrypt = require('bcrypt');

/* Ten salt rounds are used for password hashing. */
const saltRounds = 10;

/* Establish a connection to the database. */
db.connect();

/* Add the admin account to the database. */
bcrypt.hash('password123', saltRounds, function(err, hash) {
	/* Initialize admin account details */
	const adminAccount = {
		email: 'administrator@gmail.com',
		firstName: 'Powerzone',
		lastName: 'Admin',
		username: 'powerzoneadmin',
		role: 'administrator',
		password: hash,
		status: 'Accepted',
	};

	/* Insert the initialized account into the database. */
	db.insertOne(Account, adminAccount, function(flag) {
		if (flag) {
			console.log('\nDatabase population complete! Press Ctrl + C to continue.');
		}
	});
});
