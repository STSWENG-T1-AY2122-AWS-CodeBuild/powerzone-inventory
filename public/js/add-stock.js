/* JavaScript file for handling the front-end of the add stock page */

$(function() {
	/* Add stock to the inventory. */
	$('#add-stock-form').on('submit', function(e) {
		/* Override the default submit behavior and insert AJAX. */
		e.preventDefault();

		$.ajax({
			url: '/postAddStock',
			method: 'POST',
			data: $('#add-stock-form').serialize(),
			statusCode: {

				/* If the addition is successful, redirect the user to the inventory page. */
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
