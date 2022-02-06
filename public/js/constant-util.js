/* JavaScript file for handling the constants recognized by the system. */

/**
 * Returns the database values of the fuel types recognized by the system.
 *
 * @return {array} Database values of the fuel types recognized by the system.
 */
const getFuelTypes = function() {
	return ['gasoline', 'premium-gasoline-95', 'diesel', 'premium-gasoline-97', 'kerosene'];
};

/**
 * Returns the names of the fuel types recognized by the system.
 *
 * @return {array} Names of the fuel types recognized by the system.
 */
const getFuelTypeNames = function() {
	return ['Gasoline', 'Premium Gasoline 95', 'Diesel', 'Premium Gasoline 97', 'Kerosene'];
};

const getDiscountPercents = function() {
	return [0.02, 0.05];
};

const getDiscountCutOffs = function() {
	return [50000, 150000];
};

export {
	getFuelTypes,
	getFuelTypeNames,
	getDiscountPercents,
	getDiscountCutOffs
};
