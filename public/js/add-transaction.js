/* JavaScript file for handling the front-end of the add transaction page */

import {getFuelTypes} from './constant-util.js';
import {
	displayErrorMessage,
	hideErrorMessage,
	toTwoDecimalPlaces,
	disableButton,
	enableButton,
	isBlankField
} from './general-util.js';

import {isValidPhoneNumber} from './transaction-delivery-validate-util.js';

$(function() {
	/* Display prices with exactly two decimal places. */
	$('.prices').each(function() {
		$(this).val(toTwoDecimalPlaces($(this).val()));
	});

	/* Validate the phone number. */
	$('#add-transaction-customer-number').on('keyup change', function() {
		if (!isValidPhoneNumber($(this).val())) {
			displayErrorMessage($('#add-transaction-invalid-customer-number'));
			disableButton($('#confirm-add-transaction-btn'));
		} else {
			hideErrorMessage($('#add-transaction-invalid-customer-number'));
		}

		/* Hide the error message if no phone number isentered. */
		if ($(this).val() == '') {
			hideErrorMessage($('#add-transaction-invalid-customer-number'));
		}
	});

	/* Check if the fuel quantity entered does not exceed available quantity. */
	const fuelTypes = getFuelTypes();

	for (const fuelType of fuelTypes) {
		$('#add-transaction-' + fuelType + '-liters').on('keyup change', function() {
			if (parseInt($(this).val()) > parseInt($(this).attr('max'))) {
				displayErrorMessage($('#add-transaction-invalid-amount-' + fuelType));
				disableButton($('#confirm-add-transaction-btn'));
			} else {
				hideErrorMessage($('#add-transaction-invalid-amount-' + fuelType));
			}
		});
	}

	/* Perform client-side validation of all the input fields. */
	$('input').on('keyup change', function() {
		let noError = true;
		for (const fuelType of fuelTypes) {
			if (parseInt($('#add-transaction-' + fuelType + '-liters').val()) >
				parseInt($('#add-transaction-' + fuelType + '-liters').attr('max'))) {
				noError = false;
				break;
			}
		}

		$('input').each(function() {
			if (isBlankField($(this), true)) {
				noError = false;
				disableButton($('#confirm-add-transaction-btn'));
			}
		});

		/*
		 * Enable only if there are no blank fields, the phone number is valid, and the fuel quantities entered
		 * are logically consistent with the available quantities.
		 */
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

				/* If the addition is successful, redirect the user to the transaction page. */
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
