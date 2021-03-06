/* JavaScript file containing the utility methods for handling the front-end of the transactions page */

/**
 * Converts the file path of the status icon to its equivalent value in the database.
 *
 * @param {string} icon File path of the status icon.
 * @return {string} Equivalent value of the status icon in the database.
 */
const getStatusFromIcon = function(icon) {
	switch (icon) {
		case '/assets/pending.png':
			return 'pending';
		case '/assets/accepted.png':
		case '/assets/completed.png':
			return 'completed';
		case '/assets/rejected.png':
			return 'cancelled';
		default:
			break;
	}
};

/**
 * Displays all the entries of the transactions table.
 *
 * @param {string} tableId ID of the transactions table.
 */
const showAll = function(tableId) {
	$('#' + tableId + ' > tbody > tr').each(function() {
		$(this).show();
	});
};

/**
 * Filters the entries of the transactions table based on the status and the string representation
 * of the transaction date.
 *
 * @param {string} tableId ID of the transactions table.
 * @param {array} statusTypes Statuses used for filtering; empty array if no filtering
 * is to be performed based on status.
 * @param {string} dateString String representation of the transaction date used for filtering;
 * empty string if no filtering is to be performed based on date.
 */
const filterBy = function(tableId, statusTypes, dateString) {
	const filterDate = new Date(dateString);

	/* Set the time component to 0 in preparation for time-agnostic date comparison. */
	filterDate.setHours(0, 0, 0);

	filterByUtil(tableId, statusTypes, dateString, filterDate);
};

/**
 * Utility function for filtering the entries of the transactions table based on the status
 * and the string representation of the transaction date (with the time component reset to 00:00:00
 * to allow comparison between two dates).
 *
 * @param {string} tableId ID of the transactions table.
 * @param {array} statusTypes Statuses used for filtering; empty array if no filtering
 * is to be performed based on status.
 * @param {string} dateString String representation of the transaction date used for filtering;
 * empty string if no filtering is to be performed based on date.
 * @param {string} filterDate String representation of the transaction date with the time component
 * reset to 00:00:00 to allow comparison between two dates.
 */
const filterByUtil = function(tableId, statusTypes, dateString, filterDate) {
	$('#' + tableId + ' > tbody > tr').each(function() {
		if (statusTypes.length == 0 && dateString.length == 0) {
			$(this).show();
		} else if (statusTypes.length > 0 && dateString.length == 0) {
			const statusTypeRow = getStatusFromIcon($(this).find('td:eq(4) img').attr('src'));

			if (statusTypes.indexOf(statusTypeRow) > -1) {
				$(this).show();
			} else {
				$(this).hide();
			}
		} else if (statusTypes.length == 0 && dateString.length > 0) {
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
			const statusTypeRow = getStatusFromIcon($(this).find('td:eq(4) img').attr('src'));
			const dateStringRow = $(this).find('td:eq(1)').text();
			const dateRow = new Date(dateStringRow);

			/* Set the time component to 0 in preparation for time-agnostic date comparison. */
			dateRow.setHours(0, 0, 0);

			if (filterDate.getTime() == dateRow.getTime() && statusTypes.indexOf(statusTypeRow) > -1) {
				$(this).show();
			} else {
				$(this).hide();
			}
		}
	});
};

/**
 * Sorts the entries in the transactions table in alphabetical order based on the customer name.
 *
 * @param {string} tableId ID of the transactions table.
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
 * Sorts the entries in the transactions table in reverse alphabetical order based on the
 * customer name.
 *
 * @param {string} tableId ID of the transactions table.
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
	return rows[i].getElementsByTagName('td')[2].textContent;
};

/**
 * Returns the name of the second row between the rows being swapped during table sorting.
 *
 * @param {array} rows Rows in the table being sorted.
 * @param {number} i Index of the first row between the rows being swapped.
 * @return {string} Name of the second row between the rows being swapped.
 */
const getName2 = function(rows, i) {
	return rows[i + 1].getElementsByTagName('td')[2].textContent;
};

/**
 * Sorts the entries in the transactions table in ascending order based on the price.
 *
 * @param {string} tableId ID of the transactions table.
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
 * Sorts the entries in the transactions table in descending order based on the price.
 *
 * @param {string} tableId ID of the transactions table.
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

/**
 * Returns the discount rate (in percent) and the discounted amount after application
 * of the discount scheme for bulk orders:
 * - 2% discount for orders with gross total of 50,000 L but less than 150,000 L
 * - 5% discount for orders with gross total of 150,000 L and above
 *
 * @param {string} operation Either 'edit' or 'add' depending on whether the transaction entry
 * is already existing in the database.
 * @param {array} fuelTypes Types of fuel recognized by the system.
 * @param {array} discountPercents Discount rates (in percent) in the bulk order discount scheme.
 * @param {array} discountCutoffs Cut-offs (in terms of liters of fuel ordered) in the bulk
 * order discount scheme.
 * @return {array} An array with the first element corresponding to the discount rate
 * and the second element corresponding to the discounted amount.
 */
const getDiscountedAmount = function(operation, fuelTypes, discountPercents, discountCutoffs) {
	let origAmount = 0;
	let discountPercent = 0;
	let totalLiters = 0;

	for (const fuelType of fuelTypes) {
		origAmount += parseInt($('#' + operation + '-transaction-' + fuelType + '-liters').val()) *
						parseFloat($('#' + operation + '-transaction-' + fuelType + '-price').val());
		totalLiters += parseInt($('#' + operation + '-transaction-' + fuelType + '-liters').val());
	}

	if (discountCutoffs[0] <= totalLiters && totalLiters < discountCutoffs[1]) {
		discountPercent = discountPercents[0];
	} else if (discountCutoffs[1] <= totalLiters) {
		discountPercent = discountPercents[1];
	}

	const discountedAmount = (1 - discountPercent) * origAmount;

	return [discountPercent, discountedAmount];
};

export {
	showAll,
	filterBy,
	sortAtoZ,
	sortZtoA,
	sortLowToHigh,
	sortHighToLow,
	getStatusFromIcon,
	getDiscountedAmount
};
