/* JavaScript file for containing the general-purpose utility methods. */

/**
 * Displays an error message.
 *
 * @param {HTMLElement} field Container for the error message.
 */
const displayErrorMessage = function(field) {
	field.addClass('d-block');
};

/**
 * Hides an error message.
 *
 * @param {HTMLElement} field Container for the error message.
 */
const hideErrorMessage = function(field) {
	field.removeClass('d-block');
};

/**
 * Enables a button.
 *
 * @param {HTMLelement} button Button to be enabled.
 */
const enableButton = function(button) {
	button.prop('disabled', false);
};

/**
 * Disables a button.
 *
 * @param {HTMLelement} button Button to be disabled.
 */
const disableButton = function(button) {
	button.prop('disabled', true);
};

/**
 * Checks if the user entered a null input.
 *
 * @param {HTMLElement} field Input field.
 * @param {boolean} trimmed true if the entered value should be trimmed before checking;
 * false, otherwise.
 * @return {boolean} true if the user entered a null input; false, otherwise.
 */
const isBlankField = function(field, trimmed) {
	if (trimmed) {
		return field.val().trim().length == 0;
	}

	return field.val().length == 0;
};

/**
 * Gets the database ID of the entry associated with an HTML element based on this element's DOM ID.
 *
 * @param {string} id ID of the HTML element.
 * @return {string} database ID of the entry associated with the HTML element.
 */
const extractId = function(id) {
	const idSplit = id.split('-');

	return idSplit[idSplit.length - 1];
};

/**
 * Expresses a number with exactly two decimal places.
 *
 * @param {number} number Number to expressed with exactly two decimal places.
 * @return {string} Number with exactly two decimal places.
 */
const toTwoDecimalPlaces = function(number) {
	return (Math.round(number * 100) / 100).toFixed(2);
};

/**
 * Creates a tooltip when hovering over the specified button.
 * 
 * @param {HTMLelement} button Button (technically, the wrapper) to which the tooltip is anchored.
 * @param {string} message Message shown in the tooltip.
 */
const initializeTooltip = function(button, message) {
	button.attr('data-bs-toggle', 'tooltip');
	button.attr('title', message);

	/* Bootstrap 5 code for initializing the tooltip: https://getbootstrap.com/docs/5.0/components/tooltips/ */
	const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
	tooltipTriggerList.map(function(tooltipTriggerEl) {
		return new bootstrap.Tooltip(tooltipTriggerEl);
	});
};

/**
 * Removes the tooltip anchored to the given button.
 * 
 * @param {HTMLelement} button Button (technically, the wrapper) to which the tooltip is anchored.
 */
const removeTooltip = function(button) {
	button.removeAttr('data-bs-toggle');
	button.removeAttr('title');
};

export {
	displayErrorMessage,
	hideErrorMessage,
	enableButton,
	disableButton,
	isBlankField,
	extractId,
	toTwoDecimalPlaces,
	initializeTooltip,
	removeTooltip
};
