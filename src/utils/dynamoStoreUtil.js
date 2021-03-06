const AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-1'
});

const dynamodb = new AWS.DynamoDB();

function putItem (table, item, callback) {
    let params = {
        TableName: table,
        Item: {}
    }

    for (let key of Object.keys(item)) {
        let val = {
            S: item[key]
        };
        params.Item[key] = val;
    }
    dynamodb.putItem(params, callback);
}

function getAllItems (table, callback) {
    let params = {
        TableName: table
    }
    dynamodb.scan(params, callback);
}

function getItem (table, idName, id, callback) {
    let params = {
        TableName: table,
        Key: {}
    }

    params.Key[idName] = { S: id };

    dynamodb.getItem(params, callback);
}

module.exports.putItem = putItem;
module.exports.getAllItems = getAllItems;
module.exports.getItem = getItem;
