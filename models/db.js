/* Dotenv file used to access constants */
const dotenv = require('dotenv');

/* Mongoose is used for database functions */
const mongoose = require('mongoose');

/* Modify options to remove deprecation warnings */
const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true
};

/* Configure dotenv with the needed data */
dotenv.config();
const url = process.env.DB_URL;

/* Specify database operations (i.e., connecting to the database, creating the GridFS storage, and the database
 * CRUD operations)
 */
const database = {
	/**
     * Connects to the database
     */
	connect: function() {
		mongoose.connect(url, options, function(error) {
			if (error) throw error;
		});
	},

	/**
	 * Callback for fetching the result of database operations.
	 *
	 * @callback dbCallback
	 * @param {*} result Result of the database operation.
	 */

	/**
     * Inserts one document into the database
     *
     * @param {Object} model collection to be accessed
     * @param {Object} doc document to be inserted
     * @param {dbCallback} callback callback for indicating whether the insertion succeeded
     */
	insertOne: function(model, doc, callback) {
		model.create(doc, function(error, result) {
			if (error) return callback(false);

			return callback(result);
		});
	},

	/**
     * Inserts multiple documents into the database
     *
     * @param {Object} model collection to be accessed
     * @param {Object} docs documents to be inserted
     * @param {dbCallback} callback callback for indicating whether the insertion succeeded
     */
	insertMany: function(model, docs, callback) {
		model.insertMany(docs, function(error, result) {
			if (error) return callback(false);

			return callback(true);
		});
	},

	/**
     * Retrieves one document from the database
     *
     * @param {Object} model collection to be accessed
     * @param {Object} query query to be executed on the collection
     * @param {string} projection projection fields to be returned
     * @param {dbCallback} callback false if the searching did not succeed; otherwise, the specified fields to be returned
     */
	findOne: function(model, query, projection, callback) {
		model.findOne(query, projection, function(error, result) {
			if (error) return callback(false);
			return callback(result);
		});
	},

	/**
     * Retrieves multiple documents from the database
     *
     * @param {Object} model collection to be accessed
     * @param {Object} query query to be executed on the collection
     * @param {string} projection projection fields to be returned
     * @param {dbCallback} callback false if the searching did not succeed; otherwise, the specified fields to be returned
     */
	findMany: function(model, query, projection, callback) {
		model.find(query, projection, function(error, result) {
			if (error) return callback(false);
			return callback(result);
		});
	},

	/**
     * Updates one document in the database
     *
     * @param {Object} model collection to be accessed
     * @param {Object} filter query with which to filter the collection documents
     * @param {Object} update revisions to the document data
     * @param {dbCallback} callback callback for indicating whether the update succeeded
     */
	updateOne: function(model, filter, update, callback) {
		model.updateOne(filter, update, function(error, result) {
			if (error) return callback(false);

			return callback(true);
		});
	},

	/**
     * Updates multiple documents in the database
     *
     * @param {Object} model collection to be accessed
     * @param {Object} filter query with which to filter the collection documents
     * @param {Object} update revisions to the document data
     * @param {dbCallback} callback callback for indicating whether the update succeeded
     */
	updateMany: function(model, filter, update, callback) {
		model.updateMany(filter, update, function(error, result) {
			if (error) return callback(false);

			return callback(true);
		});
	},

	/**
     * Deletes one document in the database
     *
     * @param {Object} model collection to be accessed
     * @param {Object} conditions query with which to obtain the document to be deleted
     * @param {dbCallback} callback callback for indicating whether the deletion succeeded
     */
	deleteOne: function(model, conditions, callback) {
		model.deleteOne(conditions, function(error, result) {
			if (error) return callback(false);

			return callback(true);
		});
	},

	/**
     * Deletes multiple documents in the database
     *
     * @param {Object} model collection to be accessed
     * @param {Object} conditions query with which to obtain the documents to be deleted
     * @param {dbCallback} callback callback for indicating whether the deletion succeeded
     */
	deleteMany: function(model, conditions, callback) {
		model.deleteMany(conditions, function(error, result) {
			if (error) return callback(false);

			return callback(true);
		});
	},

	/**
     * Converts a string to the ObjectId data type
     *
     * @param {string} id string to be converted
     * @return ObjectId variable of the input string
     */
	convertToObjectId: function(id) {
		return mongoose.Types.ObjectId(id);
	}
};

module.exports = database;
