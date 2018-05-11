'use strict';

const Alexa = require('alexa-sdk');

const States = require('./states');
const util = require('../common/util');
const reportAPI = require('../common/report');

module.exports = Alexa.CreateStateHandler(States.REPORT, {
    'NewSession': function () {
        // forward to NewSession handler without any state
        this.emit('NewSession');
    },
    'SelectReportAndAirportIntent': function () {
        util.delegateSlotCollection.call(this);

        this.handler.state = States.MAIN;

        let report = this.event.request.intent.slots.report.value.toUpperCase();

        if (report === 'TFA') {
            return this.emit(':tell', '<say-as interpret-as="interjection">oh boy</say-as>, I don\'t understand TFA reports yet.');
        }

        let firstLetter = this.event.request.intent.slots.firstLetter.value;
        let secondLetter = this.event.request.intent.slots.secondLetter.value;
        let thirdLetter = this.event.request.intent.slots.thirdLetter.value;
        let fourthLetter = this.event.request.intent.slots.fourthLetter.value;
        let icaoCode = util.buildICAO(firstLetter, secondLetter, thirdLetter, fourthLetter);

        reportAPI.getMetarReportFor(icaoCode).then((alexaOutput) => {

            this.response.speak(this.t('METAR_REPORT_ANSWER', util.pronounceIcaoCode(icaoCode), alexaOutput.speechOutput));
            this.response.listen(util.random(this.t('METAR_REPORT_ANSWER_REPROMPT')));
            this.response.cardRenderer(alexaOutput.card.title, alexaOutput.card.content);
            this.emit(':responseReady');

        }).catch((error) => {
            if (error.message === 'ICAO code not found') {
                this.response
                    .speak(
                        this.t('METAR_REPORT_ERROR_ICAO_NOT_FOUND', util.pronounceIcaoCode(icaoCode))
                    )
                    .listen(util.random(this.t('METAR_REPORT_ANSWER_REPROMPT')));
            } else {
                this.response.speak(this.t('METAR_REPORT_ERROR'));
            }
            this.emit(':responseReady');
        });
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