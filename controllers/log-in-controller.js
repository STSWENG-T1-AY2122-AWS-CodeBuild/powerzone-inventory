/* Controller for displaying the log in page */

/* The db file and account schema are used for the log in page */
const db = require('../models/db.js');
const Account = require('../models/account-schema.js');

/* Bcrypt is used to deal with password hashing */
const bcrypt = require('bcrypt');

const logInController = {
	/**
	 * Gets the log in page
	 * 
	 * @param req object that contains information on the HTTP request from the client
	 * @param res object that contains information on the HTTP response from the server 
	 */
	getLogIn: function(req, res) {
		res.render('login');
	},

	/**
	 * Logs a user into the application
	 * 
	 * @param req object that contains information on the HTTP request from the client
	 * @param res object that contains information on the HTTP response from the server 
	 */
	 postLogIn: function(req, res) {

		/* Retrieve the username and password from the user input */
		let username = req.body.loginUsername.trim();
		let password = req.body.loginPassword;

		/* Use the input username for the database query */
		let query = {username: username};

		/* Retrieve the user's corresponding data from the database */
		db.findOne(Account, query, '', function(result) {
			if (result) {
				let userDetails = {
					email: result.email,
					name: result.name,
					username: result.username,
					role: result.role,
					password: result.password
				}

				/* If the entered password matches the password stored in the database, open a session for 
                 * the user
                 */
				bcrypt.compare(password, result.password, function (err, equal) {
					if (equal) {
					//	req.session.username = result.username;
					//	req.session.role = result.role;

						res.status(200).json("Log in successful");
						res.send();

					/* If the entered password does not match, send an error message */
					} else {
						res.status(401).json("Passwords do not match");
						res.send();
					}
				});
			
			/* If the database retrieval is not successful, send an error message */
			} else {
				res.status(401).json("Database retrieval is not successful");
				res.send();
			}
		});
	}
}

module.exports = logInController;