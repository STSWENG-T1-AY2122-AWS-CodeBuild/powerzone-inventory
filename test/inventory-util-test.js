const jsdom = require('jsdom');
const {JSDOM} = jsdom;
const assert = require('chai').assert;

const {
	showAll,
	filterBy,
	sortAtoZ,
	sortZtoA,
	sortLowToHigh,
	sortHighToLow
} = require('.././public/js/inventory-util.js');

const {getDom} = require('./const-test.js');

const htmlDom = getDom();

describe('the function to show all the rows of a table', function() {
	it('should make all the rows visible', function() {
		const dom = new JSDOM(
			htmlDom,
			{url: 'http://localhost'});

		global.window = dom.window;
		global.document = dom.window.document;
		global.$ = global.jQuery = require('jquery');

		$('tr').hide();
		showAll('tbl');
		$('tr').each(function() {
			assert.equal($(this).css('visibility'), 'visible');
		});
	});
});

describe('the function to filter the rows of the table based on the fuel type and date', function() {
	beforeEach(function() {
		const dom = new JSDOM(
			htmlDom,
			{url: 'http://localhost'});

		global.window = dom.window;
		global.document = dom.window.document;
		global.$ = global.jQuery = require('jquery');
	});

	it('should show all the rows when no fuel types and no date are specified', function() {
		filterBy('tbl', [], '');
		$('tr').each(function() {
			assert.equal($(this).css('visibility'), 'visible');
		});
	});

	it('should show only kerosene and diesel when these are the given fuel types and no date is specified', function() {
		filterBy('tbl', ['Kerosene', 'Diesel'], '');
		assert.equal($('#r3').css('visibility'), 'visible');
		assert.equal($('#r5').css('visibility'), 'visible');
		assert.equal($('#r7').css('visibility'), 'visible');

		assert.isTrue($('#r1').is(':hidden'));
		assert.isTrue($('#r2').is(':hidden'));
		assert.isTrue($('#r4').is(':hidden'));
		assert.isTrue($('#r6').is(':hidden'));
		assert.isTrue($('#r8').is(':hidden'));
	});

	it('should show only the fuel purchased on January 1, 2022 when it is the given date and no fuel type is specified', function() {
		filterBy('tbl', [], 'Thu Jan 01 2022 17:04:16 GMT+0800 (China Standard Time)');
		assert.equal($('#r1').css('visibility'), 'visible');
		assert.equal($('#r6').css('visibility'), 'visible');

		assert.isTrue($('#r2').is(':hidden'));
		assert.isTrue($('#r3').is(':hidden'));
		assert.isTrue($('#r4').is(':hidden'));
		assert.isTrue($('#r5').is(':hidden'));
		assert.isTrue($('#r7').is(':hidden'));
		assert.isTrue($('#r8').is(':hidden'));
	});

	it('should show only the kerosene purchased on January 1, 2022 when this fuel type and date are the specified filters', function() {
		filterBy('tbl', 'Kerosene', 'Thu Jan 01 2022 17:04:16 GMT+0800 (China Standard Time)');
		assert.equal($('#r1').css('visibility'), 'visible');

		assert.isTrue($('#r2').is(':hidden'));
		assert.isTrue($('#r3').is(':hidden'));
		assert.isTrue($('#r4').is(':hidden'));
		assert.isTrue($('#r5').is(':hidden'));
		assert.isTrue($('#r6').is(':hidden'));
		assert.isTrue($('#r7').is(':hidden'));
		assert.isTrue($('#r8').is(':hidden'));
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
		sortAtoZ('tbl');
		const rows = $('#tbl > tbody > tr');

		assert.equal(rows[0].getElementsByTagName('td')[0].textContent, 'Diesel');
		assert.equal(rows[1].getElementsByTagName('td')[0].textContent, 'Diesel');
		assert.equal(rows[2].getElementsByTagName('td')[0].textContent, 'Gasoline');
		assert.equal(rows[3].getElementsByTagName('td')[0].textContent, 'Gasoline');
		assert.equal(rows[4].getElementsByTagName('td')[0].textContent, 'Kerosene');
		assert.equal(rows[5].getElementsByTagName('td')[0].textContent, 'Kerosene');
		assert.equal(rows[6].getElementsByTagName('td')[0].textContent, 'Premium Gasoline 95');
		assert.equal(rows[7].getElementsByTagName('td')[0].textContent, 'Premium Gasoline 97');
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
		sortZtoA('tbl');
		const rows = $('#tbl > tbody > tr');

		assert.equal(rows[7].getElementsByTagName('td')[0].textContent, 'Diesel');
		assert.equal(rows[6].getElementsByTagName('td')[0].textContent, 'Diesel');
		assert.equal(rows[5].getElementsByTagName('td')[0].textContent, 'Gasoline');
		assert.equal(rows[4].getElementsByTagName('td')[0].textContent, 'Gasoline');
		assert.equal(rows[3].getElementsByTagName('td')[0].textContent, 'Kerosene');
		assert.equal(rows[2].getElementsByTagName('td')[0].textContent, 'Kerosene');
		assert.equal(rows[1].getElementsByTagName('td')[0].textContent, 'Premium Gasoline 95');
		assert.equal(rows[0].getElementsByTagName('td')[0].textContent, 'Premium Gasoline 97');
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
		sortLowToHigh('tbl');
		const rows = $('#tbl > tbody > tr');

		assert.equal(rows[0].getElementsByTagName('td')[3].textContent, '₱ 55');
		assert.equal(rows[1].getElementsByTagName('td')[3].textContent, '₱ 55');
		assert.equal(rows[2].getElementsByTagName('td')[3].textContent, '₱ 55');
		assert.equal(rows[3].getElementsByTagName('td')[3].textContent, '₱ 55');
		assert.equal(rows[4].getElementsByTagName('td')[3].textContent, '₱ 60');
		assert.equal(rows[5].getElementsByTagName('td')[3].textContent, '₱ 60');
		assert.equal(rows[6].getElementsByTagName('td')[3].textContent, '₱ 111');
		assert.equal(rows[7].getElementsByTagName('td')[3].textContent, '₱ 234');
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
		sortHighToLow('tbl');
		const rows = $('#tbl > tbody > tr');

		assert.equal(rows[7].getElementsByTagName('td')[3].textContent, '₱ 55');
		assert.equal(rows[6].getElementsByTagName('td')[3].textContent, '₱ 55');
		assert.equal(rows[5].getElementsByTagName('td')[3].textContent, '₱ 55');
		assert.equal(rows[4].getElementsByTagName('td')[3].textContent, '₱ 55');
		assert.equal(rows[3].getElementsByTagName('td')[3].textContent, '₱ 60');
		assert.equal(rows[2].getElementsByTagName('td')[3].textContent, '₱ 60');
		assert.equal(rows[1].getElementsByTagName('td')[3].textContent, '₱ 111');
		assert.equal(rows[0].getElementsByTagName('td')[3].textContent, '₱ 234');
	});
});
