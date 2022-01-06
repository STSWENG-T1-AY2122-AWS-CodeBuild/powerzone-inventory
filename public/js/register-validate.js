import {
	isPasswordLengthValid,
	isPasswordFormatValid,
	isUsernameLengthValid,
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

	function isUsernameValid(field, callback) {
		const usernameField = $('#signup-username');
		const nonUniqueUsername = $('#invalid-unique-username');
		const blankUsername = $('#invalid-blank-username');
		const usernameUntrimmed = usernameField.val();
		const username = usernameField.val().trim();

		if (isUsernameLengthValid(username)) {
			if (field.is(usernameField)) {
				hideErrorMessage(blankUsername);
			}

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
			if (usernameUntrimmed.length == 0) {
				hideErrorMessage(nonUniqueUsername);
				hideErrorMessage(blankUsername);
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

	$('#signup-email').on('keyup', function() {
		isEmailStillValid = false;
		didEmailChange = true;

		validateField($('#signup-email'));
	});

	$('#signup-username').on('keyup', function() {
		isUsernameStillValid = false;
		didUsernameChange = true;

		validateField($('#signup-username'));
	});

	$('#signup-password').on('keyup', function() {
		validateField($('#signup-password'));
	});

	$('#signup-fname').on('keyup', function() {
		validateField($('#signup-fname'));
	});

	$('#signup-lname').on('keyup', function() {
		validateField($('#signup-lname'));
	});

	$('#signup-role').on('change', function() {
		validateField($('#signup-role'));
	});

	$('#signup-confirm-password').on('keyup', function() {
		validateField($('#signup-confirm-password'));
	});
});
