const dotenv = require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const nocache = require("nocache");

const bodyParser = require('body-parser');
const path = require('path');

const mongoose = require('mongoose');
/*const session = require('express-session');*/
//const mongoStore = require('connect-mongo')(session);

const routes = require('./routes/routes.js');
// const helper = require('./helpers/helpers.js');
const db = require('./models/db.js');

const powerzone = express();

port = process.env.PORT || 3000;
hostname = process.env.HOSTNAME || 3000;
url = process.env.DB_URL;

db.connect();

powerzone.set('view engine','hbs');
powerzone.use(express.static(path.join(__dirname, '/public')));
powerzone.use(express.json());
powerzone.use(express.urlencoded({extended:true}));
// powerzone.engine('hbs',exphbs({
// 	defaultLayout: 'main',
// 	extname:'.hbs',
// 	helpers: helper})
//     })
//);

powerzone.use(nocache());

/*
powerzone.use(session({
	secret: process.env.session_secret,
	resave: false,
	saveUninitialized: false,
//	store: new mongoStore({mongooseConnection: mongoose.connection})
}));
*/
powerzone.use('/',routes);

powerzone.listen(port, hostname, function() {
	console.log('Server is running at: ');
	console.log('http://' + hostname + ':' + port);
});

/* For unit testing of REST API */
module.exports = powerzone;