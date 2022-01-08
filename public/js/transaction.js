import {
	filterBy,
	sortAtoZ,
	sortZtoA,
	sortLowToHigh,
	sortHighToLow
} from './inventory-util.js';

import {getFuelValue} from './edit-stock-util.js';

import {toTwoDecimalPlaces} from './general-util.js';

$(function() {
	$('.prices').each(function() {
		$(this).text('₱ ' + toTwoDecimalPlaces($(this).text().substring(2)));
	});

	const inventoryTableId = 'inventory-table';

	$('#reset-sort-inventory').on('click', function() {
		$('input').val('');
		$('input').prop('checked', false);

		$('#' + inventoryTableId).html($('#' + inventoryTableId + '-orig').html());
	});

	$('input').on('change', function() {
		/* Sort first before filtering. */
		if ($('#sort-inventory-name-az').is(':checked')) {
			sortAtoZ(inventoryTableId);
		} else if ($('#sort-inventory-name-za').is(':checked')) {
			sortZtoA(inventoryTableId);
		} else if ($('#sort-inventory-price-purchased-lohi').is(':checked')) {
			sortLowToHigh(inventoryTableId);
		} else if ($('#sort-inventory-price-purchased-hilo').is(':checked')) {
			sortHighToLow(inventoryTableId);
		}

		const fuelTypes = ['Gasoline', 'Premium Gasoline 95', 'Diesel', 'Premium Gasoline 97', 'Kerosene'];
		const selectedFuelTypes = [];

		for (const fuelType of fuelTypes) {
			if ($('#sort-inventory-' + getFuelValue(fuelType)).is(':checked')) {
				selectedFuelTypes.push(fuelType);
			}
		}

		filterBy(inventoryTableId, selectedFuelTypes, $('#inventory-purchased-date').val());
	});

    $('#cancel-transaction-btn').on('click', function(e) {
		/* Override the default submit behavior and insert AJAX. */
		const id = $('#edit-account-status-form-id').val();
		e.preventDefault();

		$.ajax({
			url: '/postEditStatusCancelled',
			method: 'POST',
			data: $('#edit-transaction-status-form').serialize(),
			statusCode: {

				/* If the editing is successful, redirect the user to the landing page. */
				200: function() {
					$('#status-img-' + id).attr('src', '/assets/rejected.png');
					$('#edit-transaction-status-modal').modal('hide');
				},

				/* Otherwise, display an error message. */
				401: function() {
					alert('Error!');
				}
			}
		});
	});

    $('#complete-transaction-btn').on('click', function(e) {
		/* Override the default submit behavior and insert AJAX. */
		const id = $('#edit-account-status-form-id').val();
		e.preventDefault();

		$.ajax({
			url: '/postEditStatusCompleted',
			method: 'POST',
			data: $('#edit-transaction-status-form').serialize(),
			statusCode: {

				/* If the editing is successful, redirect the user to the landing page. */
				200: function() {
					$('#status-img-' + id).attr('src', '/assets/accepted.png');
					$('#edit-transaction-status-modal').modal('hide');
				},

				/* Otherwise, display an error message. */
				401: function() {
					alert('Error!');
				}
			}
		});
	});

    $('#pend-transaction-btn').on('click', function(e) {
		/* Override the default submit behavior and insert AJAX. */
		const id = $('#edit-account-status-form-id').val();
		e.preventDefault();

		$.ajax({
			url: '/postEditStatusPending',
			method: 'POST',
			data: $('#edit-transaction-status-form').serialize(),
			statusCode: {

				/* If the editing is successful, redirect the user to the landing page. */
				200: function() {
					$('#status-img-' + id).attr('src', '/assets/pending.png');
					$('#edit-transaction-status-modal').modal('hide');
				},

				/* Otherwise, display an error message. */
				401: function() {
					alert('Error!');
				}
			}
		});
	});
});
