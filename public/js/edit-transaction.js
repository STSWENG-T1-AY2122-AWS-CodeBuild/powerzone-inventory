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
});
