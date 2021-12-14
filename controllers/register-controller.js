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
	 * @param req Object that contains information on the HTTP request from the client.
	 * @param res Object that contains information on the HTTP response from the server.
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
	 * @param req Object that contains information on the HTTP request from the client.
	 * @param res Object that contains information on the HTTP response from the server.
	 */
	postRegister: function(req, res) {

		/* Retrieve the account details from the user input. */
		let email = req.body.signupEmail.trim();
		let firstName = req.body.signupFname.trim();
		let lastName = req.body.signupLname.trim();
		let username = req.body.signupUsername.trim();
		let role = req.body.signupRole;
		let password = req.body.signupPassword;

		/* Hash the password using bcrypt. */
		bcrypt.hash(password, saltRounds, function(err, hash) {

			/* Assign the data to the account variable. */
			let account = {
				email: email,
				firstName: firstName,
				lastName: lastName,
				username: username,
				role: role,
				password: hash,
				status: "Pending"
			}

			db.insertOne(Account, account, function (flag) {
				res.status(200).json("Account added successfully");
				res.send();
			});
		});
	},

	/**
	 * Verifies whether the entered username is unique.
	 * 
	 * @param req Object that contains information on the HTTP request from the client.
	 * @param res Object that contains information on the HTTP response from the server.
	 */
	 getCheckUsername: function(req, res) {

		/* Retrieve the pertinent user input. */
		let username = req.query.username.toLowerCase();

		/* Use the user input as a query. */
		let query = {username: username};
				
		/* Find the entered username in the database and return the result. */
		db.findOne(Account, query, 'username', function(result) {			
			res.send(result);
		});
	},
	
	/**
	 * Verifies whether the entered email address is unique.
	 * 
	 * @param req Object that contains information on the HTTP request from the client.
	 * @param res Object that contains information on the HTTP response from the server.
	 */
	getCheckEmail: function(req, res) {

		/* Retrieve the pertinent user input. */
		let email = req.query.email.toLowerCase();

		/* Use the user input as a query. */
		let query = {email: email};
		
		/* Find the entered email address in the database and return the result. */
		db.findOne(Account, query, 'email', function(result) {			
			res.send(result);
		});
	},

	getSuccessfulRegistration: function(req, res) {
		res.render('successful-signup');
	}
}

module.exports = registerController;