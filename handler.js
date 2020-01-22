'use strict';

const { reportError } = require('./utils/error-handler');

const dbHandler = require('./utils/db-handler');

/**
 * Lamdb for creating a kitten in the db.
 *
 * @param {*} event
 */
const createKitten = async event => {
    let requestBody = {};

    try {
        requestBody = JSON.parse(event.body);
    } catch (errorInRequestBody) {
        return reportError(400, 'Please enter a valid input');
    }

    if (!(requestBody.name && requestBody.age)) {
        return reportError(400, 'Kitten name and age are mandatory values');
    }

    const dbPutKittenResponse = await dbHandler.put(requestBody);
    return dbPutKittenResponse;
};

/**
 * Lambda for getting the list of kittens from the db
 *
 * @param {*} event
 */
const listKitten = async event => {
    const dbScanKittenResponse = await dbHandler.scan();
    return dbScanKittenResponse;
};

/**
 * Lambda for retreiving a perticular kitten from the db
 *
 * @param {*} event
 */
const getKitten = async event => {
    const dbGetKittenResponse = await dbHandler.get(event.pathParameters.name);
    return dbGetKittenResponse;
};

/**
 * Lambda for updatating a particular kitten in the db
 *
 * @param {*} event
 */
const updateKitten = async event => {
    let requestBody = {};

    try {
        requestBody = JSON.parse(event.body);
    } catch (error) {
        return reportError(400);
    }

    if (!(requestBody.name || requestBody.age)) {
        return reportError(400, 'Invalid user data');
    }

    const dbUpdateKittenResponse = await dbHandler.update(event.pathParameters.name, requestBody);
    return dbUpdateKittenResponse;
};

/**
 * Lambda for deleting a particular kitten from the db
 *
 * @param {*} event
 */
const deleteKitten = async event => {
    const dbDeleteKittenResponse = await dbHandler.remove(event.pathParameters.name);
};

module.exports = {
    createKitten,
    listKitten,
    getKitten,
    updateKitten,
    deleteKitten
};
