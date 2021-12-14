/* JavaScript file for handling the front end of the account page */

import { extractId } from "./general-util.js";

$(function() {
    $('.edit-status').on('click', function() {
        const accountId = extractId($(this).attr('id'));

        $('#edit-account-status-form-name').text($('#name-' + accountId).text());
        $('#edit-account-status-form-role').text($('#role-' + accountId).text());
    });

    $('.edit-role').on('click', function() {
        const accountId = extractId($(this).attr('id'));

        $('#edit-account-role-form-name').text($('#name-' + accountId).text());
        $('#edit-account-role-form-role').text($('#role-' + accountId).text());
    });

    $('.delete').on('click', function() {
        const accountId = extractId($(this).attr('id'));

        $('#delete-account-form-name').text($('#name-' + accountId).text());
        $('#delete-account-form-role').text($('#role-' + accountId).text());
    });
});
