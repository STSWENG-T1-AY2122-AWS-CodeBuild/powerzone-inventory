/* Schema for the user accounts */

/* Mongoose is used for database functions */
const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    /* Account email */
    email: {
        type: String,
        required: true
    },

    /* Account name */
    name: {
        type: String,
        required: true
    },
    
    /* Account username */
    username: {
        type: String,
        required: true
    },

    /* Account role */
    role: {
        type: String,
        required: true
    },
	
    /* Account password */
	password : {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Account', accountSchema);