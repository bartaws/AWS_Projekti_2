var AWS = require('aws-sdk');
var docClient = new AWS.DynamoDB.DocumentClient();
AWS.config.update({region: "eu-west-2"});
exports.handler = function (event, context) {
    var number = Date.now()
    var dynparams = {
        TableName:"BEMtaulu",
        Item:{
            "email": event.email,
            "ticketID": number,
            "feedback": event.feedback,
            "confirmation" : "Pending"
        }
    };
    docClient.put(dynparams, function(err, data) {
      if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
      } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
      }
    });
}