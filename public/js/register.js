/* JavaScript file for handling the front end of the register page */

$(function() {
	$('#signup-form').on('submit', function(e) {
		/* Override the default submit behavior and insert AJAX. */
		e.preventDefault();
			
		$.ajax({
			url: '/postRegister',
			method: 'POST',
			data: $('#signup-form').serialize(),
			statusCode: {

				/* If the log in is successful, redirect the user to the successful sign up page. */
				200: function() {
					location.href = '/getSuccessfulRegistration';
				},
				
				/* Otherwise, display an error message. */
				401: function() {
					registerError()
				}
			}
		});
	});

	/**
	 * Highlights the erroneous text field and resets the password text field when there is a log in error
	 * concerning the user's input.
	 */
	function registerError() {
		alert("Register error");
	}
});
