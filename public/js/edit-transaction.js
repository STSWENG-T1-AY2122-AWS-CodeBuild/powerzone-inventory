/* JavaScript file for handling the front-end of the edit transaction page */

import {getFuelTypes} from './constant-util.js';
import {
	enableButton,
	disableButton,
	hideErrorMessage,
	displayErrorMessage,
	isBlankField
} from './general-util.js';

import {isValidPhoneNumber} from './transaction-delivery-validate-util.js';

$(function() {
	/* Update the selected value in the status dropdown to reflect the value in the database. */
	$('#edit-transaction-status').val($('#edit-transaction-status-hidden').val());

	/* Enable button at the start to prevent AJAX lag issues. */
	enableButton($('#confirm-edit-transaction-btn'));

	/* Validate the phone number. */
	$('#edit-transaction-customer-number').on('keyup change paste', function() {
		if (!isValidPhoneNumber($(this).val())) {
			displayErrorMessage($('#edit-transaction-invalid-customer-number'));
			disableButton($('#confirm-edit-transaction-btn'));
		} else {
			hideErrorMessage($('#edit-transaction-invalid-customer-number'));
		}

		/* Hide the error message if no phone number isentered. */
		if ($(this).val() == '') {
			hideErrorMessage($('#edit-transaction-invalid-customer-number'));
		}
	});

	/*
	 * Update the available fuel quantity if transaction status is pending.
	 * The available fuel quantity should be the sum of the current inventory quantity and the quantity
	 * reserved as part of this transaction.
	 */
	const fuelTypes = getFuelTypes();
	if ($('#edit-transaction-status-hidden').val() == 'pending') {
		for (const fuelType of fuelTypes) {
			const inventoryQuantity = parseInt($('#total-' + fuelType + '-error').text());
			const reservedQuantity = parseInt($('#edit-transaction-' + fuelType + '-liters-old').val());
			$('#total-' + fuelType + '-error').text(inventoryQuantity + reservedQuantity);
		}
	}

	/* Check if the fuel quantity entered does not exceed available quantity. */
	for (const fuelType of fuelTypes) {
		$('#edit-transaction-' + fuelType + '-liters').on('keyup change paste', function() {
			if (parseInt($('#edit-transaction-' + fuelType + '-liters').val()) < 0) {
				$('#edit-transaction-' + fuelType + '-liters').val(0);
			}

			if (parseInt($('#edit-transaction-' + fuelType + '-liters').val()) -
				parseInt($('#edit-transaction-' + fuelType + '-liters-orig').val()) >
                parseInt($('#edit-transaction-' + fuelType + '-total').val())) {
				displayErrorMessage($('#edit-transaction-invalid-amount-' + fuelType));
				disableButton($('#confirm-edit-transaction-btn'));
			} else {
				hideErrorMessage($('#edit-transaction-invalid-amount-' + fuelType));
			}
		});
	}

	/* Disable status toggling if the inventory supplies are insufficient. */
	let canPend = true;
	for (const fuelType of fuelTypes) {
		if (parseInt($('#edit-transaction-' + fuelType + '-liters').val()) >
			parseInt($('#edit-transaction-' + fuelType + '-liters-orig').val()) >
			parseInt($('#edit-transaction-' + fuelType + '-total').val())) {
			canPend = false;
			break;
		}
	}

	if (!canPend) {
		$('#edit-transaction-status option[value = "pending"]').remove();
	}

	/* Perform client-side validation of all the input fields. */
	$('input').on('keyup change paste', function() {
		let noError = true;
		for (const fuelType of fuelTypes) {
			if (parseInt($('#edit-transaction-' + fuelType + '-liters').val()) >
				parseInt($('#edit-transaction-' + fuelType + '-liters-orig').val()) >
				parseInt($('#edit-transaction-' + fuelType + '-total').val())) {
				noError = false;
				break;
			}
		}

		$('input').each(function() {
			if (isBlankField($(this), true)) {
				noError = false;
				disableButton($('#confirm-edit-transaction-btn'));
			}
		});

		/*
		 * Enable only if there are no blank fields, the phone number is valid, and the fuel quantities entered
		 * are logically consistent with the available quantities.
		 */
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
