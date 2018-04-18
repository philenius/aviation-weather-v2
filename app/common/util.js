'use strict';

module.exports = {
    'buildICAO': function (letter1, letter2, letter3, letter4) {
        return this.getFirstLetter(letter1.toUpperCase()) +
            this.getFirstLetter(letter2.toUpperCase()) +
            this.getFirstLetter(letter3.toUpperCase()) +
            this.getFirstLetter(letter4.toUpperCase());
    },
    'getFirstLetter': function (natoLiteral) {
        return natoLiteral.charAt(0);
    },
    'pronounceIcaoCode': function (icaoCode) {
        if (icaoCode === 'KSAC') {
            return '<say-as interpret-as="ordinal">K-SAC</say-as>';
        }
        return '<say-as interpret-as="characters">' + icaoCode + '</say-as>';
    },
};