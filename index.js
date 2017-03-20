'use strict';
const express = require('express');
const bodyParser = require('body-parser');
var time = require('time');
const restService = express();
restService.use(bodyParser.json());

restService.post('/hook', function (req, res) {

    var now = new time.Date();
    var hour = now.setTimezone("America/Chicago").getHours();
    var action = ['coverage.speedingTickets'];

    try {
        var speech = 'empty speech';

        if (req.body) {
            var requestBody = req.body;

            if (requestBody.result) {

                speech = '';
                if(action.indexOf(requestBody.result.action)>=0) {
                    if (requestBody.result.fulfillment){
                        speech += requestBody.result.fulfillment.speech;
                    }
                    if (hour >= 7 && hour <= 19){
                        speech += ' Please  write LegalShield Member Services at <a href=“http://home-c4.incontact.com/inContact/ChatClient/ChatClient.aspx?poc=785ac45b-4579-4198-9376-359d21b87f27&bu=4595114”> Chat Cient </a> . If we can be of any further assistance, please don’t hesitate to ask.';
                    } else {
                        speech += ' Please  write LegalShield Member Services at memberservices@legalshield.com. If we can be of any further assistance, please don’t hesitate to ask.';
                   }
                }
            }
        }

        console.log('result: ', speech);

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