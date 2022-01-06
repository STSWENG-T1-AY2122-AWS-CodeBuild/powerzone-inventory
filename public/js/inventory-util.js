const showAll = function(tableId) {
	$('#' + tableId + ' > tbody > tr').each(function() {
		$(this).show();
	});
};

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

const sortAtoZ = function(tableId) {
	let stillSorting = true;

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

const sortZtoA = function(tableId) {
	let stillSorting = true;

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

const sortLowToHigh = function(tableId) {
	let stillSorting = true;

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

const sortHighToLow = function(tableId) {
	let stillSorting = true;

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
	sortHighToLow,
};
