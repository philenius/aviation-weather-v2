'use strict';

const States = require('./states');
const util = require('../common/util');

module.exports = {
    'NewSession': function () {
        if (this.attributes['launchCount']) { // user must have launched the skill before
            const launchCount = this.attributes['launchCount'];
            this.attributes['launchCount'] = parseInt(launchCount) + 1;
        } else {
            this.attributes.launchCount = 1;
            this.attributes.name = '_';
        }
        this.attributes.lastInvocation = new Date();

        if (this.event.request.type === 'IntentRequest') {
            let intentName = this.event.request.intent.name;

            if (intentName === 'SelectReportAndAirportIntent') {
                this.handler.state = States.REPORT;
                return this.emitWithState(intentName);
            } else if (intentName === 'NameIntent') {
                this.handler.state = States.NAME;
                return this.emitWithState(intentName);
            }
        }
        this.emit('LaunchRequest');
    },
    'LaunchRequest': function () {
        if (this.attributes.launchCount === 1) {
            this.handler.state = States.NAME;
            return this.emit(':ask', this.t('WELCOME_FIRST'), this.t('WELCOME_FIRST_REPROMPT'));
        }

        this.handler.state = States.MAIN;
        const name = this.attributes.name;
        if (name !== '_') {
            return this.emit(':ask', this.t('WELCOME_WITH_NAME', name), this.t('WELCOME_REPROMPT'));
        }
        this.emit(':ask', this.t('WELCOME'), this.t('WELCOME_REPROMPT'));
    },
    'Unhandled': function () {
        this.emit(':tell', util.random(this.t('UNHANDLED')));
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':tell', 'Sorry, my developer hasn\'t implemented this feature, yet. Please ask again in a few days.');
    },
};