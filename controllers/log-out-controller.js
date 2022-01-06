/* Controller for logging a user out of the web application */
const logOutController = {

	/**
     * Logs an active user out of the web application
     *
     * @param {Express.Request} req  object that contains information on the HTTP request from the client
     * @param {Express.Response} res  object that contains information on the HTTP response from the server
     */
	getLogOut: function(req, res) {
		/* Destroy the current session and redirect to the landing page */
		req.session.destroy(function(err) {
			if (err) {
				throw err;
			} else {
				req.session = null;
				res.redirect('/');
			}
		});
	}
};

module.exports = logOutController;
