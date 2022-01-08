/* Schema for the product transactions */

/* Mongoose is used for database functions */
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
	/* Transaction ID */
	id: {
		type: Number,
		required: true
	},

	/* Transaction date */
	date: {
		type: Date,
		required: true
	},

	/* Customer name */
	customer: {
		type: String,
		required: true
	},

	/* Total amount */
	total: {
		type: Number,
		required: true
	},

	/* Transaction status */
	status: {
		type: String,
		required: true
	},

	/* Customer phone number */
	number: {
		type: Number,
		required: true
	},

    /* Gasoline price on transaction date */
    priceGasoline: {
        type: Number,
        required: true
    },

    /* Amount of gasoline purchased */
    litersGasoline: {
        type: Number,
        required: true
    },

    /* Total price of gasoline purchased */
    totalGasoline: {
        type: Number,
        required: true
    },

    /* Premium Gasoline 95 price on transaction date */
    pricePremiumGasoline95: {
        type: Number,
        required: true
    },

    /* Amount of Premium Gasoline 95 purchased */
    litersPremiumGasoline95: {
        type: Number,
        required: true
    },

    /* Total price of Premium Gasoline 95 purchased */
    totalPremiumGasoline95: {
        type: Number,
        required: true
    },

    /* Diesel price on transaction date */
    priceDiesel: {
        type: Number,
        required: true
    },

    /* Amount of diesel purchased */
    litersDiesel: {
        type: Number,
        required: true
    },

    /* Total price of diesel purchased */
    totalDiesel: {
        type: Number,
        required: true
    },

    /* Premium Gasoline 97 price on transaction date */
    pricePremiumGasoline97: {
        type: Number,
        required: true
    },

    /* Amount of Premium Gasoline 97 purchased */
    litersPremiumGasoline97: {
        type: Number,
        required: true
    },

    /* Total price of Premium Gasoline 97 purchased */
    totalPremiumGasoline97: {
        type: Number,
        required: true
    },

    /* Kerosene price on transaction date */
    priceKerosene: {
        type: Number,
        required: true
    },

    /* Amount of kerosene purchased */
    litersKerosene: {
        type: Number,
        required: true
    },

    /* Total price of kerosene purchased */
    totalKerosene: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Transaction', transactionSchema);
