import { 
    showAll,
    sortByFuelType,
    filterByDate
} from './inventory-util.js';

import { getFuelValue } from './edit-stock-util.js';

$(function() {
    const inventoryTableId =  'inventory-table';

    $('input').on('change', function() {
        const fuelTypes = ['Gasoline', 'Premium Gasoline 95', 'Diesel', 'Premium Gasoline 97', 'Kerosene'];
        let selectedFuelTypes = [];

        for (const fuelType of fuelTypes) {
            if ($('#sort-inventory-' + getFuelValue(fuelType)).is(':checked')) {
                selectedFuelTypes.push(fuelType);
            }
        }

        sortByFuelType(inventoryTableId, selectedFuelTypes);

        if ($('#inventory-purchased-date').val() != '') {
            filterByDate(inventoryTableId, $('#inventory-purchased-date').val());
        }
    });
});