/* JavaScript file for handling the front-end of the add stock page */

import {
	enableButton,
	disableButton,
	isBlankField
} from './general-util.js';

$(function() {
	/* Perform client-side validation of all the input fields. */
	$('input').on('keyup change paste', function() {
		let noBlankFields = true;

		$('input').each(function() {
			if (isBlankField($(this), true)) {
				noBlankFields = false;
				disableButton($('#confirm-add-stock-btn'));
			}
		});

		/* Verify that there are no blank input fields. */
		if (noBlankFields) {
			enableButton($('#confirm-add-stock-btn'));
		}
	});

	/* Add stock to the inventory. */
	$('#add-stock-form').on('submit', function(e) {
		/* Override the default submit behavior and insert AJAX. */
		e.preventDefault();

		$.ajax({
			url: '/postAddStock',
			method: 'POST',
			data: $('#add-stock-form').serialize(),
			statusCode: {

				/* If the addition is successful, redirect the user to the inventory page. */
				200: function() {
					location.href = '/getInventory';
				},

				/* Otherwise, display an error message. */
				401: function() {
					alert('Error!');
				}
			}
		});
	});
});
