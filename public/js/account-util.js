const getRoleValue = function(role) {
	switch (role) {
		case 'Inventory Manager':
			return 'inventory-manager';
		case 'Transaction Cashier':
			return 'transaction-cashier';
		default:
			return 'delivery-manager';
	}
}

export {
    getRoleValue
};