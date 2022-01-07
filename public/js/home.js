/* JavaScript file for handling the front end of the home page */

import {toTwoDecimalPlaces} from './general-util.js';
import {isAllowedToEdit} from './home-util.js';

$(function() {
	if (!isAllowedToEdit($('#user-role').val())) {
		$('#edit-price-btn').hide();
	}

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

	function updatePrices() {
		const fuels = ['gasoline', 'premium-gasoline-95', 'diesel', 'premium-gasoline-97', 'kerosene'];
		for (const fuel of fuels) {
			$('#' + fuel + '-price').text(toTwoDecimalPlaces($('#edit-' + fuel + '-price').val()));
		}
	}
});
