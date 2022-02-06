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
 * @param {HTMLElement} button Button to be enabled.
 */
const enableButton = function(button) {
	button.prop('disabled', false);
};

/**
 * Disables a button.
 *
 * @param {HTMLElement} button Button to be disabled.
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
		return isBlankFieldTrimmed(field);
	}

	return isBlankFieldUntrimmed(field);
};

/**
 * Checks if the user entered a null input after trimming the input value.
 *
 * @param {HTMLElement} field Input field
 * @return {boolean} true if the user entered a null input after trimming the input value; false, otherwise.
 */
const isBlankFieldTrimmed = function(field) {
	return field.val().trim().length == 0;
};

/**
 * Checks if the user entered a null input without trimming the input value.
 *
 * @param {HTMLElement} field Input field
 * @return {boolean} true if the user entered a null input without trimming the input value; false, otherwise.
 */
const isBlankFieldUntrimmed = function(field) {
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
 * @param {HTMLElement} button Button (technically, the wrapper) to which the tooltip is anchored.
 * @param {string} message Message shown in the tooltip.
 */
const initializeTooltip = function(button, message) {
	addDataToggle(button);
	addTooltipMessage(button, message);
	initializeBootstrapTooltip();
};

/**
 * Adds the data toggling behavior associated with a button that displays a tooltip on hover.
 *
 * @param {HTMLElement} button Button (technically, the wrapper) to which the tooltip is anchored.
 */
const addDataToggle = function(button) {
	button.attr('data-bs-toggle', 'tooltip');
};

/**
 * Adds the message associated with a button that displays a tooltip on hover.
 *
 * @param {HTMLElement} button Button (technically, the wrapper) to which the tooltip is anchored.
 * @param {string} message Message shown in the tooltip.
 */
const addTooltipMessage = function(button, message) {
	button.attr('title', message);
};

/**
 * Initializes the display of the tooltip following the specifications in the Bootstrap framework:
 * https://getbootstrap.com/docs/5.0/components/tooltips/
 */
const initializeBootstrapTooltip = function() {
	const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
	tooltipTriggerList.map(function(tooltipTriggerEl) {
		return new bootstrap.Tooltip(tooltipTriggerEl);
	});
};

/**
 * Removes the tooltip anchored to the given button.
 *
 * @param {HTMLElement} button Button (technically, the wrapper) to which the tooltip is anchored.
 */
const removeTooltip = function(button) {
	removeDataToggle(button);
	removeTooltipMessage(button);
};

/**
 * Removes the data toggling behavior associated with a button (previously with a tooltip).
 *
 * @param {HTMLElement} button Button (technically, the wrapper) to which the tooltip is anchored.
 */
const removeDataToggle = function(button) {
	button.removeAttr('data-bs-toggle');
};

/**
 * Removes the message associated with a button (previously with a tooltip).
 *
 * @param {HTMLElement} button Button (technically, the wrapper) to which the tooltip is anchored.
 */
const removeTooltipMessage = function(button) {
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
