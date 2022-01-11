const express = require('express');
const nocache = require('nocache');
const hbs = require('hbs');

const path = require('path');

const mongoose = require('mongoose');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);

const routes = require('./routes/routes.js');
const db = require('./models/db.js');

const powerzone = express();

port = process.env.PORT || 3000;
hostname = process.env.HOSTNAME || 3000;
url = process.env.DB_URL;

db.connect();

powerzone.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');
hbs.handlebars.registerHelper('getRole', function(dbRole) {
	if (dbRole == 'inventory-manager') {
		return 'Inventory Manager';
	} else if (dbRole == 'transaction-cashier') {
		return 'Transaction Cashier';
	} else {
		return 'Delivery Manager';
	}
});

hbs.handlebars.registerHelper('getStatus', function(status) {
	if (status == 'Accepted') {
		return '/assets/accepted.png';
	} else if (status == 'Pending') {
		return '/assets/pending.png';
	} else {
		return '/assets/rejected.png';
	}
});

hbs.handlebars.registerHelper('getFullName', function(firstName, lastName) {
	return firstName.concat(' ', lastName);
});

hbs.handlebars.registerHelper('getType', function(type) {
	if (type == 'gasoline') {
		return 'Gasoline';
	} else if (type == 'premium-gasoline-95') {
		return 'Premium Gasoline 95';
	} else if (type == 'diesel') {
		return 'Diesel';
	} else if (type == 'premium-gasoline-97') {
		return 'Premium Gasoline 97';
	} else {
		return 'Kerosene';
	}
});

hbs.handlebars.registerHelper('validInventoryRole', function(role) {
	if (role == 'administrator' || role == 'inventory-manager') {
		return true;
	} else {
		return false;
	}
});

hbs.handlebars.registerHelper('validTransactionRole', function(role) {
	if (role == 'administrator' || role == 'transaction-cashier') {
		return true;
	} else {
		return false;
	}
});

hbs.handlebars.registerHelper('getStatusIcon', function(status) {
	if (status == 'completed') {
		return '/assets/accepted.png';
	} else if (status == 'pending') {
		return '/assets/pending.png';
	} else {
		return '/assets/rejected.png';
	}
});

hbs.handlebars.registerHelper('getStatusString', function(status) {
	if (status == 'completed') {
		return 'Completed';
	} else if (status == 'pending') {
		return 'Pending';
	} else {
		return 'Cancelled';
	}
});

hbs.handlebars.registerHelper('openTransaction', function(status) {
	if (status == 'completed') {
		return false;
	} else {
		return true;
	}
});

hbs.handlebars.registerHelper('validDeliveryRole', function(role) {
	if (role == 'administrator' || role == 'delivery-manager') {
		return true;
	} else {
		return false;
	}
});

powerzone.use(express.static(path.join(__dirname, '/public')));
powerzone.use(express.json());
powerzone.use(
	express.urlencoded({
		extended: true
	})
);

powerzone.use(nocache());

powerzone.use(
	session({
		secret: process.env.session_secret,
		resave: false,
		saveUninitialized: false,
		store: new mongoStore({mongooseConnection: mongoose.connection})
	})
);

powerzone.use('/', routes);

powerzone.listen(port, hostname, function() {
	console.log('Server is running at: ');
	console.log('http://' + hostname + ':' + port);
});

/* For unit testing of REST API */
module.exports = powerzone;
