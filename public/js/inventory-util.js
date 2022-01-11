/* JavaScript file containing the utility methods for handling the front-end of the inventory page */

/**
 * Displays all the entries of the inventory table.
 *
 * @param {string} tableId ID of the inventory table.
 */
const showAll = function(tableId) {
	$('#' + tableId + ' > tbody > tr').each(function() {
		$(this).show();
	});
};

/**
 * Filters the entries of the inventory table based on the status and the string representation
 * of the purchase date.
 *
 * @param {string} tableId ID of the inventory table.
 * @param {array} fuelTypes Fuel type used for filtering; empty array if no filtering
 * is to be performed based on fuel type.
 * @param {string} dateString String representation of the inventory date used for filtering;
 * empty string if no filtering is to be performed based on date.
 */
const filterBy = function(tableId, fuelTypes, dateString) {
	const filterDate = new Date(dateString);

	/* Set the time component to 0 in preparation for time-agnostic date comparison. */
	filterDate.setHours(0, 0, 0);

	$('#' + tableId + ' > tbody > tr').each(function() {
		if (fuelTypes.length == 0 && dateString.length == 0) {
			$(this).show();
		} else if (fuelTypes.length > 0 && dateString.length == 0) {
			const fuelTypeRow = $(this).find('td:eq(0)').text();

			if (fuelTypes.indexOf(fuelTypeRow) > -1) {
				$(this).show();
			} else {
				$(this).hide();
			}
		} else if (fuelTypes.length == 0 && dateString.length > 0) {
			const dateStringRow = $(this).find('td:eq(1)').text();
			const dateRow = new Date(dateStringRow);

			/* Set the time component to 0 in preparation for time-agnostic date comparison. */
			dateRow.setHours(0, 0, 0);

			if (filterDate.getTime() == dateRow.getTime()) {
				$(this).show();
			} else {
				$(this).hide();
			}
		} else {
			const fuelTypeRow = $(this).find('td:eq(0)').text();
			const dateStringRow = $(this).find('td:eq(1)').text();
			const dateRow = new Date(dateStringRow);

			/* Set the time component to 0 in preparation for time-agnostic date comparison. */
			dateRow.setHours(0, 0, 0);

			if (filterDate.getTime() == dateRow.getTime() && fuelTypes.indexOf(fuelTypeRow) > -1) {
				$(this).show();
			} else {
				$(this).hide();
			}
		}
	});
};

/**
 * Sorts the entries in the inventory table in alphabetical order based on the fuel type.
 *
 * @param {string} tableId ID of the inventory table.
 */
const sortAtoZ = function(tableId) {
	let stillSorting = true;

	/* Follow a bubble sort-type sorting algorithm. */
	while (stillSorting) {
		const rows = $('#' + tableId + ' > tbody > tr');
		stillSorting = false;
		let swap;
		let i;

		for (i = 0; i < rows.length - 1; i++) {
			swap = false;
			const name1 = rows[i].getElementsByTagName('td')[0].textContent;
			const name2 = rows[i + 1].getElementsByTagName('td')[0].textContent;

			if (name1 > name2) {
				swap = true;
				break;
			}
		}

		if (swap) {
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			stillSorting = true;
		}
	}
};

/**
 * Sorts the entries in the inventory table in reverse alphabetical order based on the fuel type.
 *
 * @param {string} tableId ID of the inventory table.
 */
const sortZtoA = function(tableId) {
	let stillSorting = true;

	/* Follow a bubble sort-type sorting algorithm. */
	while (stillSorting) {
		const rows = $('#' + tableId + ' > tbody > tr');
		stillSorting = false;
		let swap;
		let i;

		for (i = 0; i < rows.length - 1; i++) {
			swap = false;
			const name1 = rows[i].getElementsByTagName('td')[0].textContent;
			const name2 = rows[i + 1].getElementsByTagName('td')[0].textContent;

			if (name1 < name2) {
				swap = true;
				break;
			}
		}

		if (swap) {
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			stillSorting = true;
		}
	}
};

/**
 * Sorts the entries in the inventory table in ascending order based on the price.
 *
 * @param {string} tableId ID of the inventory table.
 */
const sortLowToHigh = function(tableId) {
	let stillSorting = true;

	/* Follow a bubble sort-type sorting algorithm. */
	while (stillSorting) {
		const rows = $('#' + tableId + ' > tbody > tr');
		stillSorting = false;
		let swap;
		let i;

		for (i = 0; i < rows.length - 1; i++) {
			swap = false;

			/* Ignore the peso sign and the space after the peso sign. */
			const price1 = rows[i].getElementsByTagName('td')[3].textContent.substring(2);
			const price2 = rows[i + 1].getElementsByTagName('td')[3].textContent.substring(2);

			if (parseInt(price1) > parseInt(price2)) {
				swap = true;
				break;
			}
		}

		if (swap) {
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			stillSorting = true;
		}
	}
};

/**
 * Sorts the entries in the inventory table in descending order based on the price.
 *
 * @param {string} tableId ID of the inventory table.
 */
const sortHighToLow = function(tableId) {
	let stillSorting = true;

	/* Follow a bubble sort-type sorting algorithm. */
	while (stillSorting) {
		const rows = $('#' + tableId + ' > tbody > tr');
		stillSorting = false;
		let swap;
		let i;

		for (i = 0; i < rows.length - 1; i++) {
			swap = false;

			/* Ignore the peso sign and the space after the peso sign. */
			const price1 = rows[i].getElementsByTagName('td')[3].textContent.substring(2);
			const price2 = rows[i + 1].getElementsByTagName('td')[3].textContent.substring(2);

			if (parseInt(price1) < parseInt(price2)) {
				swap = true;
				break;
			}
		}

		if (swap) {
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			stillSorting = true;
		}
	}
};

export {
	showAll,
	filterBy,
	sortAtoZ,
	sortZtoA,
	sortLowToHigh,
	sortHighToLow
};
