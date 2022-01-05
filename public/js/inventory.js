import { 
    showAll,
    filterBy,
    sortAtoZ,
    sortZtoA,
    sortLowToHigh,
    sortHighToLow
} from './inventory-util.js';

import { getFuelValue } from './edit-stock-util.js';

$(function() {
    const inventoryTableId =  'inventory-table';

    $('#reset-sort-inventory').on('click', function() {
        $('input').val('');
        $('input').prop('checked', false);

        showAll(inventoryTableId);
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
        let selectedFuelTypes = [];

        for (const fuelType of fuelTypes) {
            if ($('#sort-inventory-' + getFuelValue(fuelType)).is(':checked')) {
                selectedFuelTypes.push(fuelType);
            }
        }

        filterBy(inventoryTableId, selectedFuelTypes,$('#inventory-purchased-date').val());


    });
});