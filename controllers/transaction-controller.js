/* Controller for displaying the transaction page */

const transactionController = {
	/**
	 * Gets the delivery page.
	 *
	 * @param {Express.Request} req  Object that contains information on the HTTP request from the client.
	 * @param {Express.Response} res  Object that contains information on the HTTP response from the server.
	 */
	getTransaction: function(req, res) {
		res.render('transaction');
	},

	getAddTransaction: function(req, res) {
		res.render('add-transaction');
	},

	getEditTransaction: function(req, res) {
		res.render('edit-transaction');
	},

	getMoreInfoTransaction: function(req, res) {
		res.render('more-info-transaction');
	}
};

module.exports = transactionController;
