/* JavaScript file for handling the front-end of the edit stock page */

import {
	enableButton,
	disableButton,
	toTwoDecimalPlaces,
	displayErrorMessage,
	hideErrorMessage,
	isBlankField
} from './general-util.js';

$(function() {
	/* Update the selected value in the fuel name dropdown to reflect the value in the database. */
	$('#edit-stock-name').val($('#edit-stock-type').val());

	/* Compute the current fuel quantity as the difference between the purchased and depleted quantities. */
	$('#edit-stock-current-quantity').val(
		parseInt($('#edit-stock-quantity-purchased').val()) - parseInt($('#edit-stock-quantity-depleted').val())
	);

	/* Perform client-side validation of purchased fuel quantity versus available quantity. */
	$('#edit-stock-quantity-purchased').on('keyup change paste', function() {
		const currentQuantity =
			parseInt($('#edit-stock-quantity-purchased').val()) - parseInt($('#edit-stock-quantity-depleted').val());

		if (currentQuantity >= 0) {
			$('#edit-stock-current-quantity').val(currentQuantity);
			hideErrorMessage($('#edit-stock-invalid-amount-quantity'));
		} else if ($('#edit-stock-quantity-purchased').val().length > 0) {
			/* Do not display any error message or adjust current quantity if input is null string. */
			$('#edit-stock-current-quantity').val(0);
			disableButton($('#confirm-edit-stock-btn'));
			displayErrorMessage($('#edit-stock-invalid-amount-quantity'));
		}
	});

	/* Perform client-side validation of all the input fields. */
	$('input').on('keyup change paste', function() {
		let noBlankFields = true;

		$('input').each(function() {
			if (isBlankField($(this), true)) {
				noBlankFields = false;
				disableButton($('#confirm-edit-stock-btn'));
			}
		});

		/*
		 * Verify that there are no blank input fields and the purchased fuel quantity is logically consistent
		 * with the available quantity.
		 */
		if (noBlankFields) {
			const currentQuantity =
				parseInt($('#edit-stock-quantity-purchased').val()) - parseInt($('#edit-stock-quantity-depleted').val());

			if (currentQuantity >= 0) {
				enableButton($('#confirm-edit-stock-btn'));
			}
		}
	});

	/* Display prices with exactly two decimal places. */
	$('.prices').each(function() {
		$(this).val(toTwoDecimalPlaces($(this).val()));
	});

	/* Submit the form for editing the stock details. */
	$('#edit-stock-form').on('submit', function(e) {
		/* Override the default submit behavior and insert AJAX. */
		e.preventDefault();

		$.ajax({
			url: '/postEditStock',
			method: 'POST',
			data: $('#edit-stock-form').serialize(),
			statusCode: {

				/* If the editing is successful, redirect the user to the inventory page. */
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
