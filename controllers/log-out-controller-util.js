/* Utility object containing functions for handling the HTTP request and response elements of the 
 * log out controller.
 */
const logOutUtilControllerUtil = {
	/**
	 * Logs the user out of the application.
	 *
	 * @param {Express.Request} req  Object that contains information on the HTTP request from the client.
	 * @param {Express.Response} res  Object that contains information on the HTTP response from the server.
	 */
	logOutUtil: function(req, res) {
		/* Remove the user's credentials from the HTTP request object. */
		req.session = null;

		/* Redirect the user to the index page (i.e., the log in page). */
		res.redirect('/');
	}
};

module.exports = logOutUtilControllerUtil;
