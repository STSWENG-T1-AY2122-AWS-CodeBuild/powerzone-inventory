/* Controller for displaying the home page */

const homeController = {
	/**
	 * Gets the home page.
	 * 
	 * @param req Object that contains information on the HTTP request from the client.
	 * @param res Object that contains information on the HTTP response from the server.
	 */
	getHome: function(req, res) {
		res.render('home');
	}
}

module.exports = homeController;