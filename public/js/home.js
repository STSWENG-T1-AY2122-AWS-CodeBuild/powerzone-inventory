/* JavaScript file for handling the front end of the home page */

import {
	isAllowedToEdit,
	updatePrices
} from './home-util.js';

$(function() {
	/* Hide the edit price button if the user is not authorized to edit the prices on the home page. */
	if (!isAllowedToEdit($('#user-role').val())) {
		$('#edit-price-btn').hide();
	}

	/* Submit the form for editing the prices displayed on the home page. */
	$('#edit-price-form').on('submit', function(e) {
		/* Override the default submit behavior and insert AJAX. */
		e.preventDefault();

		$.ajax({
			url: '/postEditPrices',
			method: 'POST',
			data: $('#edit-price-form').serialize(),
			statusCode: {

				/* If the editing is successful, redirect the user to the landing page. */
				200: function() {
					$('#edit-price-modal').modal('hide');
					updatePrices();
				},

				/* Otherwise, display an error message. */
				401: function() {
					alert('Error!');
				}
			}
		});
	});
});
