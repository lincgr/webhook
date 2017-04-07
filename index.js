'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');

const restService = express();
restService.use(bodyParser.json());

let fullName = function (userID, next) {
    try {
        let resourceUrl = url.parse(config.facebookGraph.domain);
        resourceUrl.pathname = '/api/v1/blacklisted_words';
        resourceUrl = url.format(resourceUrl);
    } catch (err) {
        console.error(err);
    }
};

restService.post('/hook', function (req, res) {

    console.log('hook request');

    try {
        var speech = 'empty speech';

        if (req.body) {
            var requestBody = req.body;

            if (requestBody.result) {
                speech = '';

                if (requestBody.result.fulfillment) {
                    speech += requestBody.result.fulfillment.speech;
                    speech += ' ';
                }
            }

            if (requestBody.originalRequest.data.sender.id) {
                var senderId = requestBody.originalRequest.data.sender.id;
                let fullName = function (senderId, next) {
                    try {
                        let resourceUrl = url.parse(config.facebookGraph.domain);
                        resourceUrl.pathname = senderId + '?fields=first_name,last_name&access_token=' + config.facebookGraph.access_token;
                        resourceUrl = url.format(resourceUrl);
                        console.log(resourceUrl);
                    } catch (err) {
                        console.error(err);
                    }
                };
            }

        }
        return res.json({
            speech: speech,
            displayText: speech,
            source: 'apiai-webhook-sample'
        });
    } catch (err) {
        console.error("Can't process request", err);

        return res.status(400).json({
            status: {
                code: 400,
                errorType: err.message
            }
        });
    }
});

restService.listen((process.env.PORT || 5000), function () {
    console.log("Server listening");
});

function receivedMessage(event) {
    var senderID = event.sender.id;
    var recipientID = event.recipient.id;
    var timeOfMessage = event.timestamp;
    var message = event.message;

    console.log("Received message for user %d and page %d at %d with message:",
        senderID, recipientID, timeOfMessage);
    console.log(JSON.stringify(message));

    var messageId = message.mid;

    var messageText = message.text;
    var messageAttachments = message.attachments;

    if (messageText) {

        // If we receive a text message, check to see if it matches a keyword
        // and send back the example. Otherwise, just echo the text we received.
        switch (messageText) {
            case 'generic':
                sendGenericMessage(senderID);
                break;

            default:
                sendTextMessage(senderID, messageText);
        }
    } else if (messageAttachments) {
        sendTextMessage(senderID, "Message with attachment received");
    }
}
