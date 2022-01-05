const showAll = function(tableId) {
    $('#' + tableId + ' > tbody > tr').each(function() {
        $(this).show();
    });
}

const sortByFuelType = function(tableId, fuelTypes) {
    $('#' + tableId + ' > tbody > tr').each(function() {
        if (fuelTypes.length == 0) {
            $(this).show()
        } else {
            const fuelTypeRow = $(this).find('td:eq(0)').text();
            
            if (fuelTypes.indexOf(fuelTypeRow) > -1 && $(this).is(':visible')) {
                $(this).show();
            } else {
                $(this).hide();
            }
        }
    });
}

const filterByDate = function(tableId, dateString) {
    const filterDate = new Date(dateString);

    /* Set the time component to 0 in preparation for time-agnostic date comparison. */
    filterDate.setHours(0, 0, 0);

    $('#' + tableId + ' > tbody > tr').each(function() {
        const dateStringRow = $(this).find('td:eq(1)').text();
        const dateRow = new Date(dateStringRow);

        /* Set the time component to 0 in preparation for time-agnostic date comparison. */
        dateRow.setHours(0, 0, 0);
        
        if (filterDate.getTime() == dateRow.getTime() && $(this).is(':visible')) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
}

export {
    showAll,
    sortByFuelType,
    filterByDate
};