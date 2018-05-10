'use strict';

require('./app/common/common');

const Alexa = require('alexa-sdk');
const handlers = require('./app/handlers/handlers');
const mainHandlers = require('./app/handlers/mainHandlers');
const nameHandlers = require('./app/handlers/nameHandlers');
const reportHandlers = require('./app/handlers/reportHandler');
const SpeechOutput = require('./app/resources/SpeechOutput');

const APP_ID = 'amzn1.ask.skill.006cc714-bd60-4782-a442-c9bb11194c72';
const DEV = process.env.DEV || false;

exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;

    if (!DEV) {
        console.log('started in PRD mode');
        alexa.dynamoDBTableName = 'aviation_weather_skill';
    }

    alexa.resources = SpeechOutput;
    alexa.registerHandlers(handlers, mainHandlers, nameHandlers, reportHandlers);
    alexa.execute();
};