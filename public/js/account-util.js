/* JavaScript file containing the utility methods for handling the front-end of the account page */

/**
 * Converts a role to its equivalent value in the database
 *
 * @param {string} role Role of a user account.
 * @return {string} Equivalent value of the role in the database.
 */
const getRoleValue = function(role) {
	switch (role) {
		case 'Inventory Manager':
			return 'inventory-manager';
		case 'Transaction Cashier':
			return 'transaction-cashier';
		default:
			return 'delivery-manager';
	}
};

export {
	getRoleValue
};
