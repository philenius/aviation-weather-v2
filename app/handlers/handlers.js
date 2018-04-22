'use strict';

const States = require('./states');
const util = require('../common/util');
const reportAPI = require('../common/report');
const inNewSessionStartableIntents = [
    'selectReportAndAirportIntent'
];

module.exports = {
    'NewSession': function () {
        // intent request
        if (this.event.request.type === 'IntentRequest') {
            let intentName = this.event.request.intent.name;
            if (inNewSessionStartableIntents.indexOf(intentName) > -1) {
                return this.emit(intentName);
            }
        }
        // launch intent
        this.emit('LaunchIntent');
    },
    'LaunchIntent': function () {
        this.response.speak(this.t('WELCOME')).listen();
        this.emit(':responseReady');
    },
    'selectReportAndAirportIntent': function () {
        let report = this.event.request.intent.slots.report.value.toUpperCase();

        if (report === 'TFA') {
            this.emit(':tell', '<say-as interpret-as="interjection">oh boy</say-as>, I don\'t know that one.');
            return;
        }

        let firstLetter = this.event.request.intent.slots.firstLetter.value;
        let secondLetter = this.event.request.intent.slots.secondLetter.value;
        let thirdLetter = this.event.request.intent.slots.thirdLetter.value;
        let fourthLetter = this.event.request.intent.slots.fourthLetter.value;

        let icaoCode = util.buildICAO(firstLetter, secondLetter, thirdLetter, fourthLetter);
        let spokenReport = reportAPI.getMetarReportFor(icaoCode).then((spokenReport) => {

            this.response.speak('Here comes your ' + report +
                ' report for ' + util.pronounceIcaoCode(icaoCode) +
                ' <break time="1s"/> ' + spokenReport)
                .listen();
            this.emit(':responseReady');

        }).catch((error) => {

            this.response.speak('I\'m sorry, there was a problem.');
            this.emit(':responseReady');

        });
    },
    'Unhandled': function () {
        this.emit(':tell', util.random(this.t('UNHANDLED')));
    },
    'SessionEndedRequest': function () {
        console.log('SESSIONENDEDREQUEST');
        this.response.speak(util.random(this.t('FAREWELL')));
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        console.log("STOPINTENT");
        this.response.speak(util.random(this.t('FAREWELL')));
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        console.log("CANCELINTENT");
        this.response.speak(util.random(this.t('FAREWELL')));
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
    }
};