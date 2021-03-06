/* Controller for displaying the account page */

/* The db file and account schema are used for the account page. */
const db = require('../models/db.js');
const Account = require('../models/account-schema.js');

/* Bcrypt is used to deal with password hashing. */
const bcrypt = require('bcrypt');

/* Use ten salt rounds for password hashing. */
const saltRounds = 10;

/* A utility object is used for auxiliary functions. */
const accountControllerUtil = require('./account-controller-util.js');

const accountController = {
	/**
	 * Gets the account page.
	 *
	 * @param {Express.Request} req  Object that contains information on the HTTP request from the client.
	 * @param {Express.Response} res  Object that contains information on the HTTP response from the server.
	 */
	getAccount: function(req, res) {
		/* Retrieve all details needed for account management if the admin accesses the account tab. */
		if (req.session.role == 'administrator') {
			/* Retrieve the account details visible to the administrator of all accounts. */
			const query = {};
			const projection = '_id firstName lastName username role status';

			db.findMany(Account, query, projection, function(result) {
				res.render('account', accountControllerUtil.accountUtil(result));
			});
		} else {
			/* Retrieve the account details of the logged in user if a regular user accesses the account tab. */
			accountUsername = req.session.username;

			/* Retrieve account details from the database matching the username of the current user. */
			query = {username: accountUsername};
			projection = 'email firstName lastName role password';

			db.findOne(Account, query, projection, function(result) {
				/* Store the retrieved data in local variables. */
				const email = result.email;
				const firstName = result.firstName;
				const lastName = result.lastName;
				const username = req.session.username;
				const role = result.role;
				const password = result.password;

				/* Store the retrieved data in the variable data. */
				const data = {
					email: email,
					firstName: firstName,
					lastName: lastName,
					username: username,
					role: role,
					password: password
				};

				res.render('edit-account', data);
			});
		}
	},

	/**
	 * Updates the status of the selected user account to "Rejected".
	 *
	 * @param {Express.Request} req  Object that contains information on the HTTP request from the client.
	 * @param {Express.Response} res  Object that contains information on the HTTP response from the server.
	 */
	postEditStatusReject: function(req, res) {
		/* Retrieve the ID of the selected account. */
		const accountId = req.body.accountId;

		/* Set the status of the selected account to "Rejected". */
		const update = {status: 'Rejected'};

		/* Convert the retrieved account ID to an ObjectID for database retrieval. */
		const filter = {_id: db.convertToObjectId(accountId)};

		db.updateOne(Account, filter, update, function(flag) {
			res.status(200).json('Status updated successfully!');
			res.send();
		});
	},

	/**
	 * Updates the status of the selected user account to "Pending".
	 *
	 * @param {Express.Request} req  Object that contains information on the HTTP request from the client.
	 * @param {Express.Response} res  Object that contains information on the HTTP response from the server.
	 */
	postEditStatusPending: function(req, res) {
		/* Retrieve the ID of the selected account. */
		const accountId = req.body.accountId;

		/* Set the status of the selected account to "Pending". */
		const update = {status: 'Pending'};

		/* Convert the retrieved account ID to an ObjectID for database retrieval. */
		const filter = {_id: db.convertToObjectId(accountId)};

		db.updateOne(Account, filter, update, function(flag) {
			res.status(200).json('Status updated successfully!');
			res.send();
		});
	},

	/**
	 * Updates the status of the selected user account to "Accepted".
	 *
	 * @param {Express.Request} req  Object that contains information on the HTTP request from the client.
	 * @param {Express.Response} res  Object that contains information on the HTTP response from the server.
	 */
	postEditStatusAccept: function(req, res) {
		/* Retrieve the ID of the selected account. */
		const accountId = req.body.accountId;

		/* Set the status of the selected account to "Accepted". */
		const update = {status: 'Accepted'};

		/* Convert the retrieved account ID to an ObjectID for database retrieval. */
		const filter = {_id: db.convertToObjectId(accountId)};

		db.updateOne(Account, filter, update, function(flag) {
			res.status(200).json('Status updated successfully!');
			res.send();
		});
	},

	/**
	 * Updates the role of the selected user account.
	 *
	 * @param {Express.Request} req  Object that contains information on the HTTP request from the client.
	 * @param {Express.Response} res  Object that contains information on the HTTP response from the server.
	 */
	postEditRole: function(req, res) {
		/* Retrieve the ID and role of the selected account. */
		const accountId = req.body.accountId;
		const accountRole = req.body.editAccountRole;

		/* Set the role of the selected account to the user input. */
		const update = {role: accountRole};

		/* Convert the retrieved account ID to an ObjectID for database retrieval. */
		const filter = {_id: db.convertToObjectId(accountId)};

		db.updateOne(Account, filter, update, function(flag) {
			res.status(200).json('Role updated successfully!');
			res.send();
		});
	},

	/**
	 * Deletes the selected user account from the database.
	 *
	 * @param {Express.Request} req  Object that contains information on the HTTP request from the client.
	 * @param {Express.Response} res  Object that contains information on the HTTP response from the server.
	 */
	postDeleteAccount: function(req, res) {
		/* Retrieve the ID of the selected account. */
		const accountId = req.body.accountId;

		/* Convert the retrieved account ID to an ObjectID for database access. */
		const conditions = {_id: db.convertToObjectId(accountId)};

		db.deleteOne(Account, conditions, function(flag) {
			res.status(200).json('Account deleted successfully!');
			res.send();
		});
	},

	/**
	 * Updates the account details of the current user account.
	 *
	 * @param {Express.Request} req  Object that contains information on the HTTP request from the client.
	 * @param {Express.Response} res  Object that contains information on the HTTP response from the server.
	 */
	postEditAccount: function(req, res) {
		/* Retrieve the updated details of the user account. */
		const email = req.body.editAccountEmail.trim();
		const newUsername = req.body.editAccountUsername.trim();
		const firstName = req.body.editAccountFName.trim();
		const lastName = req.body.editAccountLName.trim();
		const newPassword = req.body.editAccountNewPassword;
		const confirmPassword = req.body.editAccountConfirmPassword;

		/* If the entered passwords match, update the user account details. */
		if (JSON.stringify(newPassword) === JSON.stringify(confirmPassword)) {
			/* Hash the password using bcrypt. */
			bcrypt.hash(newPassword, saltRounds, function(err, hash) {
				/* Assign the new details to the update variable. */
				const update = {
					email: email,
					firstName: firstName,
					lastName: lastName,
					username: newUsername,
					password: hash
				};

				/* Search for the user's account details based on their original username */
				const filter = {username: req.session.username};

				db.updateOne(Account, filter, update, function(flag) {
					res.status(200).json('Account details updated successfully!');
					res.send();
				});
			});

		/* If the entered passwords do not match, send an error message. */
		} else {
			res.status(401).json('Passwords do not match');
			res.send();
		}
	},

	/**
	 * Gets the successful edit page.
	 *
	 * @param {Express.Request} req  Object that contains information on the HTTP request from the client.
	 * @param {Express.Response} res  Object that contains information on the HTTP response from the server.
	 */
	getSuccessfulEdit: function(req, res) {
		res.render('successful-edit');
	},

	/**
	 * Gets the edit account page.
	 *
	 * @param {Express.Request} req  Object that contains information on the HTTP request from the client.
	 * @param {Express.Response} res  Object that contains information on the HTTP response from the server.
	 */
	getEditAccount: function(req, res) {
		res.render('edit-account');
	}
};

module.exports = accountController;
