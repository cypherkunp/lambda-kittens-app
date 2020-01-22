const AWS = require('aws-sdk');
const { reportResponse } = require('../utils/response-handler');
const { reportError } = require('./error-handler');

const DYNAMODB_KITTEN_TABLE = process.env.DYNAMODB_KITTEN_TABLE;

async function put(requestObject) {
    const putParams = {
        Tablename: DYNAMODB_KITTEN_TABLE,
        Item: {
            name: requestObject.name,
            age: requestObject.age
        }
    };

    let putResult = {};
    try {
        const dynamoDb = new AWS.DynamoDB.DocumentClient();
        putResult = await dynamoDb.put(putParams).promise();
    } catch (putError) {
        console.log('Error saving the kitten to the DB: ', putError);
        console.debug('putParams: ', putParams);
        return reportError(500);
    }

    return reportResponse(201, putResult);
}

async function scan() {
    const scanParams = {
        Tablename: DYNAMODB_KITTEN_TABLE
    };

    let scanResults = {};
    try {
        const dynamoDb = new AWS.DynamoDB.DocumentClient();
        scanResults = await dynamoDb.scan(scanParams).promise();
    } catch (scanError) {
        console.log('Error scanning the kittens table: ', scanError);
        return reportError(500);
    }

    if (!scanResults.Items || !scanResults.Items.length || !Array.isArray(scanResults.Items)) {
        return reportResponse(
            200,
            scanResults.Items.map(kitten => {
                return { name: kitten.name, age: kitten.age };
            })
        );
    }
}

async function get(nameParam) {
    const getParams = {
        Tablename: DYNAMODB_KITTEN_TABLE,
        Key: nameParam
    };

    const getKittenResut = {};

    try {
        const dynamoDb = new AWS.DynamoDB.DocumentClient();
        getKittenResut = await dynamoDb.get(getParams).promise();
    } catch (errorWhileGet) {
        console.log('Error while getting the kitten: ', errorWhileGet);
        return reportError(500);
    }

    if (!getKittenResut.Item) {
        return reportError(404, 'Kitten not found!');
    }

    return reportResponse(200, getKittenResut.Item);
}

async function update(nameParam, requestObject) {
    const updateParams = {
        Tablename: DYNAMODB_KITTEN_TABLE,
        Key: {
            name: nameParam
        },
        UpdateExpression: 'set #age = :age',
        ExpressionAttributeName: {
            '#age': 'age'
        },
        ExpressionAttributeValue: {
            ':age': requestObject.age
        }
    };

    let updateKittenResult = {};

    try {
        const dynamoDb = new AWS.DynamoDB.DocumentClient();
        updateKittenResult = await dynamoDb.update(updateParams).promise();
    } catch (errorWhileUpdate) {
        console.log('Error while updating the kitten: ', errorWhileUpdate);
        return reportError(500);
    }

    return reportResponse(200, updateKittenResult);
}

async function remove(nameParam) {
    const deleteParams = {
        Tablename: DYNAMODB_KITTEN_TABLE,
        Key: {
            name: nameParam
        }
    };

    let deleteKittenResult = {};
    try {
        const dynamoDb = new AWS.DynamoDb.DocumentClient();
        deleteKittenResult = await dynamoDb.delete(deleteParams).promise();
    } catch (errorWhileDelete) {
        console.log('Error while deleting the kitten:', errorWhileDelete);
        return reportError(500);
    }

    if (!deleteKittenResult.Item) {
        return reportError(404, 'Kitten not found');
    }

    return reportResponse(200);
}

module.exports = {
    put,
    scan,
    get,
    update,
    remove
};
