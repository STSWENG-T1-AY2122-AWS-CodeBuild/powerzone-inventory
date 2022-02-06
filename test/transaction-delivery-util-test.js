const jsdom = require('jsdom');
const {JSDOM} = jsdom;
const assert = require('chai').assert;

const {
	getStatusFromIcon,
	showAll,
	filterBy,
	sortAtoZ,
	sortZtoA,
	sortLowToHigh,
	sortHighToLow,
	getDiscountedAmount
} = require('../public/js/transaction-delivery-util.js');

const {getDom} = require('./const-test.js');

const htmlDom = getDom();

describe('the function to convert the path of the status icon to its equivalent value in the database', function() {
	it('should return a string', function() {
		const result = getStatusFromIcon('/assets/pending.png');
		assert.isString(result);
	});

	it('should return completed if the path points to the icon for completed', function() {
		const result = getStatusFromIcon('/assets/completed.png');
		assert.equal(result, 'completed');
	});

	it('should return completed if the path points to the icon for accepted', function() {
		const result = getStatusFromIcon('/assets/accepted.png');
		assert.equal(result, 'completed');
	});

	it('should return pending if the path points to the icon for pending', function() {
		const result = getStatusFromIcon('/assets/pending.png');
		assert.equal(result, 'pending');
	});

	it('should return cancelled if the path points to the icon for rejected', function() {
		const result = getStatusFromIcon('/assets/rejected.png');
		assert.equal(result, 'cancelled');
	});
});

describe('the function to show all the rows of a table', function() {
	it('should make all the rows visible', function() {
		const dom = new JSDOM(
			htmlDom,
			{url: 'http://localhost'});

		global.window = dom.window;
		global.document = dom.window.document;
		global.$ = global.jQuery = require('jquery');

		$('tr').hide();
		showAll('tbl2');
		$('tr').each(function() {
			assert.equal($(this).css('visibility'), 'visible');
		});
	});
});

describe('the function to filter the rows of the table based on the status and date', function() {
	beforeEach(function() {
		const dom = new JSDOM(
			htmlDom,
			{url: 'http://localhost'});

		global.window = dom.window;
		global.document = dom.window.document;
		global.$ = global.jQuery = require('jquery');
	});

	it('should show all the rows when no status and no date are specified', function() {
		filterBy('tbl2', [], '');
		$('tr').each(function() {
			assert.equal($(this).css('visibility'), 'visible');
		});
	});

	it('should show only pending and accepted when these are the given status and no date is specified', function() {
		filterBy('tbl2', ['pending', 'accepted'], '');
		assert.equal($('#s1').css('visibility'), 'visible');
		assert.equal($('#s3').css('visibility'), 'visible');

		assert.isTrue($('#s2').is(':hidden'));
	});

	it('should show only the transaction on January 1, 2022 when it is the given date and no status is specified', function() {
		filterBy('tbl2', [], 'Thu Jan 01 2022 17:04:16 GMT+0800 (China Standard Time)');
		assert.equal($('#s1').css('visibility'), 'visible');
		assert.equal($('#s2').css('visibility'), 'visible');

		assert.isTrue($('#s3').is(':hidden'));
	});

	it('should show only the pending transaction on January 1, 2022 when this status and date are the specified filters', function() {
		filterBy('tbl', 'Kerosene', 'Thu Jan 01 2022 17:04:16 GMT+0800 (China Standard Time)');
		assert.equal($('#s1').css('visibility'), 'visible');

		assert.isTrue($('#s2').is(':hidden'));
		assert.isTrue($('#s3').is(':hidden'));
	});
});

describe('the function to sort the entries of the table from A to Z', function() {
	beforeEach(function() {
		const dom = new JSDOM(
			htmlDom,
			{url: 'http://localhost'});

		global.window = dom.window;
		global.document = dom.window.document;
		global.$ = global.jQuery = require('jquery');
	});

	it('should sort the entries in alphabetical order', function() {
		sortAtoZ('tbl2');
		const rows = $('#tbl2 > tbody > tr');

		assert.equal(rows[0].getElementsByTagName('td')[2].textContent, 'Chevron');
		assert.equal(rows[1].getElementsByTagName('td')[2].textContent, 'Petron');
		assert.equal(rows[2].getElementsByTagName('td')[2].textContent, 'Shell');
	});
});

describe('the function to sort the entries of the table from Z to A', function() {
	beforeEach(function() {
		const dom = new JSDOM(
			htmlDom,
			{url: 'http://localhost'});

		global.window = dom.window;
		global.document = dom.window.document;
		global.$ = global.jQuery = require('jquery');
	});

	it('should sort the entries in reverse alphabetical order', function() {
		sortZtoA('tbl2');
		const rows = $('#tbl2 > tbody > tr');

		assert.equal(rows[2].getElementsByTagName('td')[2].textContent, 'Chevron');
		assert.equal(rows[1].getElementsByTagName('td')[2].textContent, 'Petron');
		assert.equal(rows[0].getElementsByTagName('td')[2].textContent, 'Shell');
	});
});

describe('the function to sort the entries of the table in ascending order based on the price', function() {
	beforeEach(function() {
		const dom = new JSDOM(
			htmlDom,
			{url: 'http://localhost'});

		global.window = dom.window;
		global.document = dom.window.document;
		global.$ = global.jQuery = require('jquery');
	});

	it('should sort the entries in ascending order based on the price', function() {
		sortLowToHigh('tbl2');
		const rows = $('#tbl2 > tbody > tr');

		assert.equal(rows[0].getElementsByTagName('td')[3].textContent, '₱ 9');
		assert.equal(rows[1].getElementsByTagName('td')[3].textContent, '₱ 60');
		assert.equal(rows[2].getElementsByTagName('td')[3].textContent, '₱ 120');
	});
});

describe('the function to sort the entries of the table in descending order based on the price', function() {
	beforeEach(function() {
		const dom = new JSDOM(
			htmlDom,
			{url: 'http://localhost'});

		global.window = dom.window;
		global.document = dom.window.document;
		global.$ = global.jQuery = require('jquery');
	});

	it('should sort the entries in descending order based on the price', function() {
		sortHighToLow('tbl2');
		const rows = $('#tbl2 > tbody > tr');

		assert.equal(rows[2].getElementsByTagName('td')[3].textContent, '₱ 9');
		assert.equal(rows[1].getElementsByTagName('td')[3].textContent, '₱ 60');
		assert.equal(rows[0].getElementsByTagName('td')[3].textContent, '₱ 120');
	});
});

describe('the function to return the discount rate (percent) and discounted amount per bulk order discount scheme', function() {
	const fuelTypes = ['gasoline', 'premium-gasoline-95', 'diesel', 'premium-gasoline-97', 'kerosene'];
	const discountPercents = [0.02, 0.05];
	const discountCutOffs = [50000, 150000];
	const epsilon = 1e-2;

	beforeEach(function() {
		const dom = new JSDOM(
			htmlDom,
			{url: 'http://localhost'});

		global.window = dom.window;
		global.document = dom.window.document;
		global.$ = global.jQuery = require('jquery');
	});

	it('should return an array', function() {
		$('#edit-transaction-gasoline-liters').val('1000');
		$('#edit-transaction-premium-gasoline-95-liters').val('2000');
		$('#edit-transaction-diesel-liters').val('3000');
		$('#edit-transaction-premium-gasoline-97-liters').val('4000');
		$('#edit-transaction-kerosene-liters').val('5000');

		$('#edit-transaction-gasoline-price').val('40.11');
		$('#edit-transaction-premium-gasoline-95-price').val('50.20');
		$('#edit-transaction-diesel-price').val('60.31');
		$('#edit-transaction-premium-gasoline-97-price').val('70.86');
		$('#edit-transaction-kerosene-price').val('90.53');

		const result = getDiscountedAmount('edit', fuelTypes, discountPercents, discountCutOffs);
		assert.isArray(result);
	});

	it('should not apply any discount if the total liters of fuel ordered is less than 50,000 L', function() {
		$('#edit-transaction-gasoline-liters').val('1000');
		$('#edit-transaction-premium-gasoline-95-liters').val('2000');
		$('#edit-transaction-diesel-liters').val('3000');
		$('#edit-transaction-premium-gasoline-97-liters').val('4000');
		$('#edit-transaction-kerosene-liters').val('5000');

		$('#edit-transaction-gasoline-price').val('40.11');
		$('#edit-transaction-premium-gasoline-95-price').val('50.20');
		$('#edit-transaction-diesel-price').val('60.31');
		$('#edit-transaction-premium-gasoline-97-price').val('70.86');
		$('#edit-transaction-kerosene-price').val('90.53');

		const result = getDiscountedAmount('edit', fuelTypes, discountPercents, discountCutOffs);
		assert.approximately(result[0], 0, epsilon);
		assert.approximately(result[1], 1057530, epsilon);
	});

	it('should apply a 2% discount if the total liters of fuel ordered is 50,000 L', function() {
		$('#edit-transaction-gasoline-liters').val('10000');
		$('#edit-transaction-premium-gasoline-95-liters').val('5000');
		$('#edit-transaction-diesel-liters').val('10000');
		$('#edit-transaction-premium-gasoline-97-liters').val('15000');
		$('#edit-transaction-kerosene-liters').val('10000');

		$('#edit-transaction-gasoline-price').val('40.11');
		$('#edit-transaction-premium-gasoline-95-price').val('50.20');
		$('#edit-transaction-diesel-price').val('60.31');
		$('#edit-transaction-premium-gasoline-97-price').val('70.86');
		$('#edit-transaction-kerosene-price').val('90.53');

		const result = getDiscountedAmount('edit', fuelTypes, discountPercents, discountCutOffs);
		assert.approximately(result[0], 0.02, epsilon);
		assert.approximately(result[1], 3158932, epsilon);
	});

	it('should apply a 2% discount if the total liters of fuel ordered is above 50,000 L but less than 150,000 L', function() {
		$('#edit-transaction-gasoline-liters').val('10000');
		$('#edit-transaction-premium-gasoline-95-liters').val('75000');
		$('#edit-transaction-diesel-liters').val('10000');
		$('#edit-transaction-premium-gasoline-97-liters').val('15000');
		$('#edit-transaction-kerosene-liters').val('10000');

		$('#edit-transaction-gasoline-price').val('40.11');
		$('#edit-transaction-premium-gasoline-95-price').val('50.20');
		$('#edit-transaction-diesel-price').val('60.31');
		$('#edit-transaction-premium-gasoline-97-price').val('70.86');
		$('#edit-transaction-kerosene-price').val('90.53');

		const result = getDiscountedAmount('edit', fuelTypes, discountPercents, discountCutOffs);
		assert.approximately(result[0], 0.02, epsilon);
		assert.approximately(result[1], 6602652, epsilon);
	});

	it('should apply a 5% discount if the total liters of fuel ordered is 150,000 L', function() {
		$('#edit-transaction-gasoline-liters').val('5000');
		$('#edit-transaction-premium-gasoline-95-liters').val('75000');
		$('#edit-transaction-diesel-liters').val('25000');
		$('#edit-transaction-premium-gasoline-97-liters').val('15001');
		$('#edit-transaction-kerosene-liters').val('29999');

		$('#edit-transaction-gasoline-price').val('40.11');
		$('#edit-transaction-premium-gasoline-95-price').val('50.20');
		$('#edit-transaction-diesel-price').val('60.31');
		$('#edit-transaction-premium-gasoline-97-price').val('70.86');
		$('#edit-transaction-kerosene-price').val('90.53');

		const result = getDiscountedAmount('edit', fuelTypes, discountPercents, discountCutOffs);
		assert.approximately(result[0], 0.05, epsilon);
		assert.approximately(result[1], 8789476.31, epsilon);
	});

	it('should apply a 5% discount if the total liters of fuel ordered is above 150,000 L', function() {
		$('#edit-transaction-gasoline-liters').val('50001');
		$('#edit-transaction-premium-gasoline-95-liters').val('750003');
		$('#edit-transaction-diesel-liters').val('250005');
		$('#edit-transaction-premium-gasoline-97-liters').val('15001');
		$('#edit-transaction-kerosene-liters').val('29999');

		$('#edit-transaction-gasoline-price').val('40.11');
		$('#edit-transaction-premium-gasoline-95-price').val('50.20');
		$('#edit-transaction-diesel-price').val('60.31');
		$('#edit-transaction-premium-gasoline-97-price').val('70.86');
		$('#edit-transaction-kerosene-price').val('90.53');

		const result = getDiscountedAmount('edit', fuelTypes, discountPercents, discountCutOffs);
		assert.approximately(result[0], 0.05, epsilon);
		assert.approximately(result[1], 55586658.96, epsilon);
	});
});
