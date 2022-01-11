/* JavaScript file containing the utility methods for handling the front-end of the home page */

import {toTwoDecimalPlaces} from './general-util.js';

/**
 * Checks if the user account is authorized to edit the prices displayed on the home page.
 *
 * Only the administrator and the inventory manager are authorized to perform this action.
 *
 * @param {string} role Role of the user account.
 * @return {boolean} true if the user account is allowed to edit the prices on the home page;
 * false, otherwise.
 */
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
};

export {
	isAllowedToEdit,
	updatePrices
};
