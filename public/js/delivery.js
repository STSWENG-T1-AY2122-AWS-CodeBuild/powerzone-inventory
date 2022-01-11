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
	const transactionTableId = 'transaction-table';
	$('#reset-sort-transaction').on('click', function() {
		$('input').val('');
		$('input').prop('checked', false);

		$('#' + transactionTableId).html($('#' + transactionTableId + '-orig').html());
	});

	/* Perform filtering and/or sorting of entries. */
	$('input').on('change', function() {
		/* Sort first before filtering. */
		if ($('#sort-transaction-customer-name-az').is(':checked')) {
			sortAtoZ(transactionTableId);
		} else if ($('#sort-transaction-customer-name-za').is(':checked')) {
			sortZtoA(transactionTableId);
		} else if ($('#sort-transaction-price-lohi').is(':checked')) {
			sortLowToHigh(transactionTableId);
		} else if ($('#sort-transaction-price-hilo').is(':checked')) {
			sortHighToLow(transactionTableId);
		}

		const statusTypes = ['pending', 'completed', 'cancelled'];
		const selectedStatusTypes = [];

		for (const statusType of statusTypes) {
			if ($('#sort-transaction-' + statusType + '-status').is(':checked')) {
				selectedStatusTypes.push(statusType);
			}
		}

		filterBy(transactionTableId, selectedStatusTypes, $('#transaction-date').val());
	});
});