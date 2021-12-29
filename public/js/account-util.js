const getRoleValue = function(role) {
    if (role == "Inventory Manager")
		return "inventory-manager";
	else if (role == "Transaction Cashier")
		return "transaction-cashier";
	else 
		return "delivery-manager";
}

export {
    getRoleValue
};