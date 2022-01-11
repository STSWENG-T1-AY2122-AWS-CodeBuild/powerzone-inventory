/* JavaScript file for handling the front-end of the inventory page */

import {
	filterBy,
	sortAtoZ,
	sortZtoA,
	sortLowToHigh,
	sortHighToLow
} from './inventory-util.js';

import {getFuelValue} from './edit-stock-util.js';
import {toTwoDecimalPlaces} from './general-util.js';
import {getFuelTypeNames} from './constant-util.js';

$(function() {
	/* Display prices with exactly two decimal places. */
	$('.prices').each(function() {
		$(this).text('₱ ' + toTwoDecimalPlaces($(this).text().substring(2)));
	});

	/* Display the original inventory table upon reset of filters and sorting. */
	const inventoryTableId = 'inventory-table';
	$('#reset-sort-inventory').on('click', function() {
		$('input').val('');
		$('input').prop('checked', false);

		$('#' + inventoryTableId).html($('#' + inventoryTableId + '-orig').html());
	});

	/* Perform filtering and/or sorting of entries. */
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

		const fuelTypes = getFuelTypeNames();
		const selectedFuelTypes = [];

		for (const fuelType of fuelTypes) {
			if ($('#sort-inventory-' + getFuelValue(fuelType)).is(':checked')) {
				selectedFuelTypes.push(fuelType);
			}
		}

		filterBy(inventoryTableId, selectedFuelTypes, $('#inventory-purchased-date').val());
	});
});
