'use strict';

const States = require('./states');
const util = require('../common/util');

module.exports = {
    'NewSession': function () {
        this.emit('LaunchRequest');
    },
    'LaunchRequest': function () {
        this.emit(':ask', this.t('WELCOME'));
    },
    'selectReportAndAirportIntent': function () {
        let report = this.event.request.intent.slots.report.value.toUpperCase();
        let firstLetter = this.event.request.intent.slots.firstLetter.value;
        let secondLetter = this.event.request.intent.slots.secondLetter.value;
        let thirdLetter = this.event.request.intent.slots.thirdLetter.value;
        let fourthLetter = this.event.request.intent.slots.fourthLetter.value;

        let icaoCode = util.buildICAO(firstLetter, secondLetter, thirdLetter, fourthLetter);
        this.emit(':tell', 'Here comes your ' + report +
            ' report for ' + util.pronounceIcaoCode(icaoCode));
    },
    'Unhandled': function () {
    },
    'AMAZON.StopIntent': function () {
    },
    'AMAZON.CancelIntent': function () {
    },
    'AMAZON.HelpIntent': function () {
    }
};