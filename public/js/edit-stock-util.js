const getFuelValue = function(fuel) {
    if (fuel == "Inventory Manager") {
		return "inventory-manager";
	} else if (fuel == "Transaction Cashier") {
		return "transaction-cashier";
	} 
	
	return "delivery-manager";
}

export {
    getRoleValue
};