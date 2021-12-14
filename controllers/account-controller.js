/* Controller for displaying the account page */

/* The db file and account schema are used for the account page. */
const db = require('../models/db.js');
const Account = require('../models/account-schema.js');

const accountController = {
	/**
	 * Gets the account page.
	 * 
	 * @param req Object that contains information on the HTTP request from the client.
	 * @param res Object that contains information on the HTTP response from the server.
	 */
	getAccount: function(req, res) {
		/* Retrieve all details needed for account management if the admin accesses the account tab. */
		if (req.session.username == "powerzoneadmin") {
			
			/* Retrieve the account details visible to the administrator of all accounts. */
			let query = {};
			let projection = '_id name username role status';

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
			res.render('account');
		}		
	},

	getEditAccount: function(req, res){
		res.render('edit-account');
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
	}
}

module.exports = accountController;