const jsdom = require('jsdom');
const {JSDOM} = jsdom;
const assert = require('chai').assert;

const {getDom} = require('./const-test.js');

const htmlDom = getDom();

const {
	displayErrorMessage,
	hideErrorMessage,
	enableButton,
	disableButton,
	isBlankField,
	extractId,
	toTwoDecimalPlaces,
	initializeTooltip,
	removeTooltip
} = require('.././public/js/general-util.js');

describe('the function to display an error message', function() {
	beforeEach(function() {
		const dom = new JSDOM(
			htmlDom,
			{url: 'http://localhost'});

		global.window = dom.window;
		global.document = dom.window.document;
		global.$ = global.jQuery = require('jquery');
	});

	it('should add d-block as one of the classes', function() {
		displayErrorMessage($('#error'));
		const result = $('#error').attr('class').includes('d-block');
		assert.isTrue(result);
	});
});

describe('the function to hide an error message', function() {
	beforeEach(function() {
		const dom = new JSDOM(
			htmlDom,
			{url: 'http://localhost'});

		global.window = dom.window;
		global.document = dom.window.document;
		global.$ = global.jQuery = require('jquery');
	});

	it('should add d-block as one of the classes', function() {
		hideErrorMessage($('#error'));
		const result = $('#error').attr('class').includes('d-block');
		assert.isFalse(result);
	});
});

describe('the function to enable a button', function() {
	beforeEach(function() {
		const dom = new JSDOM(
			htmlDom,
			{url: 'http://localhost'});

		global.window = dom.window;
		global.document = dom.window.document;
		global.$ = global.jQuery = require('jquery');
	});

	it('should set the disabled property to false', function() {
		enableButton($('#register'));
		const result = $('#register').prop('disabled');
		assert.isFalse(result);
	});
});

describe('the function to disable a button', function() {
	beforeEach(function() {
		const dom = new JSDOM(
			htmlDom,
			{url: 'http://localhost'});

		global.window = dom.window;
		global.document = dom.window.document;
		global.$ = global.jQuery = require('jquery');
	});

	it('should set the disabled property to true', function() {
		disableButton($('#register'));
		const result = $('#register').prop('disabled');
		assert.isTrue(result);
	});
});

describe('the function to check if a field is blank', function() {
	beforeEach(function() {
		const dom = new JSDOM(
			htmlDom,
			{url: 'http://localhost'});

		global.window = dom.window;
		global.document = dom.window.document;
		global.$ = global.jQuery = require('jquery');
	});

	it('should return a Boolean', function() {
		const result = isBlankField($('#fname'), true);
		assert.isBoolean(result);
	});

	it('should return true if the field is empty and trimmed is set to true', function() {
		const result = isBlankField($('#fname'), true);
		assert.isTrue(result);
	});

	it('should return true if the field is empty and trimmed is set to false', function() {
		const result = isBlankField($('#fname'), false);
		assert.isTrue(result);
	});

	it('should return true if the field only has spaces and trimmed is set to true', function() {
		$('#fname').val('    ');
		const result = isBlankField($('#fname'), true);
		assert.isTrue(result);
	});

	it('should return false if the field only has spaces and trimmed is set to false', function() {
		$('#fname').val('    ');
		const result = isBlankField($('#fname'), false);
		assert.isFalse(result);
	});

	it('should return false if the field has non-space characters and trimmed is set to true', function() {
		$('#fname').val(' asdfasd   ');
		const result = isBlankField($('#fname'), true);
		assert.isFalse(result);
	});

	it('should return false if the field has non-space characters and trimmed is set to false', function() {
		$('#fname').val(' asdfasd   ');
		const result = isBlankField($('#fname'), false);
		assert.isFalse(result);
	});
});

describe('the function to extract the database object ID from a browser element ID', function() {
	it('should return the database object ID (substring after the last hyphen delimiter)', function() {
		const result = extractId('edit-role-12345');
		assert.equal(result, '12345');
	});
});

describe('the function to display a number to two decimal places', function() {
	it('should return a string', function() {
		const result = toTwoDecimalPlaces(24.3);
		assert.isString(result);
	});

	it('should append .00 if the number is an integer', function() {
		const result = toTwoDecimalPlaces(24);
		assert.equal(result, '24.00');
	});

	it('should append a trailing zero if the number only has one decimal place', function() {
		const result = toTwoDecimalPlaces(24.3);
		assert.equal(result, '24.30');
	});

	it('should output the same number if the number has exactly two decimal places', function() {
		const result = toTwoDecimalPlaces(24.32);
		assert.equal(result, '24.32');
	});

	it('should round the number to two decimal places if it has more than two decimal places', function() {
		const result = toTwoDecimalPlaces(24.336);
		assert.equal(result, '24.34');
	});
});

describe('the function to create a tooltip when hovering over a specified button', function() {
	beforeEach(function() {
		const dom = new JSDOM(
			htmlDom,
			{url: 'http://localhost'});

		global.window = dom.window;
		global.document = dom.window.document;
		global.$ = global.jQuery = require('jquery');
	});

	it('should set the data-bs-toggle attribute to tooltip', function() {
		$('#register').prop('disabled', false);
		initializeTooltip($('#register'), 'Hello');
		assert.equal($('#register').attr('data-bs-toggle'), 'tooltip');
	});

	it('should display the correct message', function() {
		$('#register').prop('disabled', false);
		initializeTooltip($('#register'), 'Hello');
		assert.equal($('#register').attr('title'), 'Hello');
	});
});

describe('the function to remove the tooltip anchored to a specified button', function() {
	beforeEach(function() {
		const dom = new JSDOM(
			htmlDom,
			{url: 'http://localhost'});

		global.window = dom.window;
		global.document = dom.window.document;
		global.$ = global.jQuery = require('jquery');
	});

	it('should not trigger any behavior associated with data toggling', function() {
		$('#register').prop('disabled', false);
		initializeTooltip($('#register'), 'Hello');
		removeTooltip($('#register'));

		assert.equal(typeof $('#register').attr('data-bs-toggle'), 'undefined');
	});

	it('should not display any tooltip message', function() {
		$('#register').prop('disabled', false);
		initializeTooltip($('#register'), 'Hello');
		removeTooltip($('#register'));

		assert.equal(typeof $('#register').attr('title'), 'undefined');
	});
});
