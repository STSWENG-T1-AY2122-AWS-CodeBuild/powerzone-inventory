/* JavaScript file containing the utility methods for handling the front-end of the edit stock page */

/**
 * Convert a fuel to its equivalent value in the database.
 *
 * @param {string} fuel Fuel in the inventory.
 * @return {string} Equivalent value of the fuel in the database.
 */
const getFuelValue = function(fuel) {
	switch (fuel) {
		case 'Gasoline':
			return 'gasoline';
		case 'Premium Gasoline 95':
			return 'premium-gasoline-95';
		case 'Diesel':
			return 'diesel';
		case 'Premium Gasoline 97':
			return 'premium-gasoline-97';
		default:
			return 'kerosene';
	}
};

export {
	getFuelValue
};
