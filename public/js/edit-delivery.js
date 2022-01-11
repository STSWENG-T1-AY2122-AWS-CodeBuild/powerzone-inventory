/* JavaScript file for handling the front-end of the edit delivery page */

$(function() {
	/* Submit the form for editing the delivery details. */
	$('#edit-delivery-form').on('submit', function(e) {
		/* Override the default submit behavior and insert AJAX. */
		e.preventDefault();

		$.ajax({
			url: '/postEditDelivery',
			method: 'POST',
			data: $('#edit-delivery-form').serialize(),
			statusCode: {

				/* If the editing is successful, redirect the user to the delivery page. */
				200: function() {
					location.href = '/getDelivery';
				},

				/* Otherwise, display an error message. */
				401: function() {
					alert('Error!');
				}
			}
		});
	});
});