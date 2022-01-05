/* Object for performing validations on the sign up page */

/* The db file, client schema, and express validator are used for the validatio object */
const db = require('../models/db.js');
const { check } = require('express-validator');

const validation = {
    registerValidation: function() {
        let validation = [
            /* Check for empty fields. */
            check('signupFname', 'Kindly input a first name').trim().notEmpty(),
            check('signupLname', 'Kindly input a last name').trim().notEmpty(),
            check('signupRole', 'Kindly select a role').trim().notEmpty(),

            /* Check the email. */
            check('signupEmail', 'Kindly input an email').trim().notEmpty(),
            check('signupEmail').custom(function(value) {  
                /* Accept only email addresses that are not in use. */
                return new Promise(function(resolve, reject) {
                    let query = {emailAddress: value.trim().toLowerCase()};
                    
                    db.findOne(Client, query, 'emailAddress', function(error, result) {
                        if (error || result) {
                            reject(new Error('Email has been taken'));
                        }
                        
                        resolve(true);
                    });
                });
            }),

            /* Check the username. */
            check('signupUsername', 'Kindly input a username').trim().notEmpty(),
            check('signupUsername').custom(function(value) {  
                /* Accept only usernames that are not in use. */
                return new Promise(function(resolve, reject) {
                    let query = {username: value.trim().toLowerCase()};
                    
                    db.findOne(Client, query, 'username', function(error, result) {
                        if (error || result) {
                            reject(new Error('Username has been taken'));
                        }
                        
                        resolve(true);
                    });
                });
            }),

            /* Check the password. Do not trim its value. */            
            check('signupPassword', 'Kindly input a password').notEmpty(),
            check('signupPassword', 'Should contain at least 12 characters').isLength({min: 12}),
            check('signupPassword').custom(function(value) {
                if (value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^()|{}\[\]:;\"<>'`#,./~\\+=-])[A-Za-z\d@$!%*?&^()|{}\[\]:;\"<>'`#,./~\\+=-]/)) {
                    return true;
                } else {
                    throw new Error('Should contain lowercase and uppercase letters, numbers, and punctuations');
                }
            }),

            /* Check the confirmatory password. Do not trim its value. */
            check('signupConfirmPassword', 'Kindly confirm your password').notEmpty(),
            check('signupConfirmPassword').custom(function(value, {req}) {
                if (value == req.body.signupPassword) {
                    return true;
                } else {
                    throw new Error('Passwords do not match');
                }
            })
        ]

        return validation;
    },

    editAccountValidation: function() {
        let validation = [
            /* Check for empty fields. */
            check('editAccountFName', 'Kindly input a first name').trim().notEmpty(),
            check('editAccountLName', 'Kindly input a last name').trim().notEmpty(),

            /* Check the email. */
            check('editAccountEmail', 'Kindly input an email').trim().notEmpty(),

            /* Check the username. */
            check('editAccountUsername', 'Kindly input a username').trim().notEmpty(),

            /* Check the password. Do not trim its value. */            
            check('editAccountNewPassword', 'Kindly input a password').notEmpty(),
            check('editAccountNewPassword', 'Should contain at least 12 characters').isLength({min: 12}),
            check('editAccountNewPassword').custom(function(value) {
                if (value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^()|{}\[\]:;\"<>'`#,./~\\+=-])[A-Za-z\d@$!%*?&^()|{}\[\]:;\"<>'`#,./~\\+=-]/)) {
                    return true;
                } else {
                    throw new Error('Should contain lowercase and uppercase letters, numbers, and punctuations');
                }
            }),

            /* Check the confirmatory password. Do not trim its value. */
            check('editAccountConfirmPassword', 'Kindly confirm your password').notEmpty(),
            check('editAccountConfirmPassword').custom(function(value, {req}) {
                if (value == req.body.signupPassword) {
                    return true;
                } else {
                    throw new Error('Passwords do not match');
                }
            })
        ]

        return validation;
    }
}

module.exports = validation;