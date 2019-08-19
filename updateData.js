var AWS = require('aws-sdk');
var docClient = new AWS.DynamoDB.DocumentClient();
AWS.config.update({region: "eu-west-2"});

exports.handler = function (event, context, callback) {
    var dynparams = {
        TableName:"BEMtaulu",
        Key:{
            "email": event.email,
            "ticketID": event.ticketID 
        },
        UpdateExpression: "set confirmation=:newconfirmation",
        ExpressionAttributeValues:{
            ":newconfirmation": "Confirmed"
        },
        ReturnValues:"UPDATED_NEW"
    };
    
console.log("Updating the item...");
docClient.update(dynparams, function(err, data) {
    if (err) {
        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("UpdateItem succeeded:");
    }
});
callback(null, dynparams["Key"]);
};
