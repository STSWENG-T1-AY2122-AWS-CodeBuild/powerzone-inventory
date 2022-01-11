import {
	isPasswordLengthValid,
	isPasswordFormatValid,
	isUsernameLengthValid,
	arePasswordsMatching,
	isUsernameFormatValid
} from './register-validate-util.js';

import {
	displayErrorMessage,
	hideErrorMessage,
	enableButton,
	disableButton,
	isBlankField
} from './general-util.js';

$(function() {
	let isUsernameStillValid = true;
	let didUsernameChange = true;

	let isEmailStillValid = true;
	let didEmailChange = false;

	const currentEmail = $('#edit-account-email').val();
	const currentUsername = $('#edit-account-username').val();

	/**
	 * Checks if there are any blank fields among those that are required for account registration.
	 *
	 * @return {boolean} true if there is at least one blank field; false, otherwise
	 */
	function isThereBlankField() {
		/* Do not trim the password. */
		return (
			isBlankField($('#edit-account-email'), true) ||
			isBlankField($('#edit-account-fname'), true) ||
			isBlankField($('#edit-account-lname'), true) ||
			isBlankField($('#edit-account-username'), true) ||
			isBlankField($('#edit-account-role'), true) ||
			isBlankField($('#edit-account-new-pw'), false)
		);
	}

	/**
	 *
	 * @param {HTMLElement} field
	 * @param {*} callback
	 */
	function isEmailValid(field, callback) {
		const emailField = $('#edit-account-email');
		const nonUniqueEmail = $('#edit-invalid-unique-email');
		const emailUntrimmed = emailField.val();
		const email = emailField.val().trim();

		if (emailUntrimmed.length == 0) {
			hideErrorMessage(nonUniqueEmail);
		}

		$.get('/getCheckEmail', {email: email}, function(res) {
			if (res.email == null) {
				if (field.is(emailField)) {
					hideErrorMessage(nonUniqueEmail);
					isEmailStillValid = true;

					return callback(true);
				}
			} else {
				if (field.is(emailField)) {
					if (res.email == currentEmail) {
						hideErrorMessage(nonUniqueEmail);
						isEmailStillValid = true;

						return callback(true);
					} else {
						displayErrorMessage(nonUniqueEmail);
						isEmailStillValid = false;

						return callback(false);
					}
				}
			}
		});
	}

	function isUsernameValid(field, callback) {
		const usernameField = $('#edit-account-username');
		const nonUniqueUsername = $('#edit-invalid-unique-username');
		const blankUsername = $('#edit-invalid-blank-username');
		const invalidFormatUsername = $('#edit-invalid-char-username');
		const usernameUntrimmed = usernameField.val();
		const username = usernameField.val().trim();

		if (isUsernameLengthValid(username)) {
			if (field.is(usernameField)) {
				hideErrorMessage(blankUsername);
			}

			if (isUsernameFormatValid(username)) {
				hideErrorMessage(invalidFormatUsername);

				$.get('/getCheckUsername', {username: username}, function(res) {
					if (res.username == null) {
						if (field.is(usernameField)) {
							hideErrorMessage(nonUniqueUsername);
							isUsernameStillValid = true;

							return callback(true);
						}
					} else {
						if (field.is(usernameField)) {
							if (res.username == currentUsername) {
								hideErrorMessage(nonUniqueUsername);
								isUsernameStillValid = true;

								return callback(true);
							} else {
								displayErrorMessage(nonUniqueUsername);
								isUsernameStillValid = false;

								return callback(false);
							}
						}
					}
				});
			} else {
				displayErrorMessage(invalidFormatUsername);
				return callback(false);
			}
		} else {
			if (usernameUntrimmed.length == 0) {
				hideErrorMessage(nonUniqueUsername);
				hideErrorMessage(blankUsername);
				hideErrorMessage(invalidFormatUsername);

				isUsernameStillValid = false;

				return callback(false);
			} else if (field.is(usernameField)) {
				displayErrorMessage(blankUsername);
				isUsernameStillValid = false;

				return callback(false);
			}
		}
	}

	function isPasswordValid(field) {
		const passwordField = $('#edit-account-new-pw');
		const invalidLengthPassword = $('#edit-invalid-length-new-pw');
		const invalidFormatPassword = $('#edit-invalid-char-new-pw');
		const password = passwordField.val();

		if (isPasswordLengthValid(password)) {
			if (field.is(passwordField)) {
				hideErrorMessage(invalidLengthPassword);
			}

			if (isPasswordFormatValid(password)) {
				hideErrorMessage(invalidFormatPassword);
				return true;
			} else {
				displayErrorMessage(invalidFormatPassword);
			}
		} else {
			if (password.length == 0) {
				hideErrorMessage(invalidLengthPassword);
				hideErrorMessage(invalidFormatPassword);
			} else if (field.is(passwordField)) {
				displayErrorMessage(invalidLengthPassword);
			}
		}

		return false;
	}

	function isConfirmPasswordValid(field) {
		const passwordField = $('#edit-account-new-pw');
		const confirmPasswordField = $('#edit-account-confirm-pw');
		const invalidConfirmPassword = $('#edit-invalid-confirm-pw');
		const password = passwordField.val();
		const confirmPassword = confirmPasswordField.val();

		if (arePasswordsMatching(password, confirmPassword)) {
			hideErrorMessage(invalidConfirmPassword);
			return true;
		}

		if (confirmPassword.length == 0) {
			hideErrorMessage(invalidConfirmPassword);
		} else {
			displayErrorMessage(invalidConfirmPassword);
		}

		return false;
	}

	function validateWithEmail(field, isEmailValid) {
		if (didUsernameChange) {
			didUsernameChange = false;

			if (!isUsernameStillValid) {
				isUsernameValid(field, function(isUsernameValid) {
					if (
						isPasswordValid(field) &&
						isConfirmPasswordValid(field) &&
						isUsernameValid &&
						isEmailValid &&
						!isThereBlankField()
					) {
						enableButton($('#confirm-edit-account-btn'));
					} else {
						disableButton($('#confirm-edit-account-btn'));
					}
				});
			} else {
				if (
					isPasswordValid(field) &&
					isConfirmPasswordValid(field) &&
					isEmailValid
				) {
					enableButton($('#confirm-edit-account-btn'));
				} else {
					disableButton($('#confirm-edit-account-btn'));
				}
			}
		} else {
			if (
				isPasswordValid(field) &&
				isConfirmPasswordValid(field) &&
				isUsernameStillValid &&
				isEmailValid &&
				!isThereBlankField()
			) {
				enableButton($('#confirm-edit-account-btn'));
			} else {
				disableButton($('#confirm-edit-account-btn'));
			}
		}
	}

	function validateWithGlobalEmailVar(field) {
		if (didUsernameChange) {
			didUsernameChange = false;

			if (!isUsernameStillValid) {
				isUsernameValid(field, function(isUsernameValid) {
					if (
						isPasswordValid(field) &&
						isConfirmPasswordValid(field) &&
						isUsernameValid &&
						isEmailStillValid &&
						!isThereBlankField()
					) {
						enableButton($('#confirm-edit-account-btn'));
					} else {
						disableButton($('#confirm-edit-account-btn'));
					}
				});
			} else {
				if (
					isPasswordValid(field) &&
					isConfirmPasswordValid(field) &&
					isEmailStillValid &&
					!isThereBlankField()
				) {
					enableButton($('#confirm-edit-account-btn'));
				} else {
					disableButton($('#confirm-edit-account-btn'));
				}
			}
		} else {
			if (
				isPasswordValid(field) &&
				isConfirmPasswordValid(field) &&
				isUsernameStillValid &&
				isEmailStillValid &&
				!isThereBlankField()
			) {
				enableButton($('#confirm-edit-account-btn'));
			} else {
				disableButton($('#confirm-edit-account-btn'));
			}
		}
	}

	function validateWithoutEmail(field) {
		if (didUsernameChange) {
			didUsernameChange = false;

			if (!isUsernameStillValid) {
				isUsernameValid(field, function(isUsernameValid) {
					if (
						isPasswordValid(field) &&
						isConfirmPasswordValid(field) &&
						isUsernameValid &&
						!isThereBlankField()
					) {
						enableButton($('#confirm-edit-account-btn'));
					} else {
						disableButton($('#confirm-edit-account-btn'));
					}
				});
			} else {
				if (isPasswordValid(field) && isConfirmPasswordValid(field)) {
					enableButton($('#confirm-edit-account-btn'));
				} else {
					disableButton($('#confirm-edit-account-btn'));
				}
			}
		} else {
			if (
				isPasswordValid(field) &&
				isConfirmPasswordValid(field) &&
				isUsernameStillValid &&
				isEmailValid &&
				!isThereBlankField()
			) {
				enableButton($('#confirm-edit-account-btn'));
			} else {
				disableButton($('#confirm-edit-account-btn'));
			}
		}
	}

	function validateField(field) {
		if (didEmailChange) {
			didEmailChange = false;

			if (!didEmailChange) {
				isEmailValid(field, function(isEmailValid) {
					validateWithEmail(field, isEmailValid);
				});
			} else {
				validateWithoutEmail(field);
			}
		} else {
			validateWithGlobalEmailVar(field);
		}
	}

	$('#edit-account-email').on('keyup', function() {
		isEmailStillValid = false;
		didEmailChange = true;

		validateField($('#edit-account-email'));
	});

	$('#edit-account-username').on('keyup', function() {
		isUsernameStillValid = false;
		didUsernameChange = true;

		validateField($('#edit-account-username'));
	});

	$('#edit-account-new-pw').on('keyup', function() {
		validateField($('#edit-account-new-pw'));
	});

	$('#edit-account-fname').on('keyup', function() {
		validateField($('#edit-account-fname'));
	});

	$('#edit-account-lname').on('keyup', function() {
		validateField($('#edit-account-lname'));
	});

	$('#edit-account-role').on('change', function() {
		validateField($('#edit-account-role'));
	});

	$('#edit-account-confirm-pw').on('keyup', function() {
		validateField($('#edit-account-confirm-pw'));
	});
});
