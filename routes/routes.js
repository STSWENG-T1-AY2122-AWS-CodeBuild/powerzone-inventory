/* Javascript file routing the redirect strings to their respective controllers */

/* Dotenv file used to access constants */
const dotenv = require('dotenv');

/* Use the express web application framework*/
const express = require('express');

/* Use the powerzone database and the db file for accessing the database */
const powerzone = express();
const db = require('../models/db.js');

/* Call the controllers for each of the web application features */
const registerController = require('../controllers/register-controller.js');
const logInController = require('../controllers/log-in-controller.js');
const homeController = require('../controllers/home-controller.js');
const logOutController = require('../controllers/log-out-controller.js');
const accountController = require('../controllers/account-controller.js');

/* Call the validation file */
const validation = require('../helpers/validation.js');

dotenv.config();

powerzone.get('/', logInController.getLogIn);

powerzone.get('/getRegister', registerController.getRegister);
powerzone.post('/postRegister', validation.registerValidation(), registerController.postRegister);
powerzone.get('/getCheckUsername', registerController.getCheckUsername);
powerzone.get('/getCheckEmail', registerController.getCheckEmail);

powerzone.get('/getLogIn', logInController.getLogIn);
powerzone.post('/postLogin', logInController.postLogIn);

powerzone.get('/getHome', homeController.getHome);
powerzone.post('/postEditPrices', homeController.postEditPrices);

powerzone.get('/getLogOut', logOutController.getLogOut);
powerzone.get('/getAccount', accountController.getAccount);
powerzone.get('/getEditAccount', accountController.getEditAccount);

module.exports = powerzone;