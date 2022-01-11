/* JavaScript file for handling the front end of the register page */

$(function() {
	/* Submit the form for registering a user account. */
	$('#signup-form').on('submit', function(e) {
		/* Override the default submit behavior and insert AJAX. */
		e.preventDefault();

		$.ajax({
			url: '/postRegister',
			method: 'POST',
			data: $('#signup-form').serialize(),
			statusCode: {

				/* If the registration is successful, redirect the user to the successful registration page. */
				200: function() {
					location.href = '/getSuccessfulRegistration';
				},

				/* Otherwise, launch an alert message. */
				401: function() {
					alert('Register error');
				}
			}
		});
	});
});
