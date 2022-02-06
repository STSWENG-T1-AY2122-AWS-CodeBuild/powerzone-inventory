/* JavaScript file for handling the client-side validation of the register page */

import {
	isPasswordLengthValid,
	isPasswordFormatValid,
	isUsernameLengthValid,
	isUsernameFormatValid,
	arePasswordsMatching
} from './register-validate-util.js';

import {
	displayErrorMessage,
	hideErrorMessage,
	enableButton,
	disableButton,
	isBlankField
} from './general-util.js';

$(function() {
	let isUsernameStillValid = false;
	let didUsernameChange = true;

	let isEmailStillValid = false;
	let didEmailChange = true;

	/**
	 * Checks if there are any blank fields among those that are required for account registration.
	 *
	 * @return {boolean} true if there is at least one blank field; false, otherwise
	 */
	function isThereBlankField() {
		/* Do not trim the password. */
		return (
			isBlankField($('#signup-email'), true) ||
			isBlankField($('#signup-fname'), true) ||
			isBlankField($('#signup-lname'), true) ||
			isBlankField($('#signup-username'), true) ||
			isBlankField($('#signup-role'), true) ||
			isBlankField($('#signup-password'), false)
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
		const emailField = $('#signup-email');
		const nonUniqueEmail = $('#invalid-unique-email');
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
					displayErrorMessage(nonUniqueEmail);
					isEmailStillValid = false;

					return callback(false);
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
		const usernameField = $('#signup-username');
		const nonUniqueUsername = $('#invalid-unique-username');
		const blankUsername = $('#invalid-blank-username');
		const invalidFormatUsername = $('#invalid-char-username');
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
							displayErrorMessage(nonUniqueUsername);
							isUsernameStillValid = false;

							return callback(false);
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
		const passwordField = $('#signup-password');
		const invalidLengthPassword = $('#invalid-length-password');
		const invalidFormatPassword = $('#invalid-char-password');
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
		const passwordField = $('#signup-password');
		const confirmPasswordField = $('#signup-confirm-password');
		const invalidConfirmPassword = $('#invalid-confirm-password');
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
						enableButton($('#signup-btn'));
					} else {
						disableButton($('#signup-btn'));
					}
				});
			} else {
				if (
					isPasswordValid(field) &&
					isConfirmPasswordValid(field) &&
					isEmailValid
				) {
					enableButton($('#signup-btn'));
				} else {
					disableButton($('#signup-btn'));
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
				enableButton($('#signup-btn'));
			} else {
				disableButton($('#signup-btn'));
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
						enableButton($('#signup-btn'));
					} else {
						disableButton($('#signup-btn'));
					}
				});
			} else {
				if (
					isPasswordValid(field) &&
					isConfirmPasswordValid(field) &&
					isEmailStillValid &&
					!isThereBlankField()
				) {
					enableButton($('#signup-btn'));
				} else {
					disableButton($('#signup-btn'));
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
				enableButton($('#signup-btn'));
			} else {
				disableButton($('#signup-btn'));
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
						enableButton($('#signup-btn'));
					} else {
						disableButton($('#signup-btn'));
					}
				});
			} else {
				if (isPasswordValid(field) && isConfirmPasswordValid(field)) {
					enableButton($('#signup-btn'));
				} else {
					disableButton($('#signup-btn'));
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
				enableButton($('#signup-btn'));
			} else {
				disableButton($('#signup-btn'));
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

	$('#signup-email').on('keyup change paste', function() {
		isEmailStillValid = false;
		didEmailChange = true;

		validateField($('#signup-email'));
	});

	/* Trigger client-side validation when a key is pressed on any of the input fields. */
	$('#signup-username').on('keyup change paste', function() {
		isUsernameStillValid = false;
		didUsernameChange = true;

		validateField($('#signup-username'));
	});

	$('#signup-password').on('keyup change paste', function() {
		validateField($('#signup-password'));
	});

	$('#signup-fname').on('keyup change paste', function() {
		validateField($('#signup-fname'));
	});

	$('#signup-lname').on('keyup change paste', function() {
		validateField($('#signup-lname'));
	});

	$('#signup-role').on('change', function() {
		validateField($('#signup-role'));
	});

	$('#signup-confirm-password').on('keyup change paste', function() {
		validateField($('#signup-confirm-password'));
	});
});
