var AWS = require('aws-sdk');
AWS.config.update({region: 'eu-west-1'});

var ses = new AWS.SES();
 


var response = {
 "isBase64Encoded": false,
 "headers": { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'bartaws.com'},
 "statusCode": 200,
 "body": "{\"result\": \"Success.\"}"
 };

exports.handler = function (event, context) {
    console.log('Received event:', event);
    sendEmail(event, function (err, data) {
        context.done(err, null);
    });
};

function sendEmail (event, done) {
    var RECEIVER = event.email;
    var SENDER = "elina.a.saunamaki@gmail.com";
    var params = {
        Destination: {
            ToAddresses: [
                RECEIVER
            ]
        },
        Message: {
            Body: {
                Text: {
                    Data: 'Your ticket has been confirmed',
                    Charset: 'UTF-8'
                }
            },
            Subject: {
                Data: 'Website Referral Form: ' + event.name,
                Charset: 'UTF-8'
            }
        },
        Source: SENDER
    };
    ses.sendEmail(params, done);
}