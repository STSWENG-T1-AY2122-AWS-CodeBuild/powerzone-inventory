import {
	enableButton,
	disableButton,
	hideErrorMessage,
	displayErrorMessage
} from './general-util.js';

$(function() {
	$('#edit-transaction-status').val($('#edit-transaction-status-hidden').val());

	const fuelTypes = ['gasoline', 'premium-gasoline-95', 'diesel', 'premium-gasoline-97', 'kerosene'];

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

				/* Enable only if there are no errors. */
				let noError = true;
				for (const fuelType of fuelTypes) {
					if (parseInt($('#edit-transaction-' + fuelType + '-liters').val()) >
                		parseInt($('#edit-transaction-' + fuelType + '-total').val())) {
						noError = false;
						break;
					}
				}

				if (noError) {
					enableButton($('#confirm-edit-transaction-btn'));
				}
			}
		});
	}

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
