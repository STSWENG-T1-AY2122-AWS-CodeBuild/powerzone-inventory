/* JavaScript file for handling the front end of the account page */

import { extractId } from "./general-util.js";
import { getRoleValue } from "./account-util.js";

$(function() {
    $('.edit-status').on('click', function() {
        const accountId = extractId($(this).attr('id'));

        $('#edit-account-status-form-id').val(accountId);
        $('#edit-account-status-form-name').text($('#name-' + accountId).text());
        $('#edit-account-status-form-role').text($('#role-' + accountId).text());
    });

    $('.edit-role').on('click', function() {
        const accountId = extractId($(this).attr('id'));

        $('#edit-account-role-form-id').val(accountId);
        $('#edit-account-role-form-name').text($('#name-' + accountId).text());
        $('#edit-account-role-form-role').text($('#role-' + accountId).text());

        $('#edit-account-role').val(getRoleValue($('#role-' + accountId).text()));
    });

    $('.delete').on('click', function() {
        const accountId = extractId($(this).attr('id'));

        $('#delete-account-form-id').val(accountId);
        $('#delete-account-form-name').text($('#name-' + accountId).text());
        $('#delete-account-form-role').text($('#role-' + accountId).text());
    });

    $('#reject-account-btn').on('click', function(e) {
		/* Override the default submit behavior and insert AJAX. */
		const id = $('#edit-account-status-form-id').val();
		e.preventDefault();
			
		$.ajax({
			url: '/postEditStatusReject',
			method: 'POST',
			data: $('#edit-account-status-form').serialize(),
			statusCode: {

				/* If the editing is successful, redirect the user to the landing page. */
				200: function() {
					$('#status-img-' + id).attr('src', '/assets/rejected.png');
					$('#edit-account-status-modal').modal('hide');
				},
				
				/* Otherwise, display an error message. */
				401: function() {
					alert("Error!");
				}
			}
		});
	});

    $('#accept-account-btn').on('click', function(e) {
		/* Override the default submit behavior and insert AJAX. */
		const id = $('#edit-account-status-form-id').val();
		e.preventDefault();
			
		$.ajax({
			url: '/postEditStatusAccept',
			method: 'POST',
			data: $('#edit-account-status-form').serialize(),
			statusCode: {

				/* If the editing is successful, redirect the user to the account page. */
				200: function() {
					$('#status-img-' + id).attr('src', '/assets/accepted.png');
					$('#edit-account-status-modal').modal('hide');
				},
				
				/* Otherwise, display an error message. */
				401: function() {
					alert("Error!");
				}
			}
		});
	});

    $('#pend-account-btn').on('click', function(e) {
		/* Override the default submit behavior and insert AJAX. */
		const id = $('#edit-account-status-form-id').val();
		e.preventDefault();
			
		$.ajax({
			url: '/postEditStatusPending',
			method: 'POST',
			data: $('#edit-account-status-form').serialize(),
			statusCode: {

				/* If the editing is successful, redirect the user to the account page. */
				200: function() {
					$('#status-img-' + id).attr('src', '/assets/pending.png');
					$('#edit-account-status-modal').modal('hide');
				},
				
				/* Otherwise, display an error message. */
				401: function() {
					alert("Error!");
				}
			}
		});
	});

    $('#edit-account-role-form').on('submit', function(e) {
		/* Override the default submit behavior and insert AJAX. */
		const id = $('#edit-account-role-form-id').val();
		e.preventDefault();
			
		$.ajax({
			url: '/postEditRole',
			method: 'POST',
			data: $('#edit-account-role-form').serialize(),
			statusCode: {

				/* If the editing is successful, redirect the user to the account page. */
				200: function() {
					$('#edit-account-role-modal').modal('hide');
					$('#role-' + id).text($('#edit-account-role :selected').text());
				},
				
				/* Otherwise, display an error message. */
				401: function() {
					alert("Error!");
				}
			}
		});
	});

    $('#delete-account-form').on('submit', function(e) {
		/* Override the default submit behavior and insert AJAX. */
		e.preventDefault();
			
		$.ajax({
			url: '/postDeleteAccount',
			method: 'POST',
			data: $('#delete-account-form').serialize(),
			statusCode: {

				/* If the editing is successful, redirect the user to the account page. */
				200: function() {
					location.href = '/getAccount';
				},
				
				/* Otherwise, display an error message. */
				401: function() {
					alert("Error!");
				}
			}
		});
	});
});
