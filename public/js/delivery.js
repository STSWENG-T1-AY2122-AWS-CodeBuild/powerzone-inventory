/* JavaScript file for handling the front-end of the delivery page */

import {extractId} from './general-util.js';
import {
	filterBy,
	sortAtoZ,
	sortZtoA,
	getStatusFromIcon
} from './transaction-util.js';

$(function() {
    /* Update the details in the modal when the edit status button is clicked. */
    $('.edit-delivery-status').on('click', function() {
        const transactionId = extractId($(this).attr('id'));

        $('#edit-delivery-status-form-id').val(transactionId);
        $('#edit-delivery-status-form-status').val(getStatusFromIcon($('#status-img-' + transactionId).attr('src')));
        $('#edit-delivery-status-form-display-id').text($('#id-' + transactionId).text());
        $('#edit-delivery-status-form-customer').text($('#customer-' + transactionId).text());
    });

    /* Display the original transaction table upon reset of filters and sorting. */
	const deliveryTableId = 'delivery-table';
	$('#reset-sort-delivery').on('click', function() {
		$('input').val('');
		$('input').prop('checked', false);

		$('#' + deliveryTableId).html($('#' + deliveryTableId + '-orig').html());
	});

	/* Perform filtering and/or sorting of entries. */
	$('input').on('change', function() {
		/* Sort first before filtering. */
		if ($('#sort-delivery-customer-name-az').is(':checked')) {
			sortAtoZ(deliveryTableId);
		} else if ($('#sort-delivery-customer-name-za').is(':checked')) {
			sortZtoA(deliveryTableId);
		} 

		const statusTypes = ['pending', 'completed', 'cancelled'];
		const selectedStatusTypes = [];

		for (const statusType of statusTypes) {
			if ($('#sort-delivery-' + statusType + '-status').is(':checked')) {
				selectedStatusTypes.push(statusType);
			}
		}

		filterBy(deliveryTableId, selectedStatusTypes, $('#delivery-date').val());
	});

	/* Cancel the delivery. */
	$('#cancel-delivery-btn').on('click', function(e) {
		/* Override the default submit behavior and insert AJAX. */
		const deliveryId = $('#edit-delivery-status-form-id').val();
		e.preventDefault();

		$.ajax({
			url: '/postEditStatusDeliveryCancelled',
			method: 'POST',
			data: $('#edit-delivery-status-form').serialize(),
			statusCode: {

				/* If the cancellation is successful, redirect the user to the delivery page. */
				200: function() {
					$('#status-img-' + deliveryId).attr('src', '/assets/rejected.png');
					$('#edit-delivery-status-modal').modal('hide');

					$('#edit-' + deliveryId).css('pointer-events', 'auto');
				},

				/* Otherwise, display an error message. */
				401: function() {
					alert('Error!');
				}
			}
		});
	});

	/* Pend the delivery. */
	$('#pend-delivery-btn').on('click', function(e) {
		/* Override the default submit behavior and insert AJAX. */
		const deliveryId = $('#edit-delivery-status-form-id').val();
		e.preventDefault();

		$.ajax({
			url: '/postEditStatusDeliveryPending',
			method: 'POST',
			data: $('#edit-delivery-status-form').serialize(),
			statusCode: {

				/* If the status update is successful, redirect the user to the delivery page. */
				200: function() {
					$('#status-img-' + deliveryId).attr('src', '/assets/pending.png');
					$('#edit-delivery-status-modal').modal('hide');

					$('#edit-' + deliveryId).css('pointer-events', 'auto');
				},

				/* Otherwise, display an error message. */
				401: function() {
					alert('Error!');
				}
			}
		});
	});

	/* Complete the delivery. */
	$('#complete-delivery-btn').on('click', function(e) {
		/* Override the default submit behavior and insert AJAX. */
		const deliveryId = $('#edit-delivery-status-form-id').val();
		e.preventDefault();

		$.ajax({
			url: '/postEditStatusDeliveryCompleted',
			method: 'POST',
			data: $('#edit-delivery-status-form').serialize(),
			statusCode: {

				/* If the status update is successful, redirect the user to the delivery page. */
				200: function() {
					$('#status-img-' + deliveryId).attr('src', '/assets/accepted.png');
					$('#edit-delivery-status-modal').modal('hide');

					$('#edit-' + deliveryId).css('pointer-events', 'auto');
				},

				/* Otherwise, display an error message. */
				401: function() {
					alert('Error!');
				}
			}
		});
	});
});
