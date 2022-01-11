/* Utility object containing functions for processing and formatting the database retrieval results of
 * the log in controller.
 */

/* Bcrypt is used to deal with password hashing. */
const bcrypt = require('bcrypt');

const logInControllerUtil = {
	/**
	 * Checks the password input by the user to determine whether the log in process is successful.
	 *
	 * @param {Express.Request} req  Object that contains information on the HTTP request from the client.
	 * @param {Express.Response} res  Object that contains information on the HTTP response from the server.
	 * @param {Object} result  Object that contains the result of the database retrieval.
	 * @param {string} password	String that contains the password input by the user in the log in page.
	 */
	logInUtil: function(req, res, result, password) {
		bcrypt.compare(password, result.password, function(err, equal) {
			/* If the entered password matches the password stored in the database, open a session for
             * the user.
             */
			if (equal) {
				req.session.username = result.username;
				req.session.role = result.role;

				res.status(200).json('Log in successful');
				res.send();

			/* If the entered password does not match, send an error message. */
			} else {
				res.status(401).json('Incorrect username and/or password');
				res.send();
			}
		});
	}
};

module.exports = logInControllerUtil;
