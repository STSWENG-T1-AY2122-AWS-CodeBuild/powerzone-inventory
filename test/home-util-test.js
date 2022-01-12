const jsdom = require('jsdom');
const {JSDOM} = jsdom;
const assert = require('chai').assert;

const {getDom} = require('./const-test.js');

const htmlDom = getDom();

const {
	isAllowedToEdit, updatePrices
} = require('.././public/js/home-util.js');

describe('the function to check if a role has the privilege to edit inventory prices', function() {
	it('should return a Boolean value', function() {
		const result = isAllowedToEdit('administrator');
		assert.isBoolean(result);
	});

	it('should return true if the role is administrator', function() {
		const result = isAllowedToEdit('administrator');
		assert.isTrue(result);
	});

	it('should return true if the role is inventory manager', function() {
		const result = isAllowedToEdit('inventory-manager');
		assert.isTrue(result);
	});

	it('should return false if the role is transaction cashier', function() {
		const result = isAllowedToEdit('transaction-cashier');
		assert.isFalse(result);
	});

	it('should return false if the role is delivery manager', function() {
		const result = isAllowedToEdit('delivery-manager');
		assert.isFalse(result);
	});
});

describe('the function to update the prices displayed on the home page (front-end only)', function() {
	beforeEach(function() {
		const dom = new JSDOM(
			htmlDom,
			{url: 'http://localhost'});

		global.window = dom.window;
		global.document = dom.window.document;
		global.$ = global.jQuery = require('jquery');
	});

	it('should reflect the correct prices on the home page', function() {
		updatePrices();
		assert.equal($('#gasoline-price').text(), '3.11');
		assert.equal($('#premium-gasoline-95-price').text(), '3.12');
		assert.equal($('#diesel-price').text(), '3.13');
		assert.equal($('#premium-gasoline-97-price').text(), '3.14');
		assert.equal($('#kerosene-price').text(), '3.15');
	});
});
