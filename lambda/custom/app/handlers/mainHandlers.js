'use strict';

const Alexa = require('alexa-sdk');

const States = require('./states');
const util = require('../common/util');

module.exports = Alexa.CreateStateHandler(States.MAIN, {
    'NewSession': function () {
        this.emit('NewSession');
    },
    'SelectReportAndAirportIntent': function() {
        this.handler.state = States.REPORT;
        this.emitWithState('SelectReportAndAirportIntent')
    },
    'ChangeNameIntent': function() {
        this.handler.state = States.NAME;
        this.emit(':ask', '<say-as interpret-as="interjection">Gotcha</say-as>, what is your <prosody pitch="high">first name</prosody>?');
    },
    'EraseNameIntent': function() {
        this.handler.state = States.NAME;
        this.emitWithState('EraseNameIntent');
    },
    'NameIntent': function () {
        this.handler.state = States.NAME;
        this.emitWithState('NameIntent');
    },
    'Unhandled': function () {
        this.emit('Unhandled');
    },
    'SessionEndedRequest': function () {
        this.emit('SessionEndedRequest');
    },
    'AMAZON.StopIntent': function () {
        this.emit('AMAZON.StopIntent');
    },
    'AMAZON.CancelIntent': function () {
        this.emit('AMAZON.CancelIntent');
    },
    'AMAZON.HelpIntent': function () {
        this.emit('AMAZON.HelpIntent');
    },
});