/* Controller for displaying the register page */

/* The db file and account schema are used for the log in page. */
const db = require('../models/db.js');
const Account = require('../models/account-schema.js');

/* Bcrypt is used to deal with password hashing. */
const bcrypt = require('bcrypt');

/* Use ten salt rounds for password hashing. */
const saltRounds = 10;

const registerController = {
	/**
	 * Gets the register page.
	 *
	 * @param {Express.Request} req  Object that contains information on the HTTP request from the client.
	 * @param {Express.Response} res  Object that contains information on the HTTP response from the server.
	 */
	getRegister: function(req, res) {
		if (req.session.username == null) {
			res.render('register');
		} else {
			/* If the user is already logged in, redirect them to the home page. */
			res.redirect('/getHome');
		}
	},

	/**
	 * Registers a new account.
	 *
	 * @param {Express.Request} req  Object that contains information on the HTTP request from the client.
	 * @param {Express.Response} res  Object that contains information on the HTTP response from the server.
	 */
	postRegister: function(req, res) {
		/* Retrieve the account details from the user input. */
		const email = req.body.signupEmail.trim();
		const firstName = req.body.signupFname.trim();
		const lastName = req.body.signupLname.trim();
		const username = req.body.signupUsername.trim();
		const role = req.body.signupRole;
		const password = req.body.signupPassword;
		const confirmPassword = req.body.signupConfirmPassword;

		/* If the entered passwords match, proceed with the account registration. */
		if (JSON.stringify(password) === JSON.stringify(confirmPassword)) {
			/* Hash the password using bcrypt. */
			bcrypt.hash(password, saltRounds, function(err, hash) {
				/* Assign the data to the account variable. New accounts are automatically pending until the
				 * administrator approves their registration.
				 */
				const account = {
					email: email,
					firstName: firstName,
					lastName: lastName,
					username: username,
					role: role,
					password: hash,
					status: 'Pending'
				};

				db.insertOne(Account, account, function(flag) {
					res.status(200).json('Account added successfully.');
					res.send();
				});
			});

		/* If the entered passwords do not match, send an error message. */
		} else {
			res.status(401).json('Passwords do not match.');
			res.send();
		}
	},

	/**
	 * Verifies whether the entered username is unique.
	 *
	 * @param {Express.Request} req  Object that contains information on the HTTP request from the client.
	 * @param {Express.Response} res  Object that contains information on the HTTP response from the server.
	 */
	 getCheckUsername: function(req, res) {
		/* Retrieve the pertinent user input. */
		const username = req.query.username.toLowerCase();

		/* Use the user input as a query. */
		const query = {username: username};

		/* Find the entered username in the database and return the result. */
		db.findOne(Account, query, 'username', function(result) {
			res.send(result);
		});
	},

	/**
	 * Verifies whether the entered email address is unique.
	 *
	 * @param {Express.Request} req  Object that contains information on the HTTP request from the client.
	 * @param {Express.Response} res  Object that contains information on the HTTP response from the server.
	 */
	getCheckEmail: function(req, res) {
		/* Retrieve the pertinent user input. */
		const email = req.query.email.toLowerCase();

		/* Use the user input as a query. */
		const query = {email: email};

		/* Find the entered email address in the database and return the result. */
		db.findOne(Account, query, 'email', function(result) {
			res.send(result);
		});
	},

	/**
	 * Gets the successful registration page.
	 *
	 * @param {Express.Request} req  Object that contains information on the HTTP request from the client.
	 * @param {Express.Response} res  Object that contains information on the HTTP response from the server.
	 */
	getSuccessfulRegistration: function(req, res) {
		res.render('successful-signup');
	}
};

module.exports = registerController;
