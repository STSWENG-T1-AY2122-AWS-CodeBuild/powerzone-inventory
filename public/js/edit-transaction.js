import {
	enableButton,
	disableButton
} from './general-util.js';

$(function() {
	$('#edit-transaction-status').val($('#edit-transaction-status-hidden').val());

	const fuelTypes = ['gasoline', 'premium-gasoline-95', 'diesel', 'premium-gasoline-97', 'kerosene'];

	for (const fuelType of fuelTypes) {
		$('#edit-transaction-' + fuelType + '-liters').on('keyup', function() {
			if (parseInt($('#edit-transaction-' + fuelType + '-liters').val()) >
                parseInt($('#edit-transaction-' + fuelType + '-total').val())) {
				alert('>:(');

				disableButton($('#confirm-edit-transaction-btn'));
			} else {
				enableButton($('#confirm-edit-transaction-btn'));
			}
		});
	}
});
