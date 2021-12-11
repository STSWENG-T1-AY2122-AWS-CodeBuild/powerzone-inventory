import { 
    isPasswordLengthValid,
    isPasswordFormatValid,
    isUsernameLengthValid
} from './register-validate-util.js';

import {
    displayErrorMessage,
    hideErrorMessage,
    enableButton,
    disableButton
} from './general-util.js';

$(function(){
    let isUsernameStillValid = false;
    let didUsernameChange = true;

    let isEmailStillValid = false;
    let didEmailChange = true;

    function isEmailValid(field, callback) {
        const emailField = $('#signup-email');
        const nonUniqueEmail = $('#invalid-unique-email');
        const emailUntrimmed = emailField.val();
        const email = emailField.val().trim();

        $.get('/getCheckUsername', {username: username}, function(res) {
            if (res.username != username) {
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
                if (res.username != username) {
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
            } else if (field.is(usernameField)) {
                displayErrorMessage(blankUsername);
                isUsernameStillValid = false;
            }
        }

        return callback(false);
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

    function validateField(field) {
        if (didUsernameChange) {
            didUsernameChange = false;

            if (!isUsernameStillValid) {                       
                isUsernameValid(field, function (isUsernameValid) {
					if (isPasswordValid(field) && isUsernameValid) {
						$('#signup-btn').prop('disabled', false);
					} else {	
						$('#signup-btn').prop('disabled', true);
					}
				});
            } else {
                if (isPasswordValid(field)) {	
					$('#signup-btn').prop('disabled', false);
				} else {	
					$('#signup-btn').prop('disabled', true);
				}
            }

        } else {
            if(isPasswordValid(field) && isUsernameStillValid) {    
                $('#signup-btn').prop('disabled', false);
            } else {    
                $('#signup-btn').prop('disabled', true);
            }
        }
    }

    $('#signup-username').on('keyup', function() {
        isUsernameStillValid = false;
        didUsernameChange = true;

        validateField($('#signup-username'));
    });

    $('#signup-password').on('keyup', function() {
        validateField($('#signup-password'));
    });
});