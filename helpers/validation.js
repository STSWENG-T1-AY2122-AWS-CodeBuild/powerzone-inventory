/* Object for performing validations on the sign up page */

/* The db file, client schema, and express validator are used for the validatio object */
const db = require('../models/db.js');
const Account = require('../models/account-schema.js');
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
            })
        ]

        return validation;
    }
}

module.exports = validation;