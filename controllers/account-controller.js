/* Controller for displaying the account page */

const accountController = {
	/**
	 * Gets the account page.
	 * 
	 * @param req Object that contains information on the HTTP request from the client.
	 * @param res Object that contains information on the HTTP response from the server.
	 */
	getAccount: function(req, res) {
		res.render('account');
	},

	getEditAccount: function(req, res){
		res.render('edit-account');
	}
}

module.exports = accountController;