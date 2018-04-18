const States = require('./states');

module.exports = {
    'NewSession': function () {
        this.emit('LaunchRequest');
    },
    'LaunchRequest': function () {
        this.emit(':tell', this.t('WELCOME'));
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