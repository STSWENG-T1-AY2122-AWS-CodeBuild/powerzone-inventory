import {toTwoDecimalPlaces} from './general-util.js';

$(function() {
	$('.prices').each(function() {
		$(this).val(toTwoDecimalPlaces($(this).val()));
	});

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
