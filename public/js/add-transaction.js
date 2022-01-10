import {
	displayErrorMessage,
	hideErrorMessage,
	toTwoDecimalPlaces,
	disableButton,
	enableButton
} from './general-util.js';

$(function() {
	$('.prices').each(function() {
		$(this).val(toTwoDecimalPlaces($(this).val()));
	});

	const fuelTypes = ['gasoline', 'premium-gasoline-95', 'diesel', 'premium-gasoline-97', 'kerosene'];

	for (const fuelType of fuelTypes) {
		$('#add-transaction-' + fuelType + '-liters').on('keyup', function() {
			if (parseInt($(this).val()) > parseInt($(this).attr('max'))) {
				displayErrorMessage($('#add-transaction-invalid-amount-' + fuelType));
				disableButton($('#confirm-add-transaction-btn'));
			} else {
				hideErrorMessage($('#add-transaction-invalid-amount-' + fuelType));

				/* Enable only if there are no errors. */
				let noError = true;
				for (const fuelType of fuelTypes) {
					if (parseInt($('#add-transaction-' + fuelType + '-liters').val()) >
						parseInt($('#add-transaction-' + fuelType + '-liters').attr('max'))) {
						noError = false;
						break;
					}
				}

				if (noError) {
					enableButton($('#confirm-add-transaction-btn'));
				}
			}
		});
	}


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
