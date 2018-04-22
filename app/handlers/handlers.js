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
        util.delegateSlotCollection.call(this);

        let report = this.event.request.intent.slots.report.value.toUpperCase();

        if (report === 'TFA') {
            this.emit(':tell', '<say-as interpret-as="interjection">oh boy</say-as>, this is something I don\'t know yet.');
            return;
        }

        let firstLetter = this.event.request.intent.slots.firstLetter.value;
        let secondLetter = this.event.request.intent.slots.secondLetter.value;
        let thirdLetter = this.event.request.intent.slots.thirdLetter.value;
        let fourthLetter = this.event.request.intent.slots.fourthLetter.value;

        let icaoCode = util.buildICAO(firstLetter, secondLetter, thirdLetter, fourthLetter);
        reportAPI.getMetarReportFor(icaoCode).then((spokenReport) => {

            this.response
                .speak(this.t('METAR_REPORT_ANSWER', util.pronounceIcaoCode(icaoCode), spokenReport))
                .listen(util.random(this.t('METAR_REPORT_ANSWER_REPROMPT')));
            this.emit(':responseReady');

        }).catch((error) => {

            this.emit('Unhandled');

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
    'AMAZON.NoIntent': function () {
        console.log("NOINTENT");
        this.emit('AMAZON.CancelIntent');
    },
    'AMAZON.StopIntent': function () {
        console.log("STOPINTENT");
        this.emit('AMAZON.CancelIntent');
    },
    'AMAZON.CancelIntent': function () {
        console.log("CANCELINTENT");
        this.response.speak(util.random(this.t('FAREWELL')));
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
    }
};