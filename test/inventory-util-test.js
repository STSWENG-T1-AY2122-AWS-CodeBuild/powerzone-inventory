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

let htmlDom = `<html>
	<body>
		<div id = "error"></div>
		<input type = "text" id = "fname">
		<button id = "register" disabled></button>
		<table id = "tbl" style = "visibility: visible;">
			<tbody>
				<tr id = "r1"><td>Premium Gasoline 95</td><td>₱ 60</td></tr>
				<tr id = "r2"><td>Gasoline</td><td>₱ 55</td></tr>
				<tr id = "r3"><td>Kerosene</td><td>₱ 55</td></tr>
				<tr id = "r4"><td>Premium Gasoline 97</td><td>₱ 55</td></tr>
				<tr id = "r5"><td>Diesel</td><td>₱ 55</td></tr>
				<tr id = "r6"><td>Gasoline</td><td>₱ 60</td></tr>
				<tr id = "r7"><td>Kerosene</td><td>₱ 111</td></tr>
				<tr id = "r8"><td>Diesel</td><td>₱ 234</td></tr>
			</tbody>
		</table>
	</body>
</html>`;

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