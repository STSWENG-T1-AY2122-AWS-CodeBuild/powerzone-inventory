/* Javascript file routing the redirect strings to their respective controllers */

/* Dotenv file used to access constants */
const dotenv = require('dotenv');

/* Use the express web application framework*/
const express = require('express');

/* Use the powerzone database and the db file for accessing the database */
const powerzone = express();
const db = require('../models/db.js');

/* Call the controllers for each of the web application features */
const indexController = require('../controllers/index-controller.js');
const registerController = require('../controllers/register-controller.js');
const logInController = require('../controllers/log-in-controller.js');
/* Call the validation file */

dotenv.config();

powerzone.get('/', logInController.getLogIn);

powerzone.get('/register', registerController.getRegister);
powerzone.get('/logIn', logInController.getLogIn);

module.exports = powerzone;