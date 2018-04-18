'use strict';

const Alexa = require('alexa-sdk');
const handlers = require('./app/handlers/handlers');
const SpeechOutput = require('./app/resources/SpeechOutput');

exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.resources = SpeechOutput;
    alexa.registerHandlers(handlers);
    alexa.execute();
};