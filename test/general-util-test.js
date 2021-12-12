const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const assert = require('chai').assert;

const {
    displayErrorMessage,
    hideErrorMessage,
    enableButton,
    disableButton,
    isBlankField
} = require('.././public/js/general-util.js')

describe('the function to display an error message', function() {
    beforeEach(function() {
        const dom = new JSDOM(
            '<html><body><div id = "error"></div><input type = "text" id = "fname"><button id = "register" disabled></button></body></html>',
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
            '<html><body><div id = "error"></div><input type = "text" id = "fname"><button id = "register" disabled></button></body></html>',
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
            '<html><body><div id = "error"></div><input type = "text" id = "fname"><button id = "register" disabled></button></body></html>',
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
            '<html><body><div id = "error"></div><input type = "text" id = "fname"><button id = "register" disabled></button></body></html>',
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
            '<html><body><div id = "error"></div><input type = "text" id = "fname"><button id = "register" disabled></button></body></html>',
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