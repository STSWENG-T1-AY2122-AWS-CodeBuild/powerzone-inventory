import {toTwoDecimalPlaces} from './general-util.js';

$(function() {
	/* Display prices with exactly two decimal places. */
	$('.prices').each(function() {
		$(this).find('div > input').val(toTwoDecimalPlaces($(this).find('div > input').val()));
		$(this).find('input').val(toTwoDecimalPlaces($(this).find('input').val()));
	});
});
