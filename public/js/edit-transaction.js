/* JavaScript file for handling the front-end of the edit transaction page */

import {getFuelTypes} from './constant-util.js';
import {
	enableButton,
	disableButton,
	hideErrorMessage,
	displayErrorMessage
} from './general-util.js';

import {isValidPhoneNumber} from './transaction-validate-util.js';

$(function() {
	/* Update the selected value in the status dropdown to reflect the value in the database. */
	$('#edit-transaction-status').val($('#edit-transaction-status-hidden').val());

	/* Validate the phone number. */
	$('#edit-transaction-customer-number').on('keyup', function() {
		if (!isValidPhoneNumber($(this).val())) {
			displayErrorMessage($('#edit-transaction-invalid-customer-number'));
			disableButton($('#confirm-edit-transaction-btn'));
		} else {
			hideErrorMessage($('#edit-transaction-invalid-customer-number'));
		}
	});

	/* Check if the fuel quantity entered does not exceed available quantity. */
	const fuelTypes = getFuelTypes();
	for (const fuelType of fuelTypes) {
		$('#edit-transaction-' + fuelType + '-liters').on('keyup', function() {
			if (parseInt($('#edit-transaction-' + fuelType + '-liters').val()) < 0) {
				$('#edit-transaction-' + fuelType + '-liters').val(0);
			}

			if (parseInt($('#edit-transaction-' + fuelType + '-liters').val()) >
                parseInt($('#edit-transaction-' + fuelType + '-total').val())) {
				displayErrorMessage($('#edit-transaction-invalid-amount-' + fuelType));
				disableButton($('#confirm-edit-transaction-btn'));
			} else {
				hideErrorMessage($('#edit-transaction-invalid-amount-' + fuelType));
			}
		});
	}

	/* Perform client-side validation of input fields. */
	$('input').on('keyup', function() {
		/* Enable only if there are no errors. */
		let noError = true;
		for (const fuelType of fuelTypes) {
			if (parseInt($('#edit-transaction-' + fuelType + '-liters').val()) >
				parseInt($('#edit-transaction-' + fuelType + '-total').val())) {
				noError = false;
				break;
			}
		}

		if (noError && isValidPhoneNumber($('#edit-transaction-customer-number').val())) {
			enableButton($('#confirm-edit-transaction-btn'));
		}
	});

	/* Submit the form for editing the transaction. */
	$('#edit-transaction-form').on('submit', function(e) {
		/* Override the default submit behavior and insert AJAX. */
		e.preventDefault();

		$.ajax({
			url: '/postEditTransaction',
			method: 'POST',
			data: $('#edit-transaction-form').serialize(),
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
