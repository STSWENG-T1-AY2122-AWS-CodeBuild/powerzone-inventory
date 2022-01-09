import {
	enableButton, 
	disableButton, 
	toTwoDecimalPlaces
} from './general-util.js';

$(function() {
	$('#edit-stock-name').val($('#edit-stock-type').val());

	$('#edit-stock-current-quantity').val(
		parseInt($('#edit-stock-quantity-purchased').val()) - parseInt($('#edit-stock-quantity-depleted').val())
	);

	let keypressTimer;

	$('#edit-stock-quantity-purchased').on('keyup', function() {
		clearTimeout(keypressTimer);

		const currentQuantity = 
			parseInt($('#edit-stock-quantity-purchased').val()) - parseInt($('#edit-stock-quantity-depleted').val());

		if (currentQuantity >= 0) {
			$('#edit-stock-current-quantity').val(currentQuantity);
			enableButton($('#confirm-edit-stock-btn'));
		} else {
			$('#edit-stock-current-quantity').val(0);
			disableButton($('#confirm-edit-stock-btn'));
		}
	});

	$('#edit-stock-quantity-purchased').on('change', function() {
		const currentQuantity = 
			parseInt($('#edit-stock-quantity-purchased').val()) - parseInt($('#edit-stock-quantity-depleted').val());

		if (currentQuantity < 0) {
			$('#edit-stock-quantity-purchased').val(parseInt($('#edit-stock-quantity-depleted').val()));
		} else {
			$('#edit-stock-current-quantity').val(currentQuantity);
		}
	});

	$('.prices').each(function() {
		$(this).val(toTwoDecimalPlaces($(this).val()));
	});

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
