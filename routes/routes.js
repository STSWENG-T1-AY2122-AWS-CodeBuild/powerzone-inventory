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
const accountController = require('../controllers/account-controller.js');
/* Call the validation file */

dotenv.config();

powerzone.get('/', logInController.getLogIn);

powerzone.get('/getRegister', registerController.getRegister);
powerzone.post('/postRegister', registerController.postRegister);

powerzone.get('/getLogIn', logInController.getLogIn);
powerzone.post('/postLogin', logInController.postLogIn);

powerzone.get('/getHome', homeController.getHome);

powerzone.get('/getAccount', accountController.getAccount);
module.exports = powerzone;