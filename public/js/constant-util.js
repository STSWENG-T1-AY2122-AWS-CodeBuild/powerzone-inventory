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

/**
 * Returns the discount rates for bulk orders.
 *
 * The first element of the return value refers to the discount rate for the first tier of bulk order,
 * the second element refers to the discount rate for the second tier, and so on.
 *
 * @return {array} Discount rates for bulk orders.
 */
const getDiscountPercents = function() {
	return [0.02, 0.05];
};

/**
 * Returns the cut-offs (in terms of liters of fuel ordered) for the discount scheme for bulk orders.
 *
 * No discount is applied for orders less than the first cut-off. The first discount (as returned
 * by the method getDiscountPercents) is applied for orders greater than or equal to the first cut-off
 * but less than the second cut-off. The second discount (as returned by the method getDiscountPercents)
 * is applied for orders greater than or equal to the second cut-off.
 *
 * @return {array} Cut-offs for the discount scheme for bulk orders.
 */
const getDiscountCutOffs = function() {
	return [50000, 150000];
};

export {
	getFuelTypes,
	getFuelTypeNames,
	getDiscountPercents,
	getDiscountCutOffs
};
