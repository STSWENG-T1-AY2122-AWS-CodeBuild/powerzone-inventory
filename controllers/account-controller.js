/* Controller for displaying the account page */

/* The db file and account schema are used for the account page. */
const db = require('../models/db.js');
const Account = require('../models/account-schema.js');

/* Bcrypt is used to deal with password hashing. */
const bcrypt = require('bcrypt');

/* Use ten salt rounds for password hashing. */
const saltRounds = 10;

const accountController = {
	/**
	 * Gets the account page.
	 * 
	 * @param req Object that contains information on the HTTP request from the client.
	 * @param res Object that contains information on the HTTP response from the server.
	 */
	getAccount: function(req, res) {
		/* Retrieve all details needed for account management if the admin accesses the account tab. */
		if (req.session.role == "administrator") {
			
			/* Retrieve the account details visible to the administrator of all accounts. */
			let query = {};
			let projection = '_id firstName lastName username role status';

			db.findMany(Account, query, projection, function(result) {
				/* Assign the result of the database retrieval to the variable accounts. */
				let accounts = result;

				/* For each account, push its details to the array array if the account
				 * does not belong to the administrator. 
				 */
				let accountDetails = [];
				for (let i = 0; i < accounts.length; i++) {
					if (accounts[i].role != "administrator") {
						accountDetails.push(accounts[i]);
					}
				}

				/* Store the retrieved account details in the variable data. */
				let data = {
					accountDetails: accountDetails
				}

				res.render('account', data);
			});
		} else {
			/* Retrieve the account details of the logged in user if a regular user accesses the account tab. */
			accountUsername = req.session.username;

			/* Retrieve account details from the database matching the username of the current user. */
			query = {username: accountUsername};
			projection = 'email firstName lastName role password';

			db.findOne(Account, query, projection, function(result) {
				/* Store the retrieved data in local variables. */
				let email = result.email;
				let firstName = result.firstName;
				let lastName = result.lastName;
				let username = req.session.username;
				let role = result.role;
				let password = result.password;

				/* Store the retrieved data in the variable data. */
				let data = {
					email: email,
					firstName: firstName,
					lastName: lastName,
					username: username,
					role: role,
					password: password
				}

				res.render('edit-account', data);
			});
		}		
	},

	/**
	 * Updates the status of the selected user account to "Rejected".
	 * 
	 * @param req Object that contains information on the HTTP request from the client.
	 * @param res Object that contains information on the HTTP response from the server.
	 */
	postEditStatusReject: function(req, res) {
		/* Retrieve the ID of the selected account. */
		let accountId = req.body.accountId;
		
		/* Set the status of the selected account to "Rejected". */
		let update = {status: "Rejected"};

		/* Convert the retrieved account ID to an ObjectID for database retrieval. */
		let filter = {_id: db.convertToObjectId(accountId)};

		db.updateOne(Account, filter, update, function(flag) {
			res.status(200).json("Status updated successfully!");
			res.send();
		});
	},

	/**
	 * Updates the status of the selected user account to "Pending".
	 * 
	 * @param req Object that contains information on the HTTP request from the client.
	 * @param res Object that contains information on the HTTP response from the server.
	 */
	 postEditStatusPending: function(req, res) {
		/* Retrieve the ID of the selected account. */
		let accountId = req.body.accountId;
		
		/* Set the status of the selected account to "Pending". */
		let update = {status: "Pending"};

		/* Convert the retrieved account ID to an ObjectID for database retrieval. */
		let filter = {_id: db.convertToObjectId(accountId)};

		db.updateOne(Account, filter, update, function(flag) {
			res.status(200).json("Status updated successfully!");
			res.send();
		});
	},

	/**
	 * Updates the status of the selected user account to "Accepted".
	 * 
	 * @param req Object that contains information on the HTTP request from the client.
	 * @param res Object that contains information on the HTTP response from the server.
	 */
	 postEditStatusAccept: function(req, res) {
		/* Retrieve the ID of the selected account. */
		let accountId = req.body.accountId;
		
		/* Set the status of the selected account to "Accepted". */
		let update = {status: "Accepted"};

		/* Convert the retrieved account ID to an ObjectID for database retrieval. */
		let filter = {_id: db.convertToObjectId(accountId)};

		db.updateOne(Account, filter, update, function(flag) {
			res.status(200).json("Status updated successfully!");
			res.send();
		});
	},

	/**
	 * Updates the role of the selected user account.
	 * 
	 * @param req Object that contains information on the HTTP request from the client.
	 * @param res Object that contains information on the HTTP response from the server.
	 */
	 postEditRole: function(req, res) {
		/* Retrieve the ID and role of the selected account. */
		let accountId = req.body.accountId;
		let accountRole = req.body.editAccountRole;
		
		/* Set the role of the selected account to the user input. */
		let update = {role: accountRole};

		/* Convert the retrieved account ID to an ObjectID for database retrieval. */
		let filter = {_id: db.convertToObjectId(accountId)};

		db.updateOne(Account, filter, update, function(flag) {
			res.status(200).json("Role updated successfully!");
			res.send();
		});
	},

	/**
	 * Deletes the selected user account from the database.
	 * 
	 * @param req Object that contains information on the HTTP request from the client.
	 * @param res Object that contains information on the HTTP response from the server.
	 */
	 postDeleteAccount: function(req, res) {
		/* Retrieve the ID of the selected account. */
		let accountId = req.body.accountId;

		/* Convert the retrieved account ID to an ObjectID for database access. */
		let conditions = {_id: db.convertToObjectId(accountId)};

		db.deleteOne(Account, conditions, function(flag) {
			res.status(200).json("Account deleted successfully!");
			res.send();
		});
	},

	/**
	 * Updates the account details of the current user account.
	 * 
	 * @param req Object that contains information on the HTTP request from the client.
	 * @param res Object that contains information on the HTTP response from the server.
	 */
	 postEditAccount: function(req, res) {
		/* Retrieve the updated details of the user account. */
		let email = req.body.editAccountEmail.trim();
		let newUsername = req.body.editAccountUsername.trim();
		let firstName = req.body.editAccountFName.trim();
		let lastName = req.body.editAccountLName.trim();
		let newPassword = req.body.editAccountNewPassword;
		let confirmPassword = req.body.editAccountConfirmPassword;
		
		/* If the entered passwords match, update the user account details. */
		if (JSON.stringify(newPassword) === JSON.stringify(confirmPassword)) {

			/* Hash the password using bcrypt. */
			bcrypt.hash(newPassword, saltRounds, function(err, hash) {
				
				/* Assign the new details to the update variable. */
				let update = {
					email: email,
					firstName: firstName,
					lastName: lastName,
					username: newUsername,
					password: hash,
				}

				/* Search for the user's account details based on their original username */
				let filter = {username: req.session.username};

				db.updateOne(Account, filter, update, function(flag) {
					res.status(200).json("Account details updated successfully!");
					res.send();
				});
			});

		/* If the entered passwords do not match, send an error message. */	
		} else {
			res.status(401).json("Passwords do not match");
			res.send();
		}
	},

	/**
	 * Gets the successful edit page.
	 * 
	 * @param req Object that contains information on the HTTP request from the client.
	 * @param res Object that contains information on the HTTP response from the server.
	 */
	getSuccessfulEdit: function(req, res) {
		res.render('successful-edit');
	}
}

module.exports = accountController;