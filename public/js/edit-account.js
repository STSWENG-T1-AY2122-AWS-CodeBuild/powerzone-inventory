/* JavaScript file for handling the front end of the edit account page */

import { extractId } from "./general-util.js";

$(function() {
    $('#edit-account-form').on('submit', function(e) {
		/* Override the default submit behavior and insert AJAX. */
		e.preventDefault();
			
		$.ajax({
			url: '/postEditAccount',
			method: 'POST',
			data: $('#edit-account-form').serialize(),
			statusCode: {

				/* If the editing is successful, log the user out. */
				200: function() {
					location.href = '/getLogOut';
				},
				
				/* Otherwise, display an error message. */
				401: function() {
					alert("Error!");
				}
			}
		});
	});
});
