'use strict';

require('./app/common/common');

const Alexa = require('alexa-sdk');
const newSessionHandlers = require('./app/handlers/newSessionHandlers');
const mainHandlers = require('./app/handlers/mainHandlers');
const nameHandlers = require('./app/handlers/nameHandlers');
const reportHandlers = require('./app/handlers/reportHandler');
const SpeechOutput = require('./app/resources/SpeechOutput');

const APP_ID = 'amzn1.ask.skill.7be1bc02-5fa5-490b-87ad-c43a7fe0a436';
const DEV = process.env.DEV || false;

exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;

    if (!DEV) {
        console.log('started in PRD mode');
        alexa.dynamoDBTableName = 'aviation_weather_skill';
    }

    alexa.resources = SpeechOutput;
    alexa.registerHandlers(newSessionHandlers, mainHandlers, nameHandlers, reportHandlers);
    alexa.execute();
};