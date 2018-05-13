'use strict';

const Alexa = require('alexa-sdk');

const States = require('./states');
const util = require('../common/util');

module.exports = Alexa.CreateStateHandler(States.NAME, {
    'NewSession': function () {
        // forward to NewSession handler without any state
        this.emit('NewSession');
    },
    'NameIntent': function () {
        const nameSlot = this.event.request.intent.slots.name;
        if (nameSlot && nameSlot.value) {
            this.attributes.name = nameSlot.value.capitalize();
            this.handler.state = States.MAIN;
            this.emit(':ask', `<say-as interpret-as="interjection">Aloha</say-as> ${this.attributes.name}, it\'s a pleasure to meet you. So, how can I help you?`);
        }
    },
    'EraseNameIntent': function () {
        this.attributes.name = '_';
        this.handler.state = States.MAIN;
        this.emit(':ask', '<p><say-as interpret-as="interjection">Okey dokey</say-as>, I deleted my memories.</p> Anything else I can help you with?');
    },
    'NoNameIntent': function () {
        // In DynamoDB attribute values cannot be null. String and Binary type attributes must have
        // lengths greater than zero.
        this.attributes.name = '_';
        this.handler.state = States.MAIN;
        this.emit(':ask',
            'Oh okay, you don\'t wanna tell me your name. ' +
            'That\'s alright, you can set a name anytime later on. ' +
            'How can I help you?'
        );
    },
    'AMAZON.NoIntent': function () {
        this.handler.state = States.NAME;
        this.emitWithState('NoNameIntent');
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