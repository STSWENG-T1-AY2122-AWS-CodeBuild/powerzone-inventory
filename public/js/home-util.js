const isAllowedToEdit = function(role) {
	return role == 'administrator' || role == 'inventory-manager';
};

export {
	isAllowedToEdit
};
