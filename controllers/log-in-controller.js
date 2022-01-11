/* Controller for displaying the log in page */

/* The db file and account schema are used for the log in page. */
const db = require('../models/db.js');
const Account = require('../models/account-schema.js');

const logInControllerUtil = require('./log-in-controller-util.js');

const logInController = {
	/**
	 * Gets the log in page.
	 *
	 * @param {Express.Request} req  Object that contains information on the HTTP request from the client.
	 * @param {Express.Response} res  Object that contains information on the HTTP response from the server.
	 */
	getLogIn: function(req, res) {
		if (req.session.username == null) {
			res.render('log-in');
		} else {
			/* If the user is already logged in, redirect them to the home page. */
			res.redirect('/getHome');
		}
	},

	/**
	 * Logs a user into the application.
	 *
	 * @param {Express.Request} req  Object that contains information on the HTTP request from the client.
	 * @param {Express.Response} res  Object that contains information on the HTTP response from the server.
	 */
	postLogIn: function(req, res) {
		/* Retrieve the username and password from the user input. */
		const username = req.body.loginUsername.trim();
		const password = req.body.loginPassword;

		/* Use the input username for the database query. */
		const query = {username: username};

		/* Retrieve the user's corresponding data from the database. */
		db.findOne(Account, query, '', function(result) {
			if (result) {
				const userDetails = {
					email: result.email,
					name: result.name,
					username: result.username,
					role: result.role,
					password: result.password,
					status: result.status
				};

				/* If the user account has been accepted, proceed to checking their log in credentials. */
				if (userDetails.status == 'Accepted') {
					logInControllerUtil.logInUtil(req, res, result, password);
				} else {
					res.status(401).json('Account not accepted');
					res.send();
				}

			/* If the entered username is not in the database, send an error message. */
			} else {
				res.status(401).json('Incorrect username and/or password');
				res.send();
			}
		});
	}
};

module.exports = logInController;
