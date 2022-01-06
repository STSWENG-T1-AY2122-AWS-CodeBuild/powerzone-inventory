const displayErrorMessage = function(field) {
	field.addClass('d-block');
};

const hideErrorMessage = function(field) {
	field.removeClass('d-block');
};

const enableButton = function(button) {
	button.prop('disabled', false);
};

const disableButton = function(button) {
	button.prop('disabled', true);
};

const isBlankField = function(field, trimmed) {
	if (trimmed) {
		return field.val().trim().length == 0;
	}

	return field.val().length == 0;
};

const extractId = function(id) {
	const idSplit = id.split('-');

	return idSplit[idSplit.length - 1];
};

const toTwoDecimalPlaces = function(number) {
	return (Math.round(number * 100) / 100).toFixed(2);
};

export {
	displayErrorMessage,
	hideErrorMessage,
	enableButton,
	disableButton,
	isBlankField,
	extractId,
	toTwoDecimalPlaces,
};
