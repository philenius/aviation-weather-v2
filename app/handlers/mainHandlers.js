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
        this.emit(':tell', util.random(this.t('UNHANDLED')));
    },
    'SessionEndedRequest': function () {
        this.response.speak(util.random(this.t('FAREWELL')));
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.emit('AMAZON.CancelIntent');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(util.random(this.t('FAREWELL')));
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':tell', 'Sorry, my developer hasn\'t implemented this feature, yet. Please ask again in a few days.');
    },
});