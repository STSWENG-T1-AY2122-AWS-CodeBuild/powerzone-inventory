import {toTwoDecimalPlaces} from './general-util.js';

const isAllowedToEdit = function(role) {
	return role == 'administrator' || role == 'inventory-manager';
};

/**
 * Update the prices displayed on the home page (front-end only).
 */
const updatePrices = function() {
	const fuels = ['gasoline', 'premium-gasoline-95', 'diesel', 'premium-gasoline-97', 'kerosene'];
	for (const fuel of fuels) {
		$('#' + fuel + '-price').text(toTwoDecimalPlaces($('#edit-' + fuel + '-price').val()));
	}
}

export {
	isAllowedToEdit,
	updatePrices
};
