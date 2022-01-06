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
				<tr id = "r1"><td>Premium Gasoline 95</td><td>01/01/2022</td><td></td><td>₱ 60</td></tr>
				<tr id = "r2"><td>Gasoline</td><td>01/02/2022</td><td></td><td>₱ 55</td></tr>
				<tr id = "r3"><td>Kerosene</td><td>01/03/2022</td><td></td><td>₱ 55</td></tr>
				<tr id = "r4"><td>Premium Gasoline 97</td><td>01/04/2022</td><td></td><td>₱ 55</td></tr>
				<tr id = "r5"><td>Diesel</td><td>01/05/2022</td><td></td><td>₱ 55</td></tr>
				<tr id = "r6"><td>Gasoline</td><td>01/01/2022</td><td></td><td>₱ 60</td></tr>
				<tr id = "r7"><td>Kerosene</td><td>01/06/2022</td><td></td><td>₱ 111</td></tr>
				<tr id = "r8"><td>Diesel</td><td>01/07/2022</td><td></td><td>₱ 234</td></tr>
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