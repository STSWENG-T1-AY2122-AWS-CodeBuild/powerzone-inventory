/* JavaScript file for handling the front end of the home page */

$(function() {
	$('#edit-price-form').on('submit', function(e) {
		/* Override the default submit behavior and insert AJAX. */
		e.preventDefault();
			
		$.ajax({
			url: '/postEditPrices',
			method: 'POST',
			data: $('#edit-price-form').serialize(),
			statusCode: {

				/* If the editing is successful, redirect the user to the landing page. */
				200: function() {
					location.href = '/getHome';
				},
				
				/* Otherwise, display an error message. */
				401: function() {
					alert("Error!");
				}
			}
		});
	});
});