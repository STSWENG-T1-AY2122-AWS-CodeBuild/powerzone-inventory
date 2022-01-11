/* JavaScript file for handling the front-end of the add transaction page */

import {
	displayErrorMessage,
	hideErrorMessage,
	toTwoDecimalPlaces,
	disableButton,
	enableButton
} from './general-util.js';

import {isValidPhoneNumber} from './transaction-validate-util.js';

$(function() {
	/* Display prices with exactly two decimal places. */
	$('.prices').each(function() {
		$(this).val(toTwoDecimalPlaces($(this).val()));
	});

	/* Validate the phone number. */
	$('#add-transaction-customer-number').on('keyup', function() {
		if (!isValidPhoneNumber($(this).val())) {
			displayErrorMessage($('#add-transaction-invalid-customer-number'));
			disableButton($('#confirm-add-transaction-btn'));
		} else {
			hideErrorMessage($('#add-transaction-invalid-customer-number'));
		}
	});

	/* Check if the fuel quantity entered does not exceed available quantity. */
	const fuelTypes = ['gasoline', 'premium-gasoline-95', 'diesel', 'premium-gasoline-97', 'kerosene'];

	for (const fuelType of fuelTypes) {
		$('#add-transaction-' + fuelType + '-liters').on('keyup', function() {
			if (parseInt($(this).val()) > parseInt($(this).attr('max'))) {
				displayErrorMessage($('#add-transaction-invalid-amount-' + fuelType));
				disableButton($('#confirm-add-transaction-btn'));
			} else {
				hideErrorMessage($('#add-transaction-invalid-amount-' + fuelType));
			}
		});
	}

	/* Perform client-side validation of input fields. */
	$('input').on('keyup', function() {
		/* Enable only if there are no errors. */
		let noError = true;
		for (const fuelType of fuelTypes) {
			if (parseInt($('#add-transaction-' + fuelType + '-liters').val()) >
				parseInt($('#add-transaction-' + fuelType + '-liters').attr('max'))) {
				noError = false;
				break;
			}
		}

		if (noError && isValidPhoneNumber($('#add-transaction-customer-number').val())) {
			enableButton($('#confirm-add-transaction-btn'));
		}
	});

	/* Add the transaction to the database. */
	$('#add-transaction-form').on('submit', function(e) {
		/* Override the default submit behavior and insert AJAX. */
		e.preventDefault();

		$.ajax({
			url: '/postAddTransaction',
			method: 'POST',
			data: $('#add-transaction-form').serialize(),
			statusCode: {

				/* If the editing is successful, redirect the user to the transaction page. */
				200: function() {
					location.href = '/getTransaction';
				},

				/* Otherwise, display an error message. */
				401: function() {
					alert('Error!');
				}
			}
		});
	});
});
