/* JavaScript file for handling the client-side validation of the edit account page */

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

	/* Set this to true in order to detect an initial single-key change to the username. */
	let isEmailStillValid = true;
	let didEmailChange = false;

	/* Store the current email and username for comparison with newly entered values. */
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
	 * Callback for checking if the entered value already exists in the database.
	 *
	 * @callback validateCallback
	 * @param {boolean} result false if the entered value already exists in the database; true, otherwise.
	 */

	/**
	 * Checks if the email address entered is valid.
	 *
	 * @param {HTMLElement} field Field for the email address.
	 * @param {validateCallback} callback false if the email address already exists in the database; true, otherwise.
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
					/* If the newly entered email is the same as the current email, no error is triggered. */
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

	/**
	 * Checks if the username entered is valid.
	 *
	 * @param {HTMLElement} field Field for the username.
	 * @param {validateCallback} callback false if the username already exists in the database; true, otherwise.
	 * @return {validateCallback} false if the username already exists in the database; true, otherwise.
	 */
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
							/* If the newly entered username is the same as the current username, no error is triggered. */
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

	/**
	 * Checks if the password entered is valid.
	 *
	 * @param {HTMLElement} field Field for the password.
	 * @return {boolean} true if the password entered is valid; false, otherwise.
	 */
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

	/**
	 * Checks if the confirmatory password matches the password entered.
	 *
	 * @param {HTMLElement} field Field for the confirmatory password.
	 * @return {boolean} true if the confirmatory password matches the password entered; false, otherwise.
	 */
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

	/**
	 * Perform client-side validation, taking into account the given validity of the entered email address.
	 *
	 * @param {HTMLElement} field Field for the email address.
	 * @param {boolean} isEmailValid true if the email address entered is valid; false, otherwise.
	 */
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

	/**
	 * Perform client-side validation if the email address entered changed.
	 *
	 * @param {HTMLElement} field Input field on focus.
	 */
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

	/**
	 * Perform client-side validation if the email address entered did not change.
	 *
	 * @param {HTMLElement} field Input field on focus.
	 */
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

	/**
	 * Perform client-side validation on the input fields.
	 *
	 * @param {HTMLElement} field Input field on focus.
	 */
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

	/* Trigger client-side validation when a key is pressed on any of the input fields. */
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
