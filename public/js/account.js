/* JavaScript file for handling the front end of the account page */

import {extractId} from './general-util.js';
import {getRoleValue} from './account-util.js';

$(function() {
	/* Update the details in the modal when the edit status button is clicked. */
	$('.edit-status').on('click', function() {
		const accountId = extractId($(this).attr('id'));

		$('#edit-account-status-form-id').val(accountId);
		$('#edit-account-status-form-name').text($('#name-' + accountId).text());
		$('#edit-account-status-form-role').text($('#role-' + accountId).text());
	});

	/* Update the details in the modal when the edit role button is clicked. */
	$('.edit-role').on('click', function() {
		const accountId = extractId($(this).attr('id'));

		$('#edit-account-role-form-id').val(accountId);
		$('#edit-account-role-form-name').text($('#name-' + accountId).text());
		$('#edit-account-role-form-role').text($('#role-' + accountId).text());

		$('#edit-account-role').val(getRoleValue($('#role-' + accountId).text()));
	});

	/* Update the details in the modal when the delete button is clicked. */
	$('.delete').on('click', function() {
		const accountId = extractId($(this).attr('id'));

		$('#delete-account-form-id').val(accountId);
		$('#delete-account-form-name').text($('#name-' + accountId).text());
		$('#delete-account-form-role').text($('#role-' + accountId).text());
	});

	/* Reject the registration of the user account. */
	$('#reject-account-btn').on('click', function(e) {
		/* Override the default submit behavior and insert AJAX. */
		const id = $('#edit-account-status-form-id').val();
		e.preventDefault();

		$.ajax({
			url: '/postEditStatusReject',
			method: 'POST',
			data: $('#edit-account-status-form').serialize(),
			statusCode: {

				/* If the rejection is successful, redirect the user to the landing page. */
				200: function() {
					$('#status-img-' + id).attr('src', '/assets/rejected.png');
					$('#edit-account-status-modal').modal('hide');
				},

				/* Otherwise, display an error message. */
				401: function() {
					alert('Error!');
				}
			}
		});
	});

	/* Accept the registration of the user account. */
	$('#accept-account-btn').on('click', function(e) {
		/* Override the default submit behavior and insert AJAX. */
		const id = $('#edit-account-status-form-id').val();
		e.preventDefault();

		$.ajax({
			url: '/postEditStatusAccept',
			method: 'POST',
			data: $('#edit-account-status-form').serialize(),
			statusCode: {

				/* If the acceptance is successful, redirect the user to the account page. */
				200: function() {
					$('#status-img-' + id).attr('src', '/assets/accepted.png');
					$('#edit-account-status-modal').modal('hide');
				},

				/* Otherwise, display an error message. */
				401: function() {
					alert('Error!');
				}
			}
		});
	});

	/* Pend the registration of the user account. */
	$('#pend-account-btn').on('click', function(e) {
		/* Override the default submit behavior and insert AJAX. */
		const id = $('#edit-account-status-form-id').val();
		e.preventDefault();

		$.ajax({
			url: '/postEditStatusPending',
			method: 'POST',
			data: $('#edit-account-status-form').serialize(),
			statusCode: {

				/* If the pending is successful, redirect the user to the account page. */
				200: function() {
					$('#status-img-' + id).attr('src', '/assets/pending.png');
					$('#edit-account-status-modal').modal('hide');
				},

				/* Otherwise, display an error message. */
				401: function() {
					alert('Error!');
				}
			}
		});
	});

	/* Submit the form for editing the role of a user account. */
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
					alert('Error!');
				}
			}
		});
	});

	/* Delete the user account. */
	$('#delete-account-form').on('submit', function(e) {
		/* Override the default submit behavior and insert AJAX. */
		const id = $('#delete-account-form-id').val();
		e.preventDefault();

		$.ajax({
			url: '/postDeleteAccount',
			method: 'POST',
			data: $('#delete-account-form').serialize(),
			statusCode: {

				/* If the deletion is successful, redirect the user to the account page. */
				200: function() {
					$('#delete-account-modal').modal('hide');
					$('#entry-' + id).remove();
				},

				/* Otherwise, display an error message. */
				401: function() {
					alert('Error!');
				}
			}
		});
	});
});
