'use strict';

require('./app/common/common');

const Alexa = require('alexa-sdk');
const handlers = require('./app/handlers/handlers');
const SpeechOutput = require('./app/resources/SpeechOutput');

const appId = 'amzn1.ask.skill.006cc714-bd60-4782-a442-c9bb11194c72';

exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.resources = SpeechOutput;
    alexa.registerHandlers(handlers);
    alexa.execute();
};