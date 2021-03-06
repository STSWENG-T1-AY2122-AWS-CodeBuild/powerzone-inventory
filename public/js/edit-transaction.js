/* JavaScript file for handling the front-end of the edit transaction page */

import {
	getDiscountCutOffs,
	getDiscountPercents,
	getFuelTypes
} from './constant-util.js';

import {
	enableButton,
	disableButton,
	hideErrorMessage,
	displayErrorMessage,
	isBlankField,
	toTwoDecimalPlaces
} from './general-util.js';

import {getDiscountedAmount} from './transaction-delivery-util.js';

import {isValidPhoneNumber} from './transaction-delivery-validate-util.js';

$(function() {
	const fuelTypes = getFuelTypes();

	/* Update the selected value in the status dropdown to reflect the value in the database. */
	$('#edit-transaction-status').val($('#edit-transaction-status-hidden').val());

	/* Properly compute the discounted amount when the page is loaded. */
	const discountInfo = getDiscountedAmount('edit', fuelTypes, getDiscountPercents(), getDiscountCutOffs());
	$('#discount-percent').text(discountInfo[0] * 100);
	$('#edit-transaction-discounted').val(toTwoDecimalPlaces(discountInfo[1]));

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
	if ($('#edit-transaction-status-hidden').val() == 'pending') {
		for (const fuelType of fuelTypes) {
			const inventoryQuantity = parseInt($('#total-' + fuelType + '-error').text());
			const reservedQuantity = parseInt($('#edit-transaction-' + fuelType + '-liters-old').val());
			$('#total-' + fuelType + '-error').text(inventoryQuantity + reservedQuantity);
		}
	}

	/**
	 * Checks if there is sufficient fuel in the inventory to perform the transaction.
	 *
	 * @param {String} fuelType Fuel type in the transaction.
	 * @return {boolean} true if there is sufficient fuel to perform the transaction; false, otherwise.
	 */
	function isSufficientFuel(fuelType) {
		return parseInt($('#edit-transaction-' + fuelType + '-liters').val()) -
			parseInt($('#edit-transaction-' + fuelType + '-liters-orig').val()) <=
			parseInt($('#edit-transaction-' + fuelType + '-total').val());
	}

	/* Check if the fuel quantity entered does not exceed available quantity. */
	for (const fuelType of fuelTypes) {
		$('#edit-transaction-' + fuelType + '-liters').on('keyup change paste', function() {
			if (parseInt($('#edit-transaction-' + fuelType + '-liters').val()) < 0) {
				$('#edit-transaction-' + fuelType + '-liters').val(0);
			}

			if (!isSufficientFuel(fuelType) && !isBlankField($('#edit-transaction-' + fuelType + '-liters'), true)) {
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
		if (!isSufficientFuel(fuelType)) {
			canPend = false;
			break;
		}
	}

	if (!canPend && $('#edit-transaction-status').val() == 'cancelled') {
		$('#edit-transaction-status option[value = "pending"]').remove();
	}

	/* Perform client-side validation of all the input fields. */
	$('input').on('keyup change paste', function() {
		let noError = true;
		for (const fuelType of fuelTypes) {
			if (!isSufficientFuel(fuelType)) {
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
			const discountInfo = getDiscountedAmount('edit', fuelTypes, getDiscountPercents(), getDiscountCutOffs());

			$('#discount-percent').text(discountInfo[0] * 100);
			$('#edit-transaction-discounted').val(toTwoDecimalPlaces(discountInfo[1]));
		} else {
			$('#discount-percent').text(0);
			$('#edit-transaction-discounted').val('0.00');
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
