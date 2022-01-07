/* JavaScript file for handling the front end of the log in page */

import {displayErrorMessage} from './general-util.js';

$(function() {
	$('#login-form').on('submit', function(e) {
		/* Override the default submit behavior and insert AJAX. */
		e.preventDefault();

		$.ajax({
			url: '/postLogIn',
			method: 'POST',
			data: $('#login-form').serialize(),
			statusCode: {

				/* If the log in is successful, redirect the user to the landing page. */
				200: function() {
					location.href = '/getHome';
				},

				/* Otherwise, display an error message. */
				401: function() {
					logInError();
				}
			}
		});
	});

	/**
	 * Highlights the erroneous text field and resets the password text field when there is a log in error
	 * concerning the user's input.
	 */
	function logInError() {
		displayErrorMessage($('#invalid-login'));
		$('#login-password').val('');
	}
});
