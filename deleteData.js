var AWS = require('aws-sdk');
var docClient = new AWS.DynamoDB.DocumentClient();
AWS.config.update({region: "eu-west-2"});
exports.handler = function (event, context) {
    var dynparams = {
        TableName:"BEMtaulu",
    Key:{
        "email": event.email,
        "ticketID": event.ticketID
    }};
    
    docClient.delete(dynparams, function(err) {
      if (err) {
        console.error("Unable to delete");
      } else {
        console.log("Item deleted");
      }
    });
}
