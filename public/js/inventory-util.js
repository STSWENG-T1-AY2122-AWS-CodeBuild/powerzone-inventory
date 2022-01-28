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

	filterByUtil(tableId, fuelTypes, dateString, filterDate);
};

/**
 * Utility function for filtering the entries of the inventory table based on the status and
 * the string representation of the purchase date (with the time component reset to 00:00:00
 * to allow comparison between two dates).
 *
 * @param {string} tableId ID of the inventory table.
 * @param {array} fuelTypes Fuel type used for filtering; empty array if no filtering
 * is to be performed based on fuel type.
 * @param {string} dateString String representation of the inventory date used for filtering;
 * empty string if no filtering is to be performed based on date.
 * @param {string} filterDate String representation of the transaction date with the time component
 * reset to 00:00:00 to allow comparison between two dates.
 */
const filterByUtil = function(tableId, fuelTypes, dateString, filterDate) {
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
			const name1 = getName1(rows, i);
			const name2 = getName2(rows, i);

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
			const name1 = getName1(rows, i);
			const name2 = getName2(rows, i);

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
 * Returns the name of the first row between the rows being swapped during table sorting.
 *
 * @param {array} rows Rows in the table being sorted.
 * @param {number} i Index of the first row between the rows being swapped.
 * @return {string} Name of the first row between the rows being swapped.
 */
const getName1 = function(rows, i) {
	return rows[i].getElementsByTagName('td')[0].textContent;
};

/**
 * Returns the name of the second row between the rows being swapped during table sorting.
 *
 * @param {array} rows Rows in the table being sorted.
 * @param {number} i Index of the first row between the rows being swapped.
 * @return {string} Name of the second row between the rows being swapped.
 */
const getName2 = function(rows, i) {
	return rows[i + 1].getElementsByTagName('td')[0].textContent;
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
			const price1 = getPrice1(rows, i);
			const price2 = getPrice2(rows, i);

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
			const price1 = getPrice1(rows, i);
			const price2 = getPrice2(rows, i);

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


/**
 * Returns the price of the first row between the rows being swapped during table sorting.
 *
 * @param {array} rows Rows in the table being sorted.
 * @param {number} i Index of the first row between the rows being swapped.
 * @return {string} Price of the first row between the rows being swapped.
 */
const getPrice1 = function(rows, i) {
	return rows[i].getElementsByTagName('td')[3].textContent.substring(2);
};

/**
 * Returns the price of the second row between the rows being swapped during table sorting.
 *
 * @param {array} rows Rows in the table being sorted.
 * @param {number} i Index of the first row between the rows being swapped.
 * @return {string} Price of the second row between the rows being swapped.
 */
const getPrice2 = function(rows, i) {
	return rows[i + 1].getElementsByTagName('td')[3].textContent.substring(2);
};

export {
	showAll,
	filterBy,
	sortAtoZ,
	sortZtoA,
	sortLowToHigh,
	sortHighToLow
};
