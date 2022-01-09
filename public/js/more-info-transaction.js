import {toTwoDecimalPlaces} from './general-util.js';

$(function() {
    $('.prices').each(function() {
        $(this).find('div > input').val(toTwoDecimalPlaces($(this).find('div > input').val()));
        $(this).find('input').val(toTwoDecimalPlaces($(this).find('input').val()));
    });
});