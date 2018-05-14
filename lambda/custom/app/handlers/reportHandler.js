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

        // delegate to Alexa to collect all the required slots
        const filledSlots = util.delegateSlotCollection.call(this, (event) => {
            let result = false;
            const slots = event.request.intent.slots;

            if (slots.report.value && slots.firstLetter.value && slots.secondLetter.value && slots.thirdLetter.value && slots.fourthLetter.value) {
                result = true;
            }
            return result;
        });

        // delegateSlotCollection may make an asynchronous call, so there
        // is a chance that filledSlots is null. If it's null we need to
        // stop SelectReportAndAirportIntent and on the next runtime tick,
        // this.emit(':delegate') which was called from
        // delegateSlotCollection will execute.
        if (!filledSlots) {
            return;
        }
        // at this point, we know that all required slots are filled.
        const slotValues = util.getSlotValues(filledSlots);

        this.handler.state = States.MAIN;

        if (!slotValues.report.isValidated) { // if the value of report is not in my slot values
            return this.emit(
                ':tell',
                'I never heard of this type of report before. Sorry, I can only understand METAR and <say-as interpret-as="characters">TAF</say-as> reports.'
            );
        }

        const report = slotValues.report.resolved.toUpperCase();
        const icaoCode = util.buildICAO(slotValues);
        
        if (report === 'TAF') {
            return this.emit(':tell', '<say-as interpret-as="interjection">oh boy</say-as>, I don\'t understand <say-as interpret-as="characters">TAF</say-as> reports yet.');
        } else if (report === 'METAR') {

            reportAPI.getMetarReportFor(icaoCode).then((alexaOutput) => {

                this.attributes.icao = icaoCode;

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
        }
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