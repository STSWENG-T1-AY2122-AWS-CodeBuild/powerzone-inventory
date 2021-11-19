/* Javascript file routing the redirect strings to their respective controllers */

/* Dotenv file used to access constants */
const dotenv = require('dotenv');

/* Use the express web application framework*/
const express = require('express');

/* Use the krafts database and the db file for accessing the database */
const powerzone = express();
const db = require('../models/db.js');

/* Call the controllers for each of the web application features */

/* Call the validation file */

dotenv.config();

module.exports = powerzone;