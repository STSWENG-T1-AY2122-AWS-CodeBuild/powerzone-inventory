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
	}
}

module.exports = accountController;