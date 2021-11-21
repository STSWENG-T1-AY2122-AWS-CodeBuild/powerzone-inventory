/* Controller for displaying the log in page */

/* The db file is used to display the landing page */
const db = require('../models/db.js');

const logInController = {
	/**
	 * Gets the log in page
	 * 
	 * @param req object that contains information on the HTTP request from the client
	 * @param res object that contains information on the HTTP response from the server 
	 */
	getLogIn: function(req, res) {
		res.render('login');
	}
}

module.exports = logInController;